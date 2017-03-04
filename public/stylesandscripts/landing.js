/* A reference to the firebase database and storage. */
var fireRef = firebase.database().ref();
var storageRef = firebase.storage().ref();


/* Get stuff from the html. */
var mailingListBtn = document.getElementById('mailingListBtn');







/* Button functionality. */

mailingListBtn.onclick = function() {
    var email = document.getElementById('rv_email_field').value;

    if(email.indexOf('@') <= -1) {
        alert("Please enter a valid email address.");
    } else {
        // Add to the mailing list
        var mailingList = { "email" : email };
        fireRef.child('mailing_list').child(email).set(mailingList);
    }
};