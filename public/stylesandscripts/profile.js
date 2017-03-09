/* All of the parts of the profile. */
var profilePicture = $('#profile_picture');
var nameLabel = $('#profile_name');
var bioLabel = $('#profile_bio');
var followersLabel = $('#profile_followers');
var followingLabel = $('#profile_following');


/* Once the DOM is loaded, fill in all of the user information.
This assumes that currentUser is already initialized. */
$(document).ready(function() {
    
    currentUser = window.loadCurrentUser();
    
    nameLabel.value = currentUser["fullname"];
    bioLabel.value = currentUser["bio"];
    followersLabel.val = "Followers: " + currentUser["followers"];
    followingLabel.val = "Following: " + currentUser["following"]; 
    
});