/*
    AUDIO RECORDER
*/
var audioRec = new AUAudioRecorder();
var recordBtn = document.getElementById('recordBtn');
var stopRecordBtn = document.getElementById('stopRecBtn');
var playBtn = document.getElementById('playBtn');
var pauseBtn = document.getElementById('pauseBtn');
var stopBtn = document.getElementById('stopBtn');
var clearBtn = document.getElementById('clearBtn');

var isRecording = false;
var canvas = document.querySelector('.visualizer');
var audioCtx = new (window.AudioContext || webkitAudioContext)();
var canvasCtx = canvas.getContext("2d");
var audio;

audioRec.requestPermission();

/*
    AUDIO CANVAS STUFF
*/
jQuery(function($) {
    $("canvas").remove();
});

function createAudioCanvas() {
    var canv = document.createElement("canvas");
    canv.classList.add("visualizer");
    canv.setAttribute("id","visualizer");
    document.getElementById("canvas_holder").appendChild(canv);
    canvas = canv;
    canvasCtx = canvas.getContext("2d");
};

function drawAudio(stream, playing) {
    var source;

    if(audio == null || audio == undefined || playing == false) {
        source = audioCtx.createMediaStreamSource(stream);
    } else {
        source = audioCtx.createMediaElementSource(audio);
    }

    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    // Only hear it when you are listening, not recording.
    if(audio != null && audio != undefined && playing == true) {
        analyser.connect(audioCtx.destination);
    }

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    draw();

    function draw() {

        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;


        for(var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
    }
}



/*
    BUTTON CLICKS
*/
recordBtn.onclick = function() { 
    if(isRecording == false) {
        audio.startRecording();
        isRecording = true;
        recordBtn.style.backgroundColor = "#e24538";
        if(document.getElementById("visualizer") != null && document.getElementById("visualizer") != undefined) {
            document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
        }
        createAudioCanvas();
        drawAudio( audioRec.getStream(), false );
    } else {

        audioRec.stopRecording();
        isRecording = false;
        recordBtn.style.backgroundColor = "#70dbdb";
        audio = audioRec.getRecording();
        document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
    }
}

stopRecordBtn.onclick = function() { 
    audioRec.stopRecording();
}

playBtn.onclick = function() {
    if(audioRec.getRecording() == null) {
        $('[data-toggle="popover"]').popover();
    } else {
        audioRec.play();
        if(document.getElementById("visualizer") != null && document.getElementById("visualizer") != undefined) {
            document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
        }
        createAudioCanvas();
        drawAudio( null, true );
    }
}

pauseBtn.onclick = function() { 
    if(audioRec.getRecording() == null) {
        $('[data-toggle="popover"]').popover();
    } else {
        audioRec.pause();
    }
}

stopBtn.onclick = function() { 
    if(audioRec.getRecording() == null) {
        $('[data-toggle="popover"]').popover();
    } else {
        audioRec.stop();
    }
}

clearBtn.onclick = function() { 
    if(audioRec.getRecording() == null) {
        $('[data-toggle="popover"]').popover();
    } else {
        audioRec.clear();
        if(document.getElementById("visualizer") != null && document.getElementById("visualizer") != undefined) {
			document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
		}
    }
}