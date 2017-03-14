/* All of the parts of the profile. */
var profilePicture = document.getElementById('profile_picture');
var nameLabel = document.getElementById('profile_name');
var bioLabel = document.getElementById('profile_bio');
var followersLabel = document.getElementById('profile_followers');
var followingLabel = document.getElementById('profile_following');
var editProfieBtn = document.getElementById('edit_profile_btn');

var facebookBtn = document.getElementById('facebookBtn');
var linkedInBtn = document.getElementById('linkedInBtn');
var instagramBtn = document.getElementById('instagramBtn');
var twitterBtn = document.getElementById('twitterBtn');


if (typeof(Storage) !== "undefined") {
    currentUser = JSON.parse(window.localStorage.getItem("current_user"));
 
    
    nameLabel.innerHTML = currentUser["fullname"];
    bioLabel.innerHTML = currentUser["bio"];
    followersLabel.innerHTML = "Followers: " + currentUser["followers"];
    followingLabel.innerHTML = "Following: " + currentUser["following"];
    
    
    var social = currentUser["social_media_links"];
    if(social.indexOf("facebook") < 0) { facebookBtn.style.visibility = 'hidden'; }
    if(social.indexOf("linkedin") < 0) { linkedInBtn.style.visibility = 'hidden'; }
    if(social.indexOf("instagram") < 0) { instagramBtn.style.visibility = 'hidden'; }
    if(social.indexOf("twitter") < 0) { twitterBtn.style.visibility = 'hidden'; }
    
    
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