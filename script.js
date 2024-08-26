
window.onload = function() {
    function update() {
        updateTime()
    }
        update()
        setInterval(update, 1000);
};

function updateTime(){
    var date = new Date();
    var londonTime = date.toLocaleTimeString("en-GB", {timeZone: "Europe/London"});
    document.getElementById("time").innerHTML = londonTime;
}

function buttonHover(){
    let clickSound = new Audio('sounds/interface-button-154180.mp3');
    clickSound.play();
}



