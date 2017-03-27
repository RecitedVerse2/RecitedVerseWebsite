/************************
*     AUDIO RECORDER    *
*************************/
var audioRec = new AUAudioRecorder();
var recordBtn = document.getElementById('recordBtn');
var stopRecordBtn = document.getElementById('stopRecBtn');
var playBtn = document.getElementById('playAudioBtn');
var pauseBtn = document.getElementById('pauseBtn');
var stopBtn = document.getElementById('stopBtn');
var clearBtn = document.getElementById('clearBtn');

var isRecording = false;
var canvas = document.querySelector('.visualizer');
var audioCtx = new (window.AudioContext || webkitAudioContext)();
var canvasCtx = canvas.getContext("2d");
var source;
var createTwice = false;

audioRec.requestPermission();

/************************
*    OTHER VARIABLES    *
*************************/

var nameField = document.getElementById('recitation_name_field');
var authorField = document.getElementById('recitation_author_field');
var publicationField = document.getElementById('recitation_publication_field');
var genreField = document.getElementById('recitation_genre_field');

var uploadFromFileBtn = document.getElementById('fromFileBtn');
var submitRecBtn = document.getElementById('submit_recitation_btn');






/************************
*    UTILITY METHODS    *
*************************/

/** Returns whether or not the value for a particular element exists. Just an easy way to check if it is not null or 
undefined. */
function valueExists(element) {
    if(element != null && element != undefined && element != "") {
        return true;
    } else {
        return false;
    }
}




/************************
*   AUDIO CANVAS STUFF  *
*************************/

jQuery(function($) {
    $("canvas").remove();
});

function createAudioCanvas() {
    var canv = document.createElement("canvas");
    canv.classList.add("visualizer");
    canv.setAttribute("id","visualizer");
    canv.style.width = "200px";
    document.getElementById("canvas_holder").appendChild(canv);
    canvas = canv;
    canvasCtx = canvas.getContext("2d");
};

function drawAudio(stream, audio, playing) {

    if(audio == null || audio == undefined || playing == false) {
        source = audioCtx.createMediaStreamSource(stream);
    } else {
        if(createTwice == false) {
            source = audioCtx.createMediaElementSource(audio);
        }
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
};




/************************
*     BUTTON CLICKS     *
*************************/

recordBtn.onclick = function() {
    audioRec.startRecording();
    isRecording = true;
    recordBtn.style.backgroundColor = "rgb(76, 182, 203)";
    if(document.getElementById("visualizer") != null && document.getElementById("visualizer") != undefined) {
        document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
    }
    createAudioCanvas();
    drawAudio( audioRec.getStream(), null, false );
    createTwice = false;
};

stopRecordBtn.onclick = function() { 
    audioRec.stopRecording();
    isRecording = false;
    recordBtn.style.backgroundColor = "rgb(76, 182, 203)";
    audio = audioRec.getRecording();
    document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
    createTwice = false;
};

playBtn.onclick = function() {
    if(audioRec.getRecording() == null) {
        // Don't play
    } else {
        audioRec.play();
        if(document.getElementById("visualizer") != null && document.getElementById("visualizer") != undefined) {
            document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
        }
        createAudioCanvas();
        drawAudio( null, audioRec.getRecording() , true );
        createTwice = true;
    }
};

pauseBtn.onclick = function() { 
    audioRec.pause();
};

stopBtn.onclick = function() { 
    audioRec.stop();
};

clearBtn.onclick = function() { 
    audioRec.clear();
    if(document.getElementById("visualizer") != null && document.getElementById("visualizer") != undefined) {
        document.getElementById("canvas_holder").removeChild(document.getElementById("visualizer"));
    }
};


submitRecBtn.onclick = function() {
    var name = nameField.value;
    var author = authorField.value;
    var published = publicationField.value;
    var genre = genreField.value;
    
    
    if(valueExists(name) && valueExists(author) && valueExists(published) && valueExists(genre)) {
        
        // Create a dictionary object for the audio.
        // Save that dictionary to the Firebase database.
        // Save the audio to the Firebase storage.
        // Return from this method.
        
        return;
    }
    
    if(!valueExists(name)) { nameField.style.borderColor = "red"; }
    if(!valueExists(author)) { authorField.style.borderColor = "red"; }
    if(!valueExists(published)) { publicationField.style.borderColor = "red"; }
    if(!valueExists(genre)) { genreField.style.borderColor = "red"; }
};
