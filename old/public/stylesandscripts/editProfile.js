var profilePicture = document.getElementById('profile_picture');
var backgroundPicture = document.getElementById('background_picture');

var fullNameField = document.getElementById('ep_fullname_field');
var emailField = document.getElementById('ep_email_field');
var passwordField1 = document.getElementById('ep_password1_field');
var passwordField2 = document.getElementById('ep_password2_field');
var bioField = document.getElementById('ep_bio_field');

var choosePicture = document.getElementById('choose_profile_picture_btn');
var chooseBackground = document.getElementById('choose_background_picture_btn');
var saveBtn = document.getElementById('save_btn');

var facebookLink = document.getElementById('facebookLink');
var linkedinLink = document.getElementById('linkedinLink');
var instagramLink = document.getElementById('instagramLink');
var twitterLink = document.getElementById('twitterLink');

var profilePicInput = document.getElementById('profilepicfile');
var backgroundPicInput = document.getElementById('backgroundimgfile');


$(document).ready(function() {
    
    if (typeof(Storage) !== "undefined") {
        currentUser = JSON.parse(window.localStorage.getItem("current_user"));
        
        var photoid = currentUser["photoURL"];
        var backgroundImg = currentUser["backgroundImage"];
        
        var httpsReference = firebase.storage().refFromURL(''+photoid).getDownloadURL().then(function(url) {
            profilePicture.src = url;
        }).catch(function(error) {
            console.log("Error loading the profile picture." + error);
        });
        var httpsReference = firebase.storage().refFromURL(''+backgroundImg).getDownloadURL().then(function(url) {
            backgroundPicture.src = url;
        }).catch(function(error) {
            console.log("Error loading the background picture." + error);
        });
        fullNameField.value = currentUser["fullname"];
        emailField.value = currentUser["email"];
        bioField.value = currentUser["bio"];
        facebookLink.value = currentUser["social_media_links"][0] || "";
        linkedinLink.value = currentUser["social_media_links"][1] || "";
        instagramLink.value = currentUser["social_media_links"][2] || "";
        twitterLink.value = currentUser["social_media_links"][3] || "";
    }
});




/*
    Button for saving the profile changes.
*/
saveBtn.onclick = function() {
    var fullname = fullNameField.value;
    var email = emailField.value;
    var password1 = passwordField1.value;
    var password2 = passwordField2.value;
    var bio = bioField.value;
    
    
    if( fullname != "" && fullname != null ) {
        currentUser["fullname"] = fullname;
    }
    if( email != "" && email != null && email != currentUser["email"]) {
        var user = firebase.auth().currentUser;
        user.updateEmail(email).then(function() {
            currentUser["email"] = email;
        }, function(error) {
            alert('That email is already in use.');
            return;
        });
    }
    if( password1 != "" && password1 != null ) {
        if( password2 != "" && password2 != null ) {
        
            if(password1 == password2) {
                currentUser["password"] = password1;
            }
            
        }
    }
    if( bio != "" && bio != null ) {
        currentUser["bio"] = bio;
    }
    
    
    var social = [];
    var fbLink = facebookLink.value || "";
    var liLink = linkedinLink.value || "";
    var inLink = instagramLink.value || "";
    var twLink = twitterLink.value || "";
    social.push(fbLink);
    social.push(liLink);
    social.push(inLink);
    social.push(twLink);
    currentUser["social_media_links"] = social;
    
    saveToFirebase(currentUser);
};



/*
    Button for selecting a profile/background picture.
*/
function changeProfilePicture(e) {
    profilePicture.src = e;
};
function changeBackgroundPicture(e) {
    backgroundPicture.src = e;
}

profilePicInput.onchange = function(e) {
    var file    = profilePicInput.files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {  changeProfilePicture(reader.result); }, false);

    if (file) { reader.readAsDataURL(file); }
};
backgroundPicInput.onchange = function() {
    var file    = backgroundPicInput.files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {  changeBackgroundPicture(reader.result); }, false);

    if (file) { reader.readAsDataURL(file); }
};




/*
    Saves the object to firebase.
*/
function saveToFirebase(obj) {
    uploadNewProfilePicture(obj, function() {
        uploadNewBackgroundPicture(obj, function() {
            document.location.href = "profile";
        });
    });
}


function uploadNewProfilePicture(obj, callback) {
    if(profilePicture.src != obj["photoURL"]) { 
        storageRef.child(obj["userID"]).child("profilePicture").putString(profilePicture.src, 'data_url').then(function(snapshot) {
            obj["photoURL"] = snapshot.downloadURL;
            fireRef.child("Users").child(obj["userID"]).update(obj);
            if (typeof(Storage) !== "undefined") { window.localStorage.setItem("current_user", JSON.stringify(obj)); }
            callback();
        });
    } else {
        callback();
    }
}

function uploadNewBackgroundPicture(obj, callback) {
    if(backgroundPicture.src != obj["backgroundImage"]) { 
        storageRef.child(obj["userID"]).child("backgroundPicture").putString(backgroundPicture.src, 'data_url').then(function(snapshot) {
            obj["backgroundImage"] = snapshot.downloadURL;
            fireRef.child("Users").child(obj["userID"]).update(obj);
            if (typeof(Storage) !== "undefined") { window.localStorage.setItem("current_user", JSON.stringify(obj)); }
            callback();
        });
    } else {
        callback();
    }
}






