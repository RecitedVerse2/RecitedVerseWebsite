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


recordBtn.onclick = function() { 
    if(audioRec.hasPermission()) {
        audioRec.startRecording();
    } else {
        audioRec.requestPermission();
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
    }
}