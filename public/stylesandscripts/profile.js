/* All of the parts of the profile. */
var profilePicture = $('#profile_picture');
var nameLabel = $('#profile_name');
var bioLabel = $('#profile_bio');
var followersLabel = $('#profile_followers');
var followingLabel = $('#profile_following');



currentUser = loadCurrentUser();
    
nameLabel.value = currentUser["fullname"];
bioLabel.value = currentUser["bio"];
followersLabel.val = "Followers: " + currentUser["followers"];
followingLabel.val = "Following: " + currentUser["following"]; 