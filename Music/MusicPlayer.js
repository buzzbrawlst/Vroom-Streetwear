// =================================
// VROOM MUSIC PLAYER
// =================================


import MusicDatabase from "./MusicDatabase.js";



// AUDIO OBJECT

const audio = new Audio();

audio.preload = "auto";



// PLAYER DATA

let playlist = [];

let currentIndex = 0;

let currentSong = null;



// =================================
// LOAD SAVED DATA
// =================================


function loadSaved(){

let saved =
JSON.parse(localStorage.getItem("vroomMusic"));


if(saved){

playlist = saved.playlist || [];

currentIndex = saved.index || 0;

audio.currentTime = saved.time || 0;

audio.volume = saved.volume ?? 0.8;

}

else{

shufflePlaylist();

}

}



// =================================
// SHUFFLE SYSTEM
// =================================


function shufflePlaylist(){


playlist = [...MusicDatabase.Songs];



for(let i = playlist.length - 1; i > 0; i--){

let j = Math.floor(
Math.random() * (i + 1)
);


[
playlist[i],
playlist[j]

]=

[
playlist[j],
playlist[i]

];

}


currentIndex = 0;


saveData();


}




// =================================
// PLAY SONG
// =================================


function playSong(){


currentSong =
playlist[currentIndex];


if(!currentSong) return;



audio.src =

`music/${currentSong.folder}/${currentSong.file}`;



audio.play();



updatePlayer();



saveData();


}



// =================================
// NEXT SONG
// =================================


function nextSong(){


currentIndex++;



if(currentIndex >= playlist.length){


shufflePlaylist();


}



playSong();


}




// =================================
// PREVIOUS SONG
// =================================


function previousSong(){


currentIndex--;


if(currentIndex < 0){

currentIndex =
playlist.length - 1;

}


playSong();


}



// =================================
// PLAY / PAUSE
// =================================


function togglePlay(){


if(audio.paused){

audio.play();

}

else{

audio.pause();

}


}



// =================================
// SAVE PLAYER
// =================================


function saveData(){


localStorage.setItem(

"vroomMusic",

JSON.stringify({

playlist,

index:currentIndex,

time:audio.currentTime,

volume:audio.volume

})

);


}



// =================================
// UPDATE UI
// =================================


function updatePlayer(){


let title =
document.getElementById("song-title");


let artist =
document.getElementById("song-artist");


let cover =
document.getElementById("song-cover");



if(title)

title.innerText =
currentSong.title;



if(artist)

artist.innerText =
currentSong.artist;



if(cover)

cover.src =

`music/${currentSong.folder}/${currentSong.cover}`;



}



// =================================
// EVENTS
// =================================


audio.addEventListener(

"ended",

nextSong

);



audio.addEventListener(

"timeupdate",

saveData

);



// =================================
// CONTROLS
// =================================


window.VROOMPlayer = {


play:playSong,


pause:()=>audio.pause(),


toggle:togglePlay,


next:nextSong,


previous:previousSong,


shuffle:shufflePlaylist,


volume:(value)=>{

audio.volume=value;

saveData();

}


};



// =================================
// START PLAYER
// =================================


window.onload=function(){


loadSaved();


if(!currentSong){

playSong();

}

else{

playSong();

}


};
