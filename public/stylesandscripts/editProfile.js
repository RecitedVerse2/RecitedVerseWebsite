var fullNameField = document.getElementById('ep_fullname_field');
var emailField = document.getElementById('ep_email_field');
var passwordField1 = document.getElementById('ep_password1_field');
var passwordField2 = document.getElementById('ep_password2_field');
var bioField = document.getElementById('ep_bio_field');

var saveBtn = document.getElementById('save_btn');


$(document).ready(function() {
    
    if (typeof(Storage) !== "undefined") {
        currentUser = JSON.parse(window.localStorage.getItem("current_user"));
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
    if( email != "" && email != null ) {
        currentUser["email"] = email;
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
    
    saveToFirebase(currentUser);
};





function saveToFirebase(obj) {
    fireRef.child('Users').child(''+obj["userID"]).set(obj);
    document.location = "https://recitedverse.herokuapp.com/profile";
}