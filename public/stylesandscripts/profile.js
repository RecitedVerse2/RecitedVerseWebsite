/* All of the parts of the profile. */
var profilePicture = $('#profile_picture');
var nameLabel = $('#profile_name');
var bioLabel = $('#profile_bio');
var followersLabel = $('#profile_followers');
var followingLabel = $('#profile_following');


/* Once the DOM is loaded, fill in all of the user information.
This assumes that currentUser is already initialized. */
$(document).ready(function() {
    
    nameLabel.value = currentUser["fullname"];
    bioLabel.value = "This is my bio";
    followersLabel.val = "Followers: 0";
    followingLabel.val = "Following: 0";
    
    
    
});