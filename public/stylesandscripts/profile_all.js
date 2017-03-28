var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');


var btnIDs = [];
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
            
            var goToBtn = "<button class='goToBtn' id='goToPoemPageBtn_" + recitationObject.title + "' style='color:black;'>" + recitationObject.title + "</button>";
            var imageItem = "<img id='recitation_img_" + recitationObject.title + "' width='120' height='120' src='" + recitationObject.image + "' alt='image'>";
            var listItem = "<li class='recitation_item' style='font-size:15px;'>"+imageItem+goToBtn+"</li>";
            recList.append(listItem);
            
            var s1 = 'goToPoemPageBtn_'+recitationObject.title;
            var btnClicker = document.getElementById(s1);
            
            btnIDs.push(s1);
            recitations.push(recitationObject);
            continue;
        }
    } // End of for-loop
    
    
    for(var i = 0; i < recitations.length; i++) {
//        console.log(btnIDs[i]);
//        console.log(recitations[i]);
        var btnElement = document.getElementById(btnIDs[i]);
        var strID = btnIDs[i];
        btnElement.setAttribute("onclick","goToPoemPageWithRecitation(strID)")
        
//        btnElement.onclick = function() {
//            goToPoemPageWithRecitation(btnIDs[i]);
//        }
    } 
});

function goToPoemPageWithRecitation(btnID) {
    // Quickly set the value of the recitation you want to look at.
    if (typeof(Storage) !== "undefined") {
        
        console.log(btnID);
        var index = btnIDs.indexOf(btnID);
        console.log("INDEX: "+index);
        console.log(recitations[index]);
        
        
        
//        window.sessionStorage.setItem("recitation_to_look_at", recitation);
//        document.location = "https://recitedverse.herokuapp.com/poem";
    }
};