import document from "document";
import { vibration } from "haptics";
import asap from "fitbit-asap/app"


asap.onmessage = message => {

  if (message["metronome"]){
    clearInterval(bpm_timer)
    showScreen2()
    bpm = message["metronome"]
    startBpm()
    metro_bpm.style.fill = "green"
  }
  if(message=="play"){
    console.log("song test");
    showPausedBeatScreen();
    programmedBeatInterval();
  }
  if(message=="pause"){
    
  }

}

//Get all changeable elements by their id

let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");
let bothBeatsScreen = document.getElementById("bothBeatsScreen");
let playlistBeatsScreen = document.getElementById("playlistBeatsScreen");
let programmedBeatPlayScreen = document.getElementById("programmedBeatPlayScreen");
let programmedBeatPausedScreen = document.getElementById("programmedBeatPausedScreen");

let beat_btn = document.getElementById("beat_btn");
let metro_btn = document.getElementById("metro_btn");
let metro_back = document.getElementById("metro_back");
let bothBeats_back = document.getElementById("bothBeats_back");
let playlistBeats_back = document.getElementById("playlistBeats_back");
let programmedBeatPaused_back = document.getElementById("programmedBeatPaused_back");
let programmedBeatPlay_back = document.getElementById("programmedBeatPlay_back");

let metro_slider = document.getElementById("metro_slider");
let metro_knob = document.getElementById("metro_knob");
let metro_bpm = document.getElementById("metro_bpm");
let bpm_text = document.getElementById("bpm_text");

let bpm = parseInt(bpm_text.textContent)
let bpm_timer

let bar_count = 0

//both beats elements
let playlist1 = document.getElementById("playlist1");
let playlist2 = document.getElementById("playlist2");
let playlist3 = document.getElementById("playlist3");
let song1 = document.getElementById("song1");
let song2 = document.getElementById("song2");
let song3 = document.getElementById("song3");

//playlist song elements
let playlistSong1 = document.getElementById("playlistSong1");
let playlistSong2 = document.getElementById("playlistSong2");
let playlistSong3 = document.getElementById("playlistSong3");
let playlistSong4 = document.getElementById("playlistSong4");
let playlistSong5 = document.getElementById("playlistSong5");
let playlistSong6 = document.getElementById("playlistSong6");

let play = document.getElementById("play");
let pause = document.getElementById("pause");
let restartPlay = document.getElementById("restartPlay");
let restartPaused = document.getElementById("restartPaused");

let paused = true;

/*
You could see when calling the changing
screens functions that we set the style variable "display"
to inline and the screens that we dont want to show to none
*/
function hideScreens() {
  screen1.style.display = "none";
  screen2.style.display = "none";
  bothBeatsScreen.style.display = "none";
  playlistBeatsScreen.style.display = "none";
  programmedBeatPlayScreen.style.display = "none";
  programmedBeatPausedScreen.style.display = "none";
}

function showScreen1() {
  console.log("Show screen 1");
  hideScreens();
  screen1.style.display = "inline";
}

function showScreen2() {
  console.log("Show screen 2");
  hideScreens();
  screen2.style.display = "inline";
}

function showBothBeatsScreen() {
  console.log("Show Both Beats screen");
  hideScreens();
  bothBeatsScreen.style.display = "inline";
}

let showPlaylistBeatsScreen = function () {
  console.log("Show Playlist Beats screen");
  hideScreens();
  playlistBeatsScreen.style.display = "inline";
}

function showPausedBeatScreen() {
  hideScreens();
  programmedBeatPausedScreen.style.display = "inline";
}

function showPlayBeatScreen() {
  hideScreens();
  programmedBeatPlayScreen.style.display = "inline";
}

//You could see how we are able to access the mouse
//Events of each button
beat_btn.onclick = function () {
  showBothBeatsScreen();
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

  if (!bpm_timer) {
    startBpm()
    metro_bpm.style.fill = "green"
  } else {
    metro_bpm.style.fill = "white"
    clearInterval(bpm_timer)
    bpm_timer = null
  }


}

function changeBPM(evt) {
  bpm = Math.floor(evt.screenY / 2 * (evt.screenY / 120))
  bpm_text.textContent = bpm

  if (bpm_timer) {
    clearInterval(bpm_timer)
    startBpm()
  }


}

function startBpm() {
  bpm_timer = setInterval(() => {
    bar_count % 4 == 0 ? vibration.start("confirmation-max") : vibration.start("confirmation")
    bar_count = bar_count + 1
  }, Math.floor(1000 / (bpm / 60)))

}


// For Playlists
let startProgrammedBeat = function () {
  console.log("song test");
  showPausedBeatScreen();
  programmedBeatInterval();
}

function programmedBeatInterval() {
  bpm_timer = setInterval(() => {
    if (!paused) {
      bar_count % 4 == 0 ? vibration.start("confirmation-max") : vibration.start("confirmation");
      bar_count = bar_count + 1;
      if (bar_count == 12) {
        clearInterval(bpm_timer);
        bpm_timer = setInterval(() => {
          if (!paused) {
            bar_count % 4 == 0 ? vibration.start("confirmation-max") : vibration.start("confirmation");
            bar_count = bar_count + 1;
            if (bar_count == 50) {
              clearInterval(bpm_timer);
            }
          }
        }, Math.floor(1000 / (120 / 60)))
      }
    }
  }, Math.floor(1000 / (60 / 60)))
}

bothBeats_back.onclick = function () {
  showScreen1();
}

playlistBeats_back.onclick = function () {
  showBothBeatsScreen();
}

programmedBeatPlay_back.onclick = function () {
  clearInterval(bpm_timer)
  bpm_timer = null
  showBothBeatsScreen();
}

programmedBeatPaused_back.onclick = function () {
  clearInterval(bpm_timer)
  bpm_timer = null
  showBothBeatsScreen();
}

playlist1.onclick = showPlaylistBeatsScreen;
playlist2.onclick = showPlaylistBeatsScreen;
playlist3.onclick = showPlaylistBeatsScreen;

song1.onclick = startProgrammedBeat;
song2.onclick = startProgrammedBeat;
song3.onclick = startProgrammedBeat;

playlistSong1.onclick = startProgrammedBeat;
playlistSong2.onclick = startProgrammedBeat;
playlistSong3.onclick = startProgrammedBeat;
playlistSong4.onclick = startProgrammedBeat;
playlistSong5.onclick = startProgrammedBeat;
playlistSong6.onclick = startProgrammedBeat;

let restart = function () {
  clearInterval(bpm_timer);
  bar_count = 0
  programmedBeatInterval();
}

restartPaused.onclick = restart;
restartPlay.onclick = restart;

pause.onclick = function () {
  paused = true;
  console.log("pause");
  showPausedBeatScreen();
}

play.onclick = function () {
  paused = false;
  console.log("play");
  showPlayBeatScreen();
}
