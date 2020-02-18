const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async() => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, hegiht: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true; //녹화 시 목소리가 안들리게
        videoPreview.play();
        
        console.log(stream);
    } catch (error) {
        recordBtn.innerHTML = "☹️ Can't record";
        recordBtn.removeEventListener("click", startRecording);
    }
    
}

function init() {
    recordBtn.addEventListener("click", startRecording);
}

if(recorderContainer) {
    init();
}