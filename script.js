let video = document.getElementById('myVideo');
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d', { willReadFrequently: true });

// Function to draw the edge frame on the canvas
function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    captureVideo();
    edgeDetection();
}


function captureVideo() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function edgeDetection() {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(pixels);
}

// Draw frame on video play and every frame update
video.addEventListener('play', drawFrame);
video.addEventListener('timeupdate', drawFrame);
// Clear the frame while pausing
video.addEventListener('pause', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});