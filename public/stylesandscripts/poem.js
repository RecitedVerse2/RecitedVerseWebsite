if (typeof(Storage) !== "undefined") {
    var recitation = JSON.parse(window.sessionStorage.getItem("recitation_to_look_at"));
    console.log(recitation);
    
    
    /* GET VARIABLES */
    
    var imageView = document.getElementById('poem_image');
    var titleAuthorArea = document.getElementById('titleAuthorArea');
    var recitedByArea = document.getElementById('recBy_Pub_Gen');
    
    var playBtn = document.getElementById('description_play_button');
    var likeBtn = document.getElementById('description_like_button');
    var favoriteBtn = document.getElementById('description_favorite_button');
    
    var playLabel = document.getElementById('poem_play_label');
    var likeLabel = document.getElementById('poem_like_label');
    var favoriteLabel = document.getElementById('poem_favorite_label');
    
    
    
    
    /* SET VARIABLES */
    imageView.src = recitation.image;
    titleAuthorArea.value = recitation.title + " by " + recitation.author;
    recitedByArea.value = "Recited by " + recitation.recited_by;
    
    playLabel.value = recitation.plays;
    likeLabel.value = recitation.likes;
    favoriteLabel.value = recitation.favorites;
};