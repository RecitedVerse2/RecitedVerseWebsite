var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');

// Load the current user.
if (typeof(Storage) !== "undefined") { currentUser = JSON.parse(window.localStorage.getItem("current_user")); }

// Load all of the recitations.
fireRef.child('Recitations').child(currentUser["userID"]).on('value', function(snapshot) {
    var listOfObjects = snapshot.val();
    
    // So bascially, for each recitation in the list of recitations...
    for(var recitation in listOfObjects) {
        
        if(listOfObjects.hasOwnProperty(recitation)) {
            var recitationObject = listOfObjects[recitation];
            
            var item = "<li class='recitation_item' style='font-size:15px;'><img id='recitation_img' width='120' height='120' src='" + recitationObject.image + "' alt='image'><button id='goToPoemPageBtn' style='color:black;'>" + recitationObject.title + "</button></li>";
            recList.append(item);
            
            
            
            var recImage = document.getElementById('recitation_img');
            var goToBtn = document.getElementById('goToPoemPageBtn');
            recImage.onclick = function() {
                goToPoemPageWithRecitation(recitationObject);
            };
            goToBtn.onclick = function() {
                goToPoemPageWithRecitation(recitationObject);
            };
        }
    }

}); 


function goToPoemPageWithRecitation(recitation) {
    document.location = "https://recitedverse.herokuapp.com/poem"; 
};