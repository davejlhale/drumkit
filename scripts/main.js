let input = document.querySelector("body");
let soundDir = "sounds/"
let sounds = [
    ["boom", "boom.wav", "red",'A'],
    ["clap", "clap.wav", "green",'S'],
    ["hihat", "hihat.wav", "orange",'D'],
    ["kick", "kick.wav", "blue",'F'],
    ["openhat", "openhat.wav", "chocolate",'G'],
    ["ride", "ride.wav", "deeppink",'H'],
    ["snare", "snare.wav", "greenyellow",'J'],
    ["tink", "tink.wav", "grey",'K'],
    ["tom", "tom.wav", "yellow",'L']
]
let mySound = new Audio();
let rndClickChain = [];
const soundChainLength = 5;
let chainCounter = 0;
let chainSpeed = 750;//ms
let flashSpeed = 750;//ms
let buildingChainFlag = true;


const welcome = document.getElementById("welcome");
const winner = document.getElementById("winner");
const loser = document.getElementById("loser");
// on soundPad click -> soundPad.eventlistner to all pads

document.addEventListener('keydown', (evt) => {
sounds.every(element => {
   if (" "===(evt.key) ){
    evt.key="";
    document.getElementById("startButton").click();
    return false;
   } else if (element[3]==(evt.key).toUpperCase()) {
        console.log(evt.key);
        document.getElementById(element[0]).click();
        return false;
    }
});


});
sounds.forEach(element => {
    console.log(element)
    const soundPad = document.getElementById(element[0]);
    console.log(soundPad)
    soundPad.addEventListener('click', (evt) => {
        if (!buildingChainFlag) {
            if (soundPad == rndClickChain[0] || rndClickChain.length === 0) {
                if (element[1]) {
                    mySound.src = soundDir + element[1];
                    mySound.play();
                    if (rndClickChain.length > 0){
                        rndClickChain.shift();
                    if (rndClickChain.length == 0) {
                        //do winner stuff here
                        console.log("winner");
                        
                        winner.style.display="block";
                    }
                }
            }
        } else {
            mySound.src = soundDir + "GunSnglShotFireEx.mp3";
            mySound.play();
            rndClickChain = [];
            loser.style.display="block";
        }
    }

        if (buildingChainFlag) {
        if (element[1]) {
            mySound.src = soundDir + element[1];
            mySound.play();
        }
    }
    soundPad.style.animation = "none"
    soundPad.offsetHeight; /* trigger reflow */
    soundPad.style.animation = `${flashSpeed}` + "ms ease-in-out click-flash"
    soundPad.addEventListener("animationstart", () => {
        soundPad.style.backgroundColor = element[2]
    });
    soundPad.addEventListener("animationend", () => {
        soundPad.style.backgroundColor = "#3fe0ad"
    });
})
});

tmp = document.getElementById("startButton");
tmp.addEventListener("click", (evt) => {
    rndClickChain = []//clear array
    welcome.style.display="none"
    winner.style.display="none";
    loser.style.display="none";
    chainCounter = 0;
    buildingChainFlag = true;
    clip_animation_loop()
})

function clickPad() {
    rndpad = document.getElementById(sounds[Math.floor(Math.random() * (sounds.length - 1))][0])
    rndClickChain.push(rndpad);
    console.log(rndClickChain);
    rndpad.click()
}
function clip_animation_loop() {
    clickPad();
    setTimeout(function () {
        chainCounter++;
        if (chainCounter < soundChainLength) {
            clip_animation_loop();
        } else {
            buildingChainFlag = false;
        }
    }, chainSpeed);
};