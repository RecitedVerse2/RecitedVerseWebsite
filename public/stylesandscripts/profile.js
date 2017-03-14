/* All of the parts of the profile. */
var profilePicture = document.getElementById('profile_picture');
var nameLabel = document.getElementById('profile_name');
var bioLabel = document.getElementById('profile_bio');
var followersLabel = document.getElementById('profile_followers');
var followingLabel = document.getElementById('profile_following');
var editProfieBtn = document.getElementById('edit_profile_btn');

var facebookBtn = $('#facebookBtn');
var linkedInBtn = $('#linkedInBtn');
var instagramBtn = $('#instagramBtn');
var twitterBtn = $('#twitterBtn');


if (typeof(Storage) !== "undefined") {
    currentUser = JSON.parse(window.localStorage.getItem("current_user"));
 
    
    nameLabel.innerHTML = currentUser["fullname"];
    bioLabel.innerHTML = currentUser["bio"];
    followersLabel.innerHTML = "Followers: " + currentUser["followers"];
    followingLabel.innerHTML = "Following: " + currentUser["following"];
    
    
    var social = currentUser["social_media_links"];
    if(social.indexOf("facebook") < 0) { facebookBtn.remove('#facebookBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-facebook-square social_button" id="facebookBtn"></button>')
    }
    if(social.indexOf("linkedin") < 0) { linkedInBtn.remove('#linkedInBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-linkedin-square social_button" id="linkedInBtn"></button>');
    }
    if(social.indexOf("instagram") < 0) { instagramBtn.remove('#instgramBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-instagram social_button" id="instagramBtn"></button>');
    }
    if(social.indexOf("twitter") < 0) { twitterBtn.remove('#twitterBtn'); } else {
        $('.social_buttons').append('<button class="fa fa-twitter social_button" id="twitterBtn"></button>');
    }
    
    
    var uid = currentUser["userID"];
    var photoid = currentUser["photoURL"];
    
    var httpsReference = firebase.storage().refFromURL(''+photoid).getDownloadURL().then(function(url) {
        profilePicture.src = url;
    }).catch(function(error) {
        console.log("User did not have their own profile picture." + error);
    });
}


editProfieBtn.onclick = function() {
    document.location = "https://recitedverse.herokuapp.com/editprofile";
};