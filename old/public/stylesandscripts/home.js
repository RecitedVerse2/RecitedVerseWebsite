$(document).ready(function() {
    
    if (typeof(Storage) !== "undefined") {
        currentUser = JSON.parse(window.localStorage.getItem("current_user"));
    }
    
});