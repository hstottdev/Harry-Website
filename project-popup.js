
//on ready
$(document).ready(function () {
    assignEventListeners();
})

function assignEventListeners() {
    const closeButton = document.getElementById("p-popup-close");

    closeButton.onclick = () => { togglePopup("none"); }
}

function togglePopup(toggle) {
    const popUp = document.getElementById("project-popup");

    popUp.style.display = toggle;
}