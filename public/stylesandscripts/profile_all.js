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
            
            var goToBtn = "<button class='goToBtn' id='goToPoemPageBtn_" + recitationObject.title + "' style='color:black;'>" + recitationObject.title + "</button>";
            var imageItem = "<img id='recitation_img_" + recitationObject.title + "' width='120' height='120' src='" + recitationObject.image + "' alt='image'>";
            var listItem = "<li class='recitation_item' style='font-size:15px;'>"+imageItem+goToBtn+"</li>";
            recList.append(listItem);
            
            var parser = new DOMParser();
            var s = 'goToPoemPageBtn_'+recitationObject.title;
            var buttonObject = parser.parseFromString(goToBtn, "text/html").getElementById(s);
            buttonObject.onclick = function() {
                console.log(recitationObject.title);
            };
            
            // Add the recitation object and the id for the goto button.
//            recitations.push(recitationObject);
//            clickableRecs.push(buttonObject.activeElement);
        }
    }

    
    // Print out all the recitation objects.
    for(var i = 0; i < recitations.length; i++) {
        
    }
    
});

function goToPoemPageWithRecitation(recitation) {
    // Quickly set the value of the recitation you want to look at.
    if (typeof(Storage) !== "undefined") {
        window.sessionStorage.setItem("recitation_to_look_at", recitation);
        document.location = "https://recitedverse.herokuapp.com/poem";
    }
};