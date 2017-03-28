var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');
var recitations = [];

// Load the current user.
if (typeof(Storage) !== "undefined") { currentUser = JSON.parse(window.localStorage.getItem("current_user")); }


// Load all of the recitations.
fireRef.child('Recitations').child(currentUser["userID"]).on('value', function(snapshot) {
    var listOfObjects = snapshot.val();
    
    // So bascially, for each recitation in the list of recitations...
    for(var recitation in listOfObjects) {
        
        if(listOfObjects.hasOwnProperty(recitation)) {
            var recitationObject = listOfObjects[recitation];
            
            var item = "<li class='recitation_item' style='font-size:15px;'><img id='recitation_img_" + recitationObject.title + "' width='120' height='120' src='" + recitationObject.image + "' alt='image'><button class='goToBtn' id='goToPoemPageBtn_" + recitationObject.title + "' style='color:black;'>" + recitationObject.title + "</button></li>";
            recList.append(item);
            
            // Add the recitation object and the id for the goto button.
            recitations.push({"goTo_"+recitationObject.title:recitationObject});
            
//            var s1 = 'recitation_img_' + recitationObject.title;
//            var s2 = 'goToPoemPageBtn_' + recitationObject.title;
//            
//            var recImage = document.getElementById(s1);
//            var goToBtn = document.getElementById(s2);
//            recImage.onclick = function() {
//                
//            };
//            goToBtn.onclick = function() {
//                goToPoemPageWithRecitation(recitationObject);
//            };
        }
    }

    
    
    for(var itm in recitations) {
        console.log(itm);
    }
    
});

function goToPoemPageWithRecitation(recitation) {
    // Quickly set the value of the recitation you want to look at.
    if (typeof(Storage) !== "undefined") {
        window.sessionStorage.setItem("recitation_to_look_at", JSON.stringify(recitation));
        document.location = "https://recitedverse.herokuapp.com/poem";
    }
};