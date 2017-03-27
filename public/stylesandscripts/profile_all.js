var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');

// Load the current user.
if (typeof(Storage) !== "undefined") { currentUser = JSON.parse(window.localStorage.getItem("current_user")); }

// Load all of the recitations.
fireRef.child('Recitations').child(currentUser["userID"]).on('value', function(snapshot) {
    var listOfObjects = snapshot.val();
    console.log(listOfObjects);
    
    for(var recitation in listOfObjects) {
//        for(var prop in recitation) {
//            if(recitation.hasOwnProperty)
//        }
        console.log(recitation);
        console.log(recitation.title);
        
//        var item = "<li>" + obj.title + "</li>";
//        recList.append(item);
    }
}); 