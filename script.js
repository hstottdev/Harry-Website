
window.onload = function() {
    function update() {
        updateTime();
        getDiscordData();   
        //orientationCheck();
    }
        update();
        setInterval(update, 1000);
        
};

$(document).ready(function(){
    const $element = $("#projectCarousel");
    const el = document.getElementById("projectCarousel");
   
    const windowWidth = $(window).width();
    // How far away from the screen edge to trigger our scroll
    const distanceFromEdge = 200;
    
    // Get the mouse position while it's over our element
    $element.on("mousemove", function (e) {
      const mouseX = e.pageX;        
      console.log(mouseX);
      // If it gets within x distance from the left, scroll left
      if (mouseX < distanceFromEdge) { 
        el.scrollLeft -= 40;   
      }
  
      // If it gets within x distance from the right, scroll right
      if (mouseX > windowWidth - distanceFromEdge) {
        el.scrollLeft += 40; 
      }
    });

    
    $(".clickable").on("pointerenter",function (e) {
        buttonHover();
    })

    $(".clickable").on("pointerdown",function (e) {
        //playSound('sounds/button click.wav');
    })

    $(".panel .button").on("pointerenter",function (e) {
        statusHover();
    })

    $(".back-arrow").click(function (e) {
        window.history.back();
    })

    $(".forward-arrow").click(function (e) {
        window.history.forward();
    })
    

})

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

function updateTime(){
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
    sound.play();
}

function buttonHover(){
    playSound('sounds/interface-button-154180.mp3');
}


function statusHover(){
    playSound('sounds/clicking-interface-select-201946.mp3');
}

function orientationCheck(){

    if (window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById('orientation-warning').style.visibility = "visible";
    }
    else{
        document.getElementById('orientation-warning').style.visibility = "hidden";
    }

}

function getDiscordData(){
	const ID = '398842457250463764';
    const url = `https://api.lanyard.rest/v1/users/${ID}`;

		fetch(url)
		.then((res) => res.json())
		.then((res) => {
			setDiscordStatus(res.data);
		});
}

class discord_status {
    constructor(data){
        if(data){
            this.online = data.discord_status;
       
            if(data.activities.length > 0){
                let activity = data.activities[0].name;
                if(activity == "Code"){
                    this.task = "Writing Code...";
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
        document.getElementById("statusIcon").classList.add('online');
        document.getElementById("statusIcon").classList.remove('offline');
    }
    else{
        document.getElementById("statusIcon").classList.add('offline');
        document.getElementById("statusIcon").classList.add('online');
    }
}
//discord user id
// https://api.lanyard.rest/v1/users/


