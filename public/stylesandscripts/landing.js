



// Adds the email to the mailing list.
function addToMailingList() {
    var email = document.getElementById('rv_email_field').value;

    if(email.indexOf('@') <= -1) {
        alert("Please enter a valid email address.");
    } else {
        // Add to the mailing list
    }
}