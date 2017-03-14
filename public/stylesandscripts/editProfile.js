var fullNameField = document.getElementById('ep_fullname_field');
var emailField = document.getElementById('ep_email_field');
var passwordField1 = document.getElementById('ep_password1_field');
var passwordField2 = document.getElementById('ep_password2_field');
var bioField = document.getElementById('ep_bio_field');

var saveBtn = document.getElementById('save_btn');

var facebookLink = document.getElementById('facebookLink');
var linkedinLink = document.getElementById('linkedinLink');
var instagramLink = document.getElementById('instagramLink');
var twitterLink = document.getElementById('twitterLink');



$(document).ready(function() {
    
    if (typeof(Storage) !== "undefined") {
        currentUser = JSON.parse(window.localStorage.getItem("current_user"));
        
        fullNameField.value = currentUser["fullname"];
        emailField.value = currentUser["email"];
        bioField.value = currentUser["bio"];
        facebookLink.value = currentUser["social_media_links"][0];
        linkedinLink.value = currentUser["social_media_links"][1];
        instagramLink.value = currentUser["social_media_links"][2];
        twitterLink.value = currentUser["social_media_links"][3];
    }
});



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
    social.push(facebookLink.value);
    social.push(linkedinLink.value);
    social.push(instagramLink.value);
    social.push(twitterLink.value);
    currentUser["social_media_links"] = social;
    
    saveToFirebase(currentUser);
};





function saveToFirebase(obj) {
    fireRef.child('Users').child(''+obj["userID"]).set(obj);
    if (typeof(Storage) !== "undefined") {
        window.localStorage.setItem("current_user", JSON.stringify(obj));
    }
    document.location = "https://recitedverse.herokuapp.com/profile";
}