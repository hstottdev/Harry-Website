
window.onload = function() {
    function update() {
        updateTime();
        getDiscordData();
    }
        update();
        setInterval(update, 1000);
};

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

    //set text as time string
    document.getElementById("time").innerHTML = time;
}

function buttonHover(){
    let clickSound = new Audio('sounds/interface-button-154180.mp3');
    clickSound.play();
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
    console.log(data.activities[0]);
    myStatus =  new discord_status(data);
    
    document.getElementById("statusTask").innerHTML = myStatus.task;

    if(myStatus.online == "online"){
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

