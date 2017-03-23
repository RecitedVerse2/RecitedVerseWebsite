/* All of the parts of the profile. */
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
    audioRec.requestPermission();
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


editProfieBtn.onclick = function() {
    document.location = "https://recitedverse.herokuapp.com/editprofile";
};

logoutBtn.onclick = function() {
    if (typeof(Storage) !== "undefined") {
        window.localStorage.removeItem("current_user");
        fireAuth.signOut();
        document.location = "https://recitedverse.herokuapp.com/login";
    }
};




/*

    Creating a recitation.

*/

function CustomAlert() {
    this.render = function(message) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogbox.style.left = (winW/2) - (400 * 0.4)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
    }
    this.ok = function() {
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogbox.style.display = "none";
        dialogoverlay.style.display = "none";
    }
}

var Alert = new CustomAlert();

uploadRecitationButton.onclick = function() {
    Alert.render("Upload");
};