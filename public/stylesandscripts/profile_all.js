var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');

var recitations = [];
var clickableRecs = [];

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
            recitations.push(recitationObject);
            clickableRecs.push(item);
            
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

    
    // Print out all the recitation objects.
    for(var i = 0; i < recitations.length; i++) {
        console.log(recitations[i]);
        console.log(clickableRecs[i]);
        
        // Add an 'onclick' attribute for each clickable recitation.
        var itm = "<li class='recitation_item' style='font-size:15px;'><img id='recitation_img_" + recitations[i].title + "' width='120' height='120' src='" + recitations[i].image + "' alt='image'><button class='goToBtn' id='goToPoemPageBtn_" + recitations[i].title + "' style='color:black;' onclick='goToPoemPageWithRecitation(recitations[i])'>" + recitations[i].title + "</button></li>";
        clickableRecs[i] = itm;
    }
    
});

function goToPoemPageWithRecitation(recitation) {
    // Quickly set the value of the recitation you want to look at.
    if (typeof(Storage) !== "undefined") {
        window.sessionStorage.setItem("recitation_to_look_at", JSON.stringify(recitation));
        document.location = "https://recitedverse.herokuapp.com/poem";
    }
};