/* All of the parts of the profile. */
var profilePicture = document.getElementById('profile_picture');
var nameLabel = document.getElementById('profile_name');
var bioLabel = document.getElementById('profile_bio');
var followersLabel = document.getElementById('profile_followers');
var followingLabel = document.getElementById('profile_following');
var editProfieBtn = document.getElementById('edit_profile_btn');


if (typeof(Storage) !== "undefined") {
    currentUser = JSON.parse(window.localStorage.getItem("current_user"));
 
    
    nameLabel.innerHTML = currentUser["fullname"];
    bioLabel.innerHTML = currentUser["bio"];
    followersLabel.innerHTML = "Followers: " + currentUser["followers"];
    followingLabel.innerHTML = "Following: " + currentUser["following"];
    
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