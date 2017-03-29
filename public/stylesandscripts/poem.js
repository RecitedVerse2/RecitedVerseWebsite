/* GET VARIABLES */
var imageView = document.getElementById('poem_image');
var titleAuthorArea = document.getElementById('title_author_area');
var recitedByArea = document.getElementById('recBy_Pub_Gen');
var descriptionArea = document.getElementById('descr_area');

var playBtn = document.getElementById('description_play_button');
var likeBtn = document.getElementById('description_like_button');
var favoriteBtn = document.getElementById('description_favorite_button');

var playLabel = document.getElementById('poem_play_label');
var likeLabel = document.getElementById('poem_like_label');
var favoriteLabel = document.getElementById('poem_favorite_label');

var recitation;



if (typeof(Storage) !== "undefined") {
    currentUser = JSON.parse(window.localStorage.getItem("current_user"));
    recitation = JSON.parse(window.sessionStorage.getItem("recitation_to_look_at"));
    
    fireRef.child('Recitations').child(currentUser["userID"]).child(recitation["title"]).on('value', function(snapshot) {
        var recObject = snapshot.val();
        recitation = recObject;
        console.log(recitation);
    });
    
    
    /* SET VARIABLES */
    imageView.src = recitation["image"];
    titleAuthorArea.innerHTML = recitation["title"] + " by " + recitation["author"];
    recitedByArea.innerHTML = "Recited by " + recitation["recited_by"] + ", Published: " + recitation["published"] + ", Genre: " + recitation["genre"];
    descriptionArea.innerHTML = recitation["description"];
    
    playLabel.innerHTML = recitation["plays"];
    likeLabel.innerHTML = recitation["likes"];
    favoriteLabel.innerHTML = recitation["favorites"];
    
    
    
    
    /* FUNCTIONS */
    
    function remove(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    
    playBtn.onclick = function() {

    };

    likeBtn.onclick = function() {
        var s = recitation["title"] + " " + recitation["author"];
        var arr = currentUser["likes"];

        if(!arr.includes(s)) {
            recitation.likes += 1;
            likeLabel.innerHTML = recitation["likes"];
            currentUser["likes"].push(s);

            // Save to firebase.
            fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
            fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
            return;
        } else {
            recitation.likes -= 1;
            likeLabel.innerHTML = recitation["likes"];
            remove(currentUser["likes"], s);
            
            // Save to firebase.
            fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
            fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
            return;
        }
    };

    favoriteBtn.onclick = function() {
        var s = recitation["title"] + " " + recitation["author"];
        var arr = currentUser["favorites"];

        // If it's already there, remove it. If not, add it.
        if(!arr.includes(s)) {
            recitation.favorites += 1;
            favoriteLabel.innerHTML = recitation["favorites"];
            currentUser["favorites"].push(s);

            // Save to firebase.
            fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
            fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
            return;
        } else {
            recitation.favorites -= 1;
            favoriteLabel.innerHTML = recitation["favorites"];
            remove(currentUser["favorites"], s);
            
            // Save to firebase.
            fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
            fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
            return;
        }
    };
};