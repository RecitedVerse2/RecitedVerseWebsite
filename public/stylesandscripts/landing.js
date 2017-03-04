/* Get stuff from the html. */
var mailingListBtn = document.getElementById('mailingListBtn');







/* Button functionality. */

mailingListBtn.onclick = function() {
    var email = document.getElementById('rv_email_field').value;

    if(email.indexOf('@') <= -1) {
        alert("Please enter a valid email address.");
    } else {
        // Add to the mailing list
        fireRef.child('mailing_list').on('value', function(snapshot) {
            var mailingList = snapshot.val();
            var name = email.substring(0, email.indexOf("@"));
            mailingList.push(email);
            
            fireRef.child('mailing_list').child(name).set(mailingList);
        }
    }
};