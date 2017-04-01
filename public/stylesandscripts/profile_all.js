var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');


var btnIDs = [];
var imgIDs = [];
var recitations = [];

// Load the current user.
if (typeof(Storage) !== "undefined") { currentUser = JSON.parse(window.localStorage.getItem("current_user")); }


// Load all of the recitations.
fireRef.child('Recitations').child(currentUser["userID"]).once('value', function(snapshot) {
    /* Go through each recitation that the user has. If the array of recitations does not contain 
    that recitation, then add it. */
    snapshot.forEach(function(recitationObject) {
        if(!recitations.includes(recitationObject)) {
            recitations.push(recitationObject.val());
        }
    });
    
    /* Sort that array of recitations based on their timestamps. */
    recitations.sort(function(a,b){ return b.timestamp - a.timestamp; });

    /* Now go through each recitation in the array and create page elements for users to go to them. */
    recitations.forEach(function(i, index, array) {
        var rec = recitations[index];
        
        // Create html elements.
        var goToBtn = "<button class='goToBtn' id='goToPoemPageBtn_" + rec.title + "' style='color:black;'>" + rec.title + "</button>";
        var imageItem = "<img class='general_rec_image' id='recitation_img_" + rec.title + "' width='120' height='120' src='" + rec.image + "' alt='image'>";
        var listItem = "<li class='recitation_item' style='font-size:15px;'>"+imageItem+goToBtn+"</li>";
        recList.append(listItem);
        
        // Find those elements add give them click properties.
        var s1 = 'goToPoemPageBtn_'+rec.title;
        var s2 = 'recitation_img_'+rec.title;
        btnIDs.push(s1);
        imgIDs.push(s2);
        var btnElement = document.getElementById(s1);
        var imgElement = document.getElementById(s2);
        btnElement.setAttribute("onclick","var strID = '" + s1 + "'; goToPoemPageWithRecitation(strID);");
        imgElement.setAttribute("onclick","var strID = '" + s2 + "'; playRecitation(strID);");
    });
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