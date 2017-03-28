if (typeof(Storage) !== "undefined") {
    var recitation = window.sessionStorage.getItem("recitation_to_look_at");
    
    console.log(recitation);
    console.log('Loaded recitation');
};