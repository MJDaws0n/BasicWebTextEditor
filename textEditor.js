// Load jquery
if (typeof jQuery === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';

    script.onload = function() {
        console.log('jQuery is loaded!');
    };

    document.head.appendChild(script);
} else {
    // jQuery is already loaded
    console.log('jQuery is already loaded!');
}

// Code for checking for new and old editors
document.addEventListener('DOMContentLoaded', ()=>{
    const advancedEditorInputs = document.querySelectorAll('input[type="advancedEditor"]');
    advancedEditorInputs.forEach(input => {
        appendEditor(input);
    });


    // Select the target node
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.tagName.toLowerCase() === 'input' && node.getAttribute('type') === 'advancedEditor') {
                        appendEditor(node);
                    }
                });
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})

function appendEditor(input){
    // Create the base editor
    const newEditor = document.createElement('div');

    // Add details
    newEditor.setAttribute('data-advanced-edtior', 'true');

    // Add the editor
    input.before(newEditor);

    // Move the input field and set it invisible
    newEditor.append(input);
    input.type='hidden'

    // Create the textarea as an editiable div
    const contentField = document.createElement('div');
    contentField.setAttribute('contenteditable', 'true');
    contentField.classList.add('textarea');
    contentField.addEventListener('input', ()=>{
        input.value = contentField.innerHTML;
        input.dispatchEvent(new Event('change'));
        input.dispatchEvent(new Event('input'));
    })
    
    // Set the default value
    contentField.innerHTML = input.value;

    // Create the menu bar
    const menuBar = document.createElement('div');
    menuBar.classList.add('menuBar');

    // Bold
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/bold-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('bold');
        })
    
        menuBar.append(button);
    }
    // Italic
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/italic-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('italic');
        })
    
        menuBar.append(button);
    }
    // Underline
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/underline-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('underline');
        })
    
        menuBar.append(button);
    }
    // Strikethrough
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/strikethrough-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('strikethrough');
        })
    
        menuBar.append(button);
    }
    // Clear format
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/xmark-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('removeFormat');
        })
    
        menuBar.append(button);
    }
    // Left align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/align-left-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyLeft');
        })
    
        menuBar.append(button);
    }
    // Center align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/align-center-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyCenter');
        })
    
        menuBar.append(button);
    }
    // Right align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/align-right-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyRight');
        })
    
        menuBar.append(button);
    }
    // Justify align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/align-justify-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyFull');
        })
    
        menuBar.append(button);
    }
    // Ordered list
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/list-ol-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('insertOrderedList');
        })
    
        menuBar.append(button);
    }
    // Unordered list
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/list-ul-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('insertUnorderedList');
        })
    
        menuBar.append(button);
    }
    // Undo
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/rotate-left-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            document.execCommand('undo');
        })
    
        menuBar.append(button);
    }
    // Redo
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/rotate-right-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            document.execCommand('redo');
        })
    
        menuBar.append(button);
    }
    // Create URL
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/link-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            const url = prompt('Enter the URL:');
            if (url) {
              execCmd('createLink', url);
            }
        })
    
        menuBar.append(button);
    }
    // Unlink
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="./icons/link-slash-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('unlink');
        })
    
        menuBar.append(button);
    }

    // Append the elements in the correct order
    newEditor.append(menuBar);
    newEditor.append(contentField);
}
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}