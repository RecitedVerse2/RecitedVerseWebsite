var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');


var btnIDs = [];
var imgIDs = [];
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
            
            // Create the html elements.
            var goToBtn = "<button class='goToBtn' id='goToPoemPageBtn_" + recitationObject.title + "' style='color:black;'>" + recitationObject.title + "</button>";
            var imageItem = "<img class='general_rec_image' id='recitation_img_" + recitationObject.title + "' width='120' height='120' src='" + recitationObject.image + "' alt='image'>";
            var listItem = "<li class='recitation_item' style='font-size:15px;'>"+imageItem+goToBtn+"</li>";
            recList.append(listItem);
            
            // Get a reference to the id that each button element has.
            var s1 = 'goToPoemPageBtn_'+recitationObject.title;
            var s2 = 'recitation_img_'+recitationObject.title;
            
            var btnElement = document.getElementById(s1);
            var imgElement = document.getElementById(s2);
            
            btnElement.setAttribute("onclick","var strID = '" + s1 + "'; goToPoemPageWithRecitation(strID);");
            imgElement.setAttribute("onclick","var strID = '" + s2 + "'; playRecitation(strID);");
            
            btnIDs.push(s1);
            imgIDs.push(s2);
            recitations.push(recitationObject);
            continue;
        }
    } // End of for-loop
    
});


/** Goes to the poem page with the id of the poem that was clicked on (really the id for the button that knows which
poem to go to). */
function goToPoemPageWithRecitation(btnID) {
    if (typeof(Storage) !== "undefined") {
        
        //console.log(btnID);
        var index = btnIDs.indexOf(btnID);
        var theRecitation = recitations[index];
        //console.log("INDEX: "+index);
        //console.log(theRecitation);
        
        window.sessionStorage.setItem("recitation_to_look_at", JSON.stringify(theRecitation));
        document.location.href = "poem";
    }
};



/** Plays the audio of the recitation when the image is clicked. This should interact with the audio player to
display information about what is playing. */
function playRecitation(imgID) {
    if (typeof(Storage) !== "undefined") {
        
        var index = imgIDs.indexOf(imgID);
        var theRecitation = recitations[index];
        
        
    }
};