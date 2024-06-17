const videoGrid = document.getElementById('video-grid');
const muteButton = document.getElementById('muteButton');
const stopVideoButton = document.getElementById('stopVideoButton');

let localStream;

async function startVideo() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const videoElement = document.createElement('video');
        videoElement.srcObject = localStream;
        videoElement.muted = true;
        videoElement.addEventListener('loadedmetadata', () => {
            videoElement.play();
        });
        videoGrid.append(videoElement);
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}

muteButton.addEventListener('click', () => {
    const enabled = localStream.getAudioTracks()[0].enabled;
    localStream.getAudioTracks()[0].enabled = !enabled;
    muteButton.textContent = enabled ? 'Unmute' : 'Mute';
});

stopVideoButton.addEventListener('click', () => {
    const enabled = localStream.getVideoTracks()[0].enabled;
    localStream.getVideoTracks()[0].enabled = !enabled;
    stopVideoButton.textContent = enabled ? 'Play Video' : 'Stop Video';
});

startVideo();
