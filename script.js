
window.onload = function() {
    function update() {
        var date = new Date();
        var londonTime = date.toLocaleTimeString("en-GB", {timeZone: "Europe/London"});
        document.getElementById("time").innerHTML = londonTime;
    }
        update()
        setInterval(update, 1000);
};



