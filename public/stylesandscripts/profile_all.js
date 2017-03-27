var recGrid = $('.recitations_grid');
var recList = $('.recitations_list');

// Load the current user.
if (typeof(Storage) !== "undefined") { currentUser = JSON.parse(window.localStorage.getItem("current_user")); }

// Load all of the recitations.
fireRef.child('Recitations').child(currentUser["userID"]).on('value', function(snapshot) {
    var listOfObjects = snapshot.val();
    console.log(listOfObjects);
    
    for(var obj in listOfObjects) {
        console.log(obj);
        console.log(obj.title);
        
        var item = "<li>" + obj.title + "</li>";
        recList.append(item);
    }
}); 