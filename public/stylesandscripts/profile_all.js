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
            
            // Go through each property on the recitation object.
            for(var prop in recitation) {
                
                if(recitation.hasOwnProperty(prop)) {
                    
                    console.log(recitation[prop]);
                    
                }
                
            }
            
//            var item = "<li>" + recitation[] + "</li>";
//            recList.append(item);
            
        }
    }

}); 