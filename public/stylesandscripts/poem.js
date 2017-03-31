/* GET VARIABLES */
var imageView = document.getElementById('poem_image');
var titleAuthorArea = document.getElementById('title_author_area');
var recitedByArea = document.getElementById('recBy_Pub_Gen');
var descriptionArea = document.getElementById('descr_area');

var playBtn = document.getElementById('description_play_button');
var likeBtn = document.getElementById('description_like_button');
var favoriteBtn = document.getElementById('description_favorite_button');
var viewTranscriptBtn = $('#view_transcript_btn');

var playLabel = document.getElementById('poem_play_label');
var likeLabel = document.getElementById('poem_like_label');
var favoriteLabel = document.getElementById('poem_favorite_label');

var recitation;



if (typeof(Storage) !== "undefined") {
    currentUser = JSON.parse(window.localStorage.getItem("current_user"));
    recitation = JSON.parse(window.sessionStorage.getItem("recitation_to_look_at"));
    
    // Load the current version of it from firebase.
    loadCurrentUser(function() {
        loadRecitation(function() {
            
            /* SET VARIABLES */
            imageView.src = recitation["image"];
            titleAuthorArea.innerHTML = recitation["title"] + " by " + recitation["author"];
            recitedByArea.innerHTML = "Recited by " + recitation["recited_by"] + ", Published: " + recitation["published"] + ", Genre: " + recitation["genre"];
            descriptionArea.innerHTML = recitation["description"];

            playLabel.innerHTML = recitation["plays"];
            likeLabel.innerHTML = recitation["likes"];
            favoriteLabel.innerHTML = recitation["favorites"];
            
            transcriptParagraph.innerHTML = recitation["text"];
            viewTranscriptBtn.attr('data-content',recitation["text"]);

            // Set the title of the page.
            document.head.title = "Recited Verse - " + recitation.title;
            


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
                audioPlayer_playRecitation();
            };

            likeBtn.onclick = function() {
                var s = recitation["title"] + " " + recitation["author"];
                var arr = currentUser["likes"];
                if(arr === undefined || arr == null) { arr = []; }
                
                if(!arr.includes(s)) {
                    recitation.likes += 1;
                    likeLabel.innerHTML = recitation["likes"];
                    arr.push(s);
                    currentUser["likes"] = arr;

                    // Save to firebase.
                    fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
                    fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
                    return;
                } else {
                    recitation.likes -= 1;
                    likeLabel.innerHTML = recitation["likes"];
                    remove(arr, s);
                    currentUser["likes"] = arr;

                    // Save to firebase.
                    fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
                    fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
                    return;
                }
            };

            favoriteBtn.onclick = function() {
                var s = recitation["title"] + " " + recitation["author"];
                var arr = currentUser["favorites"];
                if(arr === undefined || arr == null) { arr = []; }

                // If it's already there, remove it. If not, add it.
                if(!arr.includes(s)) {
                    recitation.favorites += 1;
                    favoriteLabel.innerHTML = recitation["favorites"];
                    arr.push(s);
                    currentUser["favorites"] = arr;

                    // Save to firebase.
                    fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
                    fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
                    return;
                } else {
                    recitation.favorites -= 1;
                    favoriteLabel.innerHTML = recitation["favorites"];
                    remove(arr, s);
                    currentUser["favorites"] = arr;

                    // Save to firebase.
                    fireRef.child("Recitations").child(currentUser["userID"]).child(recitation["title"]).set(recitation);
                    fireRef.child("Users").child(currentUser["userID"]).update(currentUser);
                    return;
                }
            };
        
            viewTranscriptBtn.onclick = function() {
                $('[data-toggle="popover"]').popover();
            };
            
        }); // End of loading recitation.
        
    }); // End of loading user.
};


function loadCurrentUser(callback) {
    fireRef.child('Users').child(currentUser["userID"]).once('value', function(snapshot) {
        var userObj = snapshot.val();
        currentUser = userObj;
    
        callback();
    });
};


function loadRecitation(callback) {
    fireRef.child('Recitations').child(currentUser["userID"]).child(recitation["title"]).once('value', function(snapshot) {
        var recObject = snapshot.val();
        recitation = recObject;
        
        callback();
    });
};