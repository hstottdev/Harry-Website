//default variables that get overridden in each HTML file:
let file = "DraggableWindow.cs";
let repoPath = "https://raw.githubusercontent.com/hstottdev/arjybeasts-code/refs/heads/main/";

window.onload = function () {
    updateCodeViewer();
    setButtonEvents();
    setTimeout(updateHighlight, 100);
    setInterval(updateHighlight, 1000);
};

function updateCodeViewer() {
    code = document.getElementById('code');

    // Fetch Source Code
    fetch(repoPath + file)
        .then(response => response.text())
        .then(data => code.textContent = data)

    document.getElementById('script-name').textContent = file;

    // Update Highlight.js
    setInterval(updateHighlight, 100);
}

function updateHighlight(){
    code = document.getElementById('code');
    code.removeAttribute("data-highlighted");
    hljs.highlightAll();
}

function setButtonEvents(){
    const buttonContainer = document.getElementById('script-buttons');
    const buttons = buttonContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        let fileName = buttons[i].textContent;
        console.log(fileName);
        
        if(buttons[i].classList.contains("button")){
           buttons[i].onclick = () => {setFile(fileName);}
        }
    }
}

function setFile(newFile) {
    file = newFile;
    updateCodeViewer();
    resetScrollbar();
}

function resetScrollbar(){
    scrollView = document.getElementById('code').parentNode;
    scrollView.scrollTop = 0;
}