let statusScrollSpeed = "7s";

$(document).ready(function () {
    function update() {
        updateTime();
        getDiscordData();
    }
    update();
    setInterval(update, 1000);

    browserHistoryButtonHandler();
    //soundEffectHandler();
})

function soundEffectHandler() {
    $(".clickable").on("pointerdown", function (e) {
        playSound('sounds/button click.wav');
    })

    $(".clickable").on("pointerenter", function (e) {
        buttonHoverSound();
    })

    $(".panel .button").on("pointerenter", function (e) {
        statusHoverSound();
    })
}

function browserHistoryButtonHandler() {
    $(".back-arrow").click(function (e) {
        window.history.back();
    })

    $(".forward-arrow").click(function (e) {
        window.history.forward();
    })
}

function timeStringToTwelveHour(timeString){
    var hour = Number(timeString.split(':')[0]);
    let twelveHr = "<small>AM</small>";
    if(hour >= 12){
        twelveHr = "<small>PM</small>"
    }
    if(hour > 12){
        hour -= 12;
    }

    var minute = timeString.split(':')[1];

    var time = hour + ":" + minute + twelveHr;

    return time;
}

function updateTime() {
    var date = new Date();
    //define time string
    const londonTime = date.toLocaleTimeString("en-GB", {timeZone: "Europe/London"});

    var time = timeStringToTwelveHour(londonTime);

    timeElement = document.getElementById("time");
    
    //check time element is in document
    if(timeElement){
        //set text as time string
        timeElement.innerHTML = time;
    }
}

//checking the users system type
function platformCheck(){

}

function playSound(filePath){
    let sound = new Audio(filePath);
    //sound.play();
}

function buttonHoverSound(){
    playSound('sounds/interface-button-154180.mp3');
}


function statusHoverSound(){
    playSound('sounds/clicking-interface-select-201946.mp3');
}

function getDiscordData(){
	const ID = '398842457250463764';
    const url = `https://api.lanyard.rest/v1/users/${ID}`;

		fetch(url)
		.then((res) => res.json())
            .then((res) => {
                console.log(res.data);
            setDiscordStatus(res.data);
            setScrollingStatus();
		});
}

class discord_status {
    constructor(data){
        if(data){
            this.online = data.discord_status;
       
            if(data.activities.length > 0){
                let activity = data.activities[0].name;
                if (activity == "Code" || activity == "Visual Studio"){
                    this.task = "Coding in Visual Studio...";
                }
                else if (activity == "Aseprite" || activity == "Unity") {
                    this.task = `Using ${activity}...`;
                }
                else{
                    this.task =  `Playing ${activity}...`;
                }
            }
            else{
                if(data.discord_status == "offline"){
                    this.task = "Offline";
                }
                else{
                    this.task = "Online";
                }
            }
        }
        else{
            this.task = "Offline";
            this.online = "offline";
        }
    }
}

function setDiscordStatus(data){     
    myStatus =  new discord_status(data);
    
    document.getElementById("statusTask").innerHTML = myStatus.task;

    if(myStatus.online != "offline"){
        document.getElementById("statusIconOnline").style.display = "block";
        document.getElementById("statusIconOffline").style.display = "none";
    }
    else{
        document.getElementById("statusIconOnline").style.display = "none";
        document.getElementById("statusIconOffline").style.display = "block";
    }
}

function setScrollingStatus() {
    const statusTask = document.getElementById("statusTask");
    if (statusTask.textContent.length > 7) {
        statusTask.style.animationDuration = statusScrollSpeed;
        statusTask.style.webkitAnimationDuration = statusScrollSpeed;
    }
    else {
        statusTask.style.animationDuration = "0s";
        statusTask.style.webkitAnimationDuration = "0s";
    }
}

//discord user id
// https://api.lanyard.rest/v1/users/

