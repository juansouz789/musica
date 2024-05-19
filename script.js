const songName = document.getElementById('nomeMusica');
const play = document.getElementById('play');
const song = document.getElementById('raudio');
const bandName = document.getElementById('artista');
const cover = document.getElementById('capa');
const next = document.getElementById('next');
const previous = document.getElementById('voltar');
const currentProgress = document.getElementById('progresso-atual');
const progressContainer = document.getElementById('progresscontainer');
const shuffle = document.getElementById('embaralhar');
const repeat = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const likeButton = document.getElementById('like');

const happierThanEver = {
    songName : 'Happier Than Ever',
    artist : 'Billie Eilish',
    file : 'happierThanEver',
    liked : false
};
const yourPower = {
    songName: 'Your Power',
    artist: 'Billie Eilish',
    file: 'yourPower',
    liked: false
};
const maleFantasy = {
    songName: "Male Fantasy",
    artist: 'Billie Eilish',
    file: 'maleFantasy',
    liked: false
};
const billiebossanova = {
    songName: "Billie Bossa Nova",
    artist: 'Billie Eilish',
    file: 'billiebossanova',
    liked: false
};
const everybodydies = {
    songName: "Everybody dies",
    artist: 'Billie Eilish',
    file: 'everybodydies',
    liked: false
};
const gettingolder = {
    songName: "Getting older",
    artist: 'Billie Eilish',
    file: 'gettingolder',
    liked: false
};
const goldwing = {
    songName: "Goldwing",
    artist: 'Billie Eilish',
    file: 'goldwing',
    liked: false
};
const halleyscomet = {
    songName: "Halley's Comet",
    artist: 'Billie Eilish',
    file: 'halleyscomet',
    liked: false
};
const ididntchangemynumber = {
    songName: "I didn't Change My Number",
    artist: 'Billie Eilish',
    file: 'ididntchangemynumber',
    liked: false
};
const lostcause = {
    songName: "Lost Cause",
    artist: 'Billie Eilish',
    file: 'lostcause',
    liked: false
};
const myfuture = {
    songName: "My Future",
    artist: 'Billie Eilish',
    file: 'myfuture',
    liked: false
};
const nda = {
    songName: "NDA",
    artist: 'Billie Eilish',
    file: 'nda',
    liked: false
};
const overheated = {
    songName: "Overheated",
    artist: 'Billie Eilish',
    file: 'overheated',
    liked: false
};
const oxytocin = {
    songName: "Oxytocin",
    artist: 'Billie Eilish',
    file: 'oxytocin',
    liked: false
};
const thereforeiam = {
    songName: "Therefore I Am",
    artist: 'Billie Eilish',
    file: 'thereforeiam',
    liked: false
};
let taTocando = false;
let isShuffle = false;
let repeatOn = false;
const playlist = [happierThanEver, yourPower, maleFantasy, billiebossanova, everybodydies, gettingolder, goldwing, halleyscomet, ididntchangemynumber, lostcause, myfuture, nda, overheated, oxytocin, thereforeiam];
let sortedplaylist = [...playlist];
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill')
    play.querySelector('.bi').classList.add('bi-pause-circle-fill')
    song.play()
    taTocando = true;
}
function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill')
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
    song.pause()
    taTocando = false;
}
function playPauseDecider (){
    if(taTocando ===true){
        pauseSong()
    }else{
        playSong()
    }
}
function inicializacaoMusica(){
    cover.src = `imagens/${sortedplaylist[index].file}.jpg`;
    song.src = `musicas/${sortedplaylist[index].file}.mp3`;
    songName.innerText = sortedplaylist[index].songName;
    bandName.innerText = sortedplaylist[index].artist;
    likeButtonRender()
    
}
function previousSong(){
    if(index===0){
        index = sortedplaylist.length - 1;
    }else{
        index -= 1;
    }
    inicializacaoMusica()
    playSong()
    
}
function nextSong() {
    if (index === sortedplaylist.length - 1) {
        index = 0;
    }else {
        index += 1;
    }
    inicializacaoMusica()
    playSong()
    
}
function updateProgress(){
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}
function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}
function shuffleArray(preshuffleArray){
    const size = preshuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0){
        Math.randomIndex = Math.floor(Math.random()*size);
        let aux = preshuffleArray[currentIndex];
        preshuffleArray[currentIndex] = preshuffleArray[Math.randomIndex];
        preshuffleArray[Math.randomIndex] = aux;
        currentIndex -=1;
    }
}
function shuffleClicked(){
    if (isShuffle===false){
        isShuffle = true;
        shuffleArray(sortedplaylist)
        shuffle.classList.add('button-active')
    }
    else{
        isShuffle = false;;
        sortedplaylist = [...playlist];
        shuffle.classList.remove('button-active')
    }
}
function repeatButtonClick(){
    if(repeatOn===false){
        repeatOn = true;
        repeat.classList.add('button-active')
    }else{
        repeatOn = false;
        repeat.classList.remove('button-active')
    }
}
function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }else{
        playSong();
    }
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}
function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}
function likeButtonRender(){
    if(sortedplaylist[index].liked === false){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }else{
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}
function likeButtonClicked(){
    if(sortedplaylist[index].liked === false){
        sortedplaylist[index].liked = true;
    }else{
        sortedplaylist[index].liked = false;
    }
    likeButtonRender()
}

inicializacaoMusica()
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong); 
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat)
song.addEventListener('loadedmetadata', updateTotalTime)
progressContainer.addEventListener('click',jumpTo)
shuffle.addEventListener('click',shuffleClicked)
repeat.addEventListener('click',repeatButtonClick)
likeButton.addEventListener('click',likeButtonClicked)