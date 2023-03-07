// DISCORD INVITE URL
const discordURL = "https://discord.gg/invite/";

//VIDEO
const embedVideo = false; // Set it to "true" if you want to play embedded video
const embedVideoID = "f1MAEDPcUC0"; // YouTube Video ID
//SLIDE IMAGES
const imagesName = ["image1.png", "image2.png", "image3.png"]; // add here the names of the new images added to the ./assets/ folder

// KEYBIND TIPS
// Examples:
// Bold: "<b>Text</b>"
// Italic: "<i>Text</i>"
// Line Break: "Line 1 \n Line 2"
// Colored: "<a style='color: yellow;'> Text </a>"
const keybinds = [
   "<b> LOADING SCREEN </b> \n\n <b>Prev/Next Tips</b>          ‹   › \n <b>Volume Control</b>        ↓   ↑ \n <b>Next/Prev Music</b>     ← → \n <b>Show/Hide Tips</b>        [ J ] \n <b>Show/Hide Player</b>     [ K ] \n <b>Pause Music</b>       Spacebar",
   "<b> GAME INTERACTION </b> \n\n <b>Keybind1</b> Example \n <b>Keybind2</b> Example \n <b>Keybind3</b> Example \n <b>Keybind4</b> Example \n <b>Keybind5</b> Example",
   "<b> GAME INTERACTION </b> \n\n <b>Keybind6</b> Example \n <b>Keybind7</b> Example \n <b>Keybind8</b> Example \n <b>Keybind9</b> Example \n <b>Keybind10</b> Example",
   "<b> GAME INTERACTION </b> \n\n <b>Keybind11</b> Example \n <b>Keybind12</b> Example \n <b>Keybind13</b> Example \n <b>Keybind14</b> Example \n <b>Keybind15</b> Example",
   "<b> GAME INTERACTION </b> \n\n <b>Keybind16</b> Example \n <b>Keybind17</b> Example \n <b>Keybind18</b> Example \n <b>Keybind19</b> Example \n <b>Keybind20</b> Example",
   "<b> GAME INTERACTION </b> \n\n <b>Keybind21</b> Example \n <b>Keybind22</b> Example \n <b>Keybind23</b> Example \n <b>Keybind24</b> Example \n <b>Keybind25</b> Example"
];

//////////////	SONGS


const musicList = [{ // I recommend using discord hosted file links
      "name": "First Snow",
      "artist": "Emancipator",
      "album": "Soon It Will Be Cold Enough",
      "url": "https://521dimensions.com/song/FirstSnow-Emancipator.mp3",
      "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
   },
   {
      "name": "Intro / Sweet Glory",
      "artist": "Jimkata",
      "album": "Die Digital",
      "url": "https://521dimensions.com/song/IntroSweetGlory-Jimkata.mp3",
      "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/die-digital.jpg"
   },
   {
      "name": "Offcut #6",
      "artist": "Little People",
      "album": "We Are But Hunks of Wood Remixes",
      "url": "https://521dimensions.com/song/Offcut6-LittlePeople.mp3",
      "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg"
   },
   {
      "name": "Dusk To Dawn",
      "artist": "Emancipator",
      "album": "Dusk To Dawn",
      "url": "https://521dimensions.com/song/DuskToDawn-Emancipator.mp3",
      "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/from-dusk-to-dawn.jpg"
   },
   {
      "name": "Anthem",
      "artist": "Emancipator",
      "album": "Soon It Will Be Cold Enough",
      "url": "https://521dimensions.com/song/Anthem-Emancipator.mp3",
      "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
   }
]


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
let imageIndex = 0;

function displayImage() {
   const imgContainer = document.querySelector(".img-container");
   const imagePath = "assets/" + imagesName[imageIndex];
   const img = new Image();
   img.onload = function () {
      const imgWidth = this.width;
      const imgHeight = this.height;
      const imgRatio = imgWidth / imgHeight;
      const screenRatio = window.innerWidth / window.innerHeight;
      if (imgRatio >= screenRatio) {
         imgContainer.style.backgroundSize = "auto 100%";
      } else {
         imgContainer.style.backgroundSize = "100% auto";
      }
      imgContainer.style.backgroundImage = `url(${imagePath})`;
      imgContainer.classList.remove('opacity-0');
   };
   img.src = imagePath;
   setTimeout(() => {
      imgContainer.classList.add('opacity-0');
      imageIndex++;
      if (imageIndex >= imagesName.length) {
         imageIndex = 0;
      }
      setTimeout(displayImage, 300);
   }, 10000);
}

if (embedVideo) {
   const videoContainer = document.querySelector("#video-container");
   videoContainer.style.display = "block";
   videoContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${embedVideoID}?version=3&loop=1&autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=${embedVideoID}" frameborder="0"></iframe>`;
} else {
   const videoContainer = document.querySelector("#video-container");
   videoContainer.style.display = "none";
   displayImage();
}

Amplitude.init({
   "bindings": {
      37: 'prev',
      39: 'next',
      32: 'play_pause'
   },
   "callbacks": {
      timeupdate: function () {
         let volume = Amplitude.getVolume();
         document.addEventListener("wheel", function (e) {
            if (e.deltaY > 0) {
               if (volume > 0) {
                  Amplitude.setVolume(volume - 5);
               }
            } else {
               if (volume < 100) {
                  Amplitude.setVolume(volume + 5);
               }
            }
         });
         // Volume control keys
         document.addEventListener("keydown", function (event) {
            if (event.code === "ArrowDown") {
               if (volume > 0) {
                  Amplitude.setVolume(volume - 5);
               }
            } else if (event.code === "ArrowUp") {
               if (volume < 100) {
                  Amplitude.setVolume(volume + 5);
               }
            }
         });
         let percentage = Amplitude.getSongPlayedPercentage();
         if (isNaN(percentage)) {
            percentage = 0;
         }
         let slider = document.getElementById('song-percentage-played');
         slider.style.backgroundSize = percentage + '% 100%';
      }
   },
   "songs": musicList,
});

let currentKeybind = -1;
let intervalId;

const musicplayer = document.getElementById("musicplayer");
const showtips = document.getElementById("tips");

musicplayer.style.display = "none";
showtips.style.display = "block";

document.addEventListener("keydown", function (event) {
   if (event.code === "KeyK") {
      if (musicplayer.style.display === "block") {
         musicplayer.style.display = "none";
      } else {
         musicplayer.style.display = "block";
      }
   } else if (event.code === "KeyJ") {
      if (showtips.style.display === "block") {
         showtips.style.display = "none";
      } else {
         showtips.style.display = "block";
      }
   } else if (event.code === 'Period') {
      nextKeybind();
   } else if (event.code === 'Comma') {
      prevKeybind();
   }
});

document.addEventListener('contextmenu',
   event => event.preventDefault()
);

let timer;

document.addEventListener("mousemove", function () {
   document.body.style.cursor = "default";
   clearTimeout(timer);
   timer = setTimeout(() => {
      document.body.style.cursor = "none";
   }, 5000);
});

function prevKeybind() {
   currentKeybind = (currentKeybind - 1 + keybinds.length) % keybinds.length;
   showKeybind(currentKeybind);
}

function nextKeybind() {
   currentKeybind = (currentKeybind + 1) % keybinds.length;
   showKeybind(currentKeybind);
}

function autoScroll() {
   let tipsElement = document.getElementById("tips");
   if (tipsElement.style.display !== "none") {
      nextKeybind();
   }
}

function showKeybind(index) {
   let keybindTip = document.querySelector("#keybind-tip");
   keybindTip.classList.remove("fade-in");
   clearTimeout(intervalId);
   setTimeout(function () {
      let keybindTip = document.querySelector("#keybind-tip");
      keybindTip.innerHTML = keybinds[index].replace(/\n/g, "<br>");
      keybindTip.classList.add("fade-in");
   }, 500);
   intervalId = setTimeout(autoScroll, 10000);
}

document.getElementById('song-saved').addEventListener('click', function () {
   document.getElementById('song-saved').classList.toggle('saved');
});

document.querySelector("#discord button").addEventListener("click", function () {
   if (typeof window.invokeNative === 'function') {
      window.invokeNative('openUrl', discordURL);
   } else {
      window.open(discordURL);
   }
});

document.querySelector("#prev").addEventListener("click", prevKeybind);
document.querySelector("#next").addEventListener("click", nextKeybind);

Amplitude.play()
autoScroll();

const pauseIcon = document.getElementById('pause-icon');
const playIcon = document.getElementById('play-icon');

pauseIcon.style.display = 'block';
playIcon.style.display = 'none';

document.addEventListener('keydown', (event) => {
   if (event.code === 'Space') {
      if (pauseIcon.style.display === 'block') {
         pauseIcon.style.display = 'none';
         playIcon.style.display = 'block';
      } else {
         playIcon.style.display = 'none';
         pauseIcon.style.display = 'block';
      }
   }
});

pauseIcon.addEventListener('click', () => {
   pauseIcon.style.display = 'none';
   playIcon.style.display = 'block';
});

playIcon.addEventListener('click', () => {
   playIcon.style.display = 'none';
   pauseIcon.style.display = 'block';
});
