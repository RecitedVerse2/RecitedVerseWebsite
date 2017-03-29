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
    console.log(recitation);
    console.log(recitation["author"]);
    
    
    /* SET VARIABLES */
    imageView.src = recitation["image"];
    titleAuthorArea.innerHTML = recitation["title"] + " by " + recitation["author"];
    recitedByArea.innerHTML = "Recited by " + recitation["recited_by"] + ", Published: " + recitation["published"] + ", Genre: " + recitation["genre"];
    descriptionArea.innerHTML = recitation["description"];
    
    playLabel.innerHTML = recitation["plays"];
    likeLabel.innerHTML = recitation["likes"];
    favoriteLabel.innerHTML = recitation["favorites"];
};


playBtn.onclick = function() {
    
};

likeBtn.onclick = function() {
    recitation.likes += 1;
    playLabel.innerHTML = recitation["plays"];
};

favoriteBtn.onclick = function() {
    recitation.favorites += 1;
    favoriteLabel.innerHTML = recitation["favorites"];
};