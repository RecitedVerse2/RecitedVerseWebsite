$(document).ready(function() {
    
   if (typeof(Storage) !== "undefined") {
        // Retrieve the current user
        var cUser = JSON.parse(window.localStorage.getItem("current_user"));
    
        console.log(cUser);
   }
});