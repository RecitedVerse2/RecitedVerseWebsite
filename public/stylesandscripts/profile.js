/************************
*     PROFILE STUFF     *
*************************/
var profilePicture = document.getElementById('profile_picture');
var backgroundImage = document.getElementById('profile_background');
var nameLabel = document.getElementById('profile_name');
var bioLabel = document.getElementById('profile_bio');
var followersLabel = document.getElementById('profile_followers');
var followingLabel = document.getElementById('profile_following');

var editProfieBtn = document.getElementById('edit_profile_btn');
var logoutBtn = document.getElementById('logout_btn');
var uploadRecitationButton = document.getElementById('upload_recitation_btn');

var facebookBtn = $('#facebookBtn');
var linkedInBtn = $('#linkedInBtn');
var instagramBtn = $('#instagramBtn');
var twitterBtn = $('#twitterBtn');


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
var audio;
var canvas = document.querySelector('.visualizer');
var audioCtx = new (window.AudioContext || webkitAudioContext)();
var canvasCtx = canvas.getContext("2d");
var source;
var createTwice = false;

var nameField = document.getElementById('recitation_name_field');
var authorField = document.getElementById('recitation_author_field');
var publicationField = document.getElementById('recitation_publication_field');
var genreField = document.getElementById('recitation_genre_field');
var poemText = document.getElementById('recitation_text_field');
var descriptionField = document.getElementById('recitation_description_field');
var imageField = document.getElementById('poem_image');

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
*    LOAD USER INFO     *
*************************/

/** Load all of the important user information. */
if (typeof(Storage) !== "undefined") {
    currentUser = JSON.parse(window.localStorage.getItem("current_user"));
 
    
    nameLabel.innerHTML = currentUser["fullname"];
    bioLabel.innerHTML = currentUser["bio"];
    followersLabel.innerHTML = "Followers: " + currentUser["followers"];
    followingLabel.innerHTML = "Following: " + currentUser["following"];
    
    
    var social = currentUser["social_media_links"];
    if(social[0] == '') { facebookBtn.remove('#facebookBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-facebook-square social_button" id="facebookBtn"></button>');
        $('#facebookBtn').click(function() {
            document.location = social[0]; 
        });
    }
    if(social[1] == '') { linkedInBtn.remove('#linkedInBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-linkedin-square social_button" id="linkedInBtn"></button>');
        $('#linkedInBtn').click(function() {
            document.location = social[1]; 
        });
    }
    if(social[2] == '') { instagramBtn.remove('#instgramBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-instagram social_button" id="instagramBtn"></button>');
        $('#instagramBtn').click(function() {
            document.location = social[2]; 
        });
    }
    if(social[3] == '') { twitterBtn.remove('#twitterBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-twitter social_button" id="twitterBtn"></button>');
        $('#twitterBtn').click(function() {
            document.location = social[3]; 
        });
    }
    
    
    var uid = currentUser["userID"];
    var photoid = currentUser["photoURL"];
    var backgroundImg = currentUser["backgroundImage"];
    
    var httpsReference = firebase.storage().refFromURL(''+photoid).getDownloadURL().then(function(url) {
        profilePicture.src = url;
    }).catch(function(error) {
        console.log("User did not have their own profile picture." + error);
    });
    
    var httpsReference = firebase.storage().refFromURL(''+backgroundImg).getDownloadURL().then(function(url) {
        backgroundImage.src = url;
    }).catch(function(error) {
        console.log("User did not have their own profile picture." + error);
    });
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

function requestPermission() { audioRec.requestPermission(); }







/************************
*     BUTTON CLICKS     *
*************************/

recordBtn.onclick = function() {
    audioRec.startRecording();
    isRecording = true;
    recordBtn.style.backgroundColor = "#ADD8E6";
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
    recordBtn.style.backgroundColor = "#ADD8E6";
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
    var text = poemText.value;
    var description = descriptionField.value;
    var image = imageField.src;
    
    if(valueExists(name) && valueExists(author) && valueExists(published) && valueExists(genre) && valueExists(image)
      && valueExists(text) && valueExists(audio)) {
        
        if(!valueExists(description)) { description = ""; }        
        
        // Create a dictionary object for the audio.
        // Save that dictionary to the Firebase database.
        // Save the audio to the Firebase storage.
        // Return from this method.
        
        /* Create dictionary for the recitation. */
        var dictionary = {
            "title":name,
            "author":author,
            "published":published,
            "genre":genre,
            "text":text,
            "description":description,
            "image":image,
            "recited_by":currentUser["fullname"],
            "plays":0,
            "likes":0,
            "favorites":0,
            "comments":[]
        };
        
        
        var myRecording = audioRec.getRecordingFile();
        // If the recording is not null, then upload that. Otherwise, upload a file.
        if(myRecording != null) {
            
            /* Save it to the database under Recitations->UserID->AutoID:Dictionary*/
            fireRef.child("Recitations").child(currentUser["userID"]).child(name).set(dictionary);
            
            /* Save the actual audio to the storage. */
            storageRef.child(currentUser["userID"]).child(name).put(myRecording).then(function() {
                document.location.href = "profile";
            });
            
            submitRecBtn.setAttribute('data-dismiss','modal');  // Allow the submit button to dismiss the modal.
        
        } else if(valueExists(audio)) {
            
            /* Save it to the database under Recitations->UserID->AutoID:Dictionary*/
            fireRef.child("Recitations").child(currentUser["userID"]).child(name).set(dictionary);
            
            /* Save the actual audio to the storage. */
            storageRef.child(currentUser["userID"]).child(name).put(audio).then(function() {
                document.location.href = "profile";
            });
            subm
            itRecBtn.setAttribute('data-dismiss','modal');  // Allow the submit button to dismiss the modal.
        
        } else {
            submitRecBtn.innerHTML = "There was a problem uploading the recitation. Please reload and try again.";
        }
        
        return;
    }
    
    if(!valueExists(name)) { nameField.style.borderColor = "red"; }
    if(!valueExists(author)) { authorField.style.borderColor = "red"; }
    if(!valueExists(published)) { publicationField.style.borderColor = "red"; }
    if(!valueExists(genre)) { genreField.style.borderColor = "red"; }
    if(!valueExists(text)) { poemText.style.borderColor = "red"; }
    if(!valueExists(audio)) { 
        uploadFromFileBtn.style.backgroundColor = "red";
        recordBtn.style.backgroundColor = "red"; 
        setTimeout(function() {
            uploadFromFileBtn.style.backgroundColor = "#ADD8E6";
            recordBtn.style.backgroundColor = "#ADD8E6";
        }, 3000);
    }
};




editProfieBtn.onclick = function() {
    document.location.href = "editprofile";
};

logoutBtn.onclick = function() {
    if (typeof(Storage) !== "undefined") {
        window.localStorage.removeItem("current_user");
        fireAuth.signOut();
        document.location.href = "login";
    }
};