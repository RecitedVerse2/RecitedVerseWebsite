/* All of the parts of the profile. */
var profilePicture = document.getElementById('profile_picture');
var nameLabel = document.getElementById('profile_name');
var bioLabel = document.getElementById('profile_bio');
var followersLabel = document.getElementById('profile_followers');
var followingLabel = document.getElementById('profile_following');


if (typeof(Storage) !== "undefined") {
    currentUser = JSON.parse(window.localStorage.getItem("current_user"));
 
    
    nameLabel.innerHTML = currentUser["fullname"];
    bioLabel.innerHTML = currentUser["bio"];
    followersLabel.innerHTML = "Followers: " + currentUser["followers"];
    followingLabel.innerHTML = "Following: " + currentUser["following"];
    
    var uid = currentUser["userID"];
    var photid = currentUser["photoURL"];
    
    console.log(photid);
    
    storageRef.child(uid).child().getDownloadURL().then(function(url) {
        profilePicture.src = url;
    }).catch(function(error) {
        console.log("User did not have their own profile picture." + error);
        
        // Handle any errors
        storageRef.child('circleProfilePic.png').getDownloadURL().then(function(url) {
            profilePicture.src = url;
        }).catch(function(error) {
            console.log("Couldn't load any profile picture." + error);
        });
    });
}