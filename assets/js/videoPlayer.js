const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video"); //여러 함수에서 사용해야 함
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
    const videoID = window.location.href.split("/videos")[1];
    fetch(`/api/${videoID}/view`, {
        method: "POST"
    }); //database를 변경해야하면 post
};

function handlePlayClick() {
    if(videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick() {
    let value;
    if(videoPlayer.muted) {
        videoPlayer.muted = false;
        value = videoPlayer.volume;
        //mute한다고해서 volume값이 없어지는 것이 아니고 handleDrag()가 기억하고 있다가 돌려줌
    } else {
        value = 0;
        videoPlayer.muted = true;
    }
    volumeRange.value = value; 
    handleIcon(value);
}

function exitFullScreen() {
    fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScrnBtn.addEventListener("click", goFullScreen);
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if(document.mozExitFullscreen) {
        document.mozExitFullscreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function goFullScreen() {
    if(videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if(videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if(videoContainer.mozRequestFullscreen) {
        videoContainer.mozRequestFullscreen();
    } else if(videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
    fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrnBtn.removeEventListener("click", goFullScreen);
    fullScrnBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => { //시간이 주어졌을 때 00:00:00 형식으로 변환하는 함수(ex 10000초)
    const secondsNumber = parseInt(seconds, 10); // 초를 10진법 정수로 설정
    let hours = Math.floor(secondsNumber / 3600); // 1시간은 3600초(2시간)
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60); // 1분은 60초(46분)
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60; // (40초. total 02:46:40)

    if(hours < 10) {
        hours = `0${hours}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(seconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() { 
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);// time get은 한 번만 일어나는 이벤트이므로 매 초마다 갱신해줌
}

function handleEnded() {
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    registerView();
}

function handleDrag(event) {
    const {
        target: { value }
    } = event;
    handleIcon(value)
    videoPlayer.volume = value;   
}

function handleIcon(value){
    if(value >= 0.6) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    } else if(value >= 0.2) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
    } else if(value <= 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>'
    }
}

function init() {
    videoPlayer.volume = 0.5; // 설정해줘야 모바일에서도 조정 가능
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrnBtn.addEventListener("click", goFullScreen);
    if(videoPlayer.readyState >= 2){
        setTotalTime();
    }  // https://bit.ly/2wa3Yjg 참조
    videoPlayer.addEventListener("ended", handleEnded);
    volumeRange.addEventListener("input", handleDrag);
}

if(videoContainer) {
    init();
}