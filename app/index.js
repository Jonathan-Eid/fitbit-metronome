import document from "document";
import { vibration } from "haptics";

//Get all changeable elements by their id

let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");

let beat_btn = document.getElementById("beat_btn");
let metro_btn = document.getElementById("metro_btn");
let metro_back = document.getElementById("metro_back");

let metro_slider = document.getElementById("metro_slider");
let metro_knob = document.getElementById("metro_knob");
let metro_bpm = document.getElementById("metro_bpm");
let bpm_text = document.getElementById("bpm_text");

let bpm = parseInt(bpm_text.textContent)
let bpm_timer

let bar_count = 0

/*
You could see when calling the changing 
screens functions that we set the style variable "display"
to inline and the screens that we dont want to show to none
*/
function showScreen1() {
    console.log("Show screen 1");
    screen1.style.display = "inline";
    screen2.style.display = "none";
  }
  
function showScreen2() {
    console.log("Show screen 2");
    screen1.style.display = "none";
    screen2.style.display = "inline";
  }


  //You could see how we are able to access the mouse
  //Events of each button
  beat_btn.onclick = function() {
    //showScreen2();
  }
  
  metro_btn.onclick = function () {
    console.log("activate")
    showScreen2();
  }

  metro_back.onclick = function () {
    metro_bpm.style.fill = "white"
    clearInterval(bpm_timer)
    bpm_timer = null    
    showScreen1();


  }

  metro_slider.onmousemove = function (evt) {

    metro_knob.cy = evt.screenY
    changeBPM(evt)


  }

  metro_bpm.onclick = function (evt) {

    if(!bpm_timer){
        startBpm()
        metro_bpm.style.fill = "green"
    }else{
        metro_bpm.style.fill = "white"
        clearInterval(bpm_timer)
        bpm_timer = null
    }


  }

  function changeBPM(evt) {
    bpm = Math.floor(evt.screenY /2 *(evt.screenY/120))
    bpm_text.textContent = bpm

    if(bpm_timer){
        clearInterval(bpm_timer)
        startBpm()
    }


  }

  function startBpm(){
    bpm_timer = setInterval(() => {
        bar_count % 4 == 0 ? vibration.start("confirmation-max") : vibration.start("confirmation")
        bar_count = bar_count + 1
    }, Math.floor(1000 / (bpm/60)))

  }



  