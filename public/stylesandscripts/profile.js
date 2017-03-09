/* All of the parts of the profile. */
var profilePicture = $('#profile_picture');
var nameLabel = $('#profile_name');
var bioLabel = $('#profile_bio');
var followersLabel = $('#profile_followers');
var followingLabel = $('#profile_following');


/* Once the DOM is loaded, fill in all of the user information.
This assumes that currentUser is already initialized. */
$(document).ready(function() {
    
   if (typeof(Storage) !== "undefined") {
        // Retrieve the current user
        var cUser = JSON.parse(window.localStorage.getItem("current_user"));
    
        console.log(cUser);
       
        nameLabel.value = cUser["fullname"];
        bioLabel.value = cUser["bio"];
        followersLabel.val = "Followers: " + cUser["followers"];
        followingLabel.val = "Following: " + cUser["following"];
   
   }
    
    
});