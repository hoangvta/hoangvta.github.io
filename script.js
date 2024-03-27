let video = document.getElementById('myVideo');
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

// Function to draw the edge frame on the canvas
function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    captureVideo();
    edgeDetection();
}


function captureVideo() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function conv3x(data, idx, w, m){
    return (m[0]*data[idx - w - 4] + m[1]*data[idx - 4] + m[2]*data[idx + w - 4]
        -m[0]*data[idx - w + 4] - m[1]*data[idx + 4] - m[2]*data[idx + 4 + 4]);
}
  
function conv3y(data, idx, w, m){
    return (m[0]*data[idx - w - 4] + m[1]*data[idx - w] + m[2]*data[idx - w + 4]
        -(m[0]*data[idx + w - 4] + m[1]*data[idx + w] + m[2]*data[idx + w + 4]));
}

function gradient_internal(pixels, mask)
{
  var data = pixels.data;
  var w = pixels.width*4;
  var l = data.length - w - 4;
  var buff = new data.constructor(new ArrayBuffer(data.length));
  
  for (var i = w + 4; i < l; i+=4){
    var dx = conv3x(data, i, w, mask);
    var dy = conv3y(data, i, w, mask);
    buff[i] = buff[i + 1] = buff[i + 2] = Math.sqrt(dx*dx + dy*dy);
    buff[i + 3] = 255;
  }
  pixels.data.set(buff);
}

function edgeDetection() {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    gradient_internal(pixels, [1, 2, 1]);
    ctx.putImageData(pixels, 0, 0);
}

// Draw frame on video play and every frame update
video.addEventListener('play', drawFrame);
// video.addEventListener('timeupdate', drawFrame);
// Clear the frame while pausing
video.addEventListener('pause', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});