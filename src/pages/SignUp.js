import React, { Component } from 'react';
import * as firebase from 'firebase';

import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import PillButton from '../components/PillButton';

import _ from '../css/SignUp.css';


// This is where users can register for accounts on RecitedVerse.com
class SignUp extends Component {

    componentDidMount() {
        this.props.navHeader.unhide();
    }


    // The styling.
    getSignupBoxStyle() {
        return {
            position: 'relative',
            top: '100px',
            margin: 'auto',
            textAlign: 'center',
            borderRadius: '25px',
            borderColor: 'cornflowerblue',
            backgroundColor: 'ghostwhite',
            color: 'cornflowerblue',
            border: '1.5px solid cornflowerblue',
            width: '50%',
            height: '50%',
            fontFamily: '-apple-system',
            fontSize: '13px',
            fontWeight: '500'
        };
    }
    getBtnStyle() {
        return {
            textAlign: 'center',
            borderRadius: '25px',
            borderStyle: 'none',
            padding: '10px',
            WebkitTransitionDuration: '0.4s'
        };
    }
    getPBS() {
        return {
            width: '80px',
            height: '30px',
            border: 'none',
            borderRadius: '25px',
            textColor: 'black',
            backgroundColor: 'cornflowerblue',
            hoverColor: 'royalblue',
            clickFunction: ()=>{this.handleSignUp()}
        }
    }



    render() {
        return (
            <div>
                <ContentArea>
                    <div style={this.getSignupBoxStyle()}>
                        <h2>Sign Up</h2>
                        <input className="round_input" type="text" placeholder="Enter your full name" id='fullname_field'/>
                        <br /><br />
                        <input className="round_input" type="email" placeholder="Enter your email" id='email_field'/>
                        <br /><br />
                        <input className="round_input" type="password" placeholder="Create a password" id='password_field_1'/>
                        <br /><br />
                        <input className="round_input" type="password" placeholder="Re-enter your password" id='password_field_2'/>
                        <p id="status_label" style={{color: 'red', visibility: 'hidden'}}>The passwords do not match.</p>

                        <PillButton {...this.getPBS()} style={this.getBtnStyle()}> Sign Up </PillButton>
                        <br /><br />
                    </div>
                </ContentArea>
            </div>
        );
    }


    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    handleSignUp() {
        var fullNameField = document.getElementById('fullname_field');
        var emailField = document.getElementById('email_field');
        var passwordField1 = document.getElementById('password_field_1');
        var passwordField2 = document.getElementById('password_field_2');
        var statusLabel = document.getElementById('status_label');

        var fireAuth = firebase.auth();
        var fireRef = firebase.database().ref();
        var hasError;
        var hist = this.props.history;

        if(this.valuesExist([fullNameField.value,emailField.value,passwordField1.value,passwordField2.value])) {
            if(passwordField1.value === passwordField2.value) {

                // Log in
                fireAuth.createUserWithEmailAndPassword(emailField.value, passwordField1.value).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;

                    if(errorCode === 'auth/weak-password') {
                        statusLabel.style.color = "red";
                        statusLabel.style.visibility = "visible";
                        statusLabel.innerHTML = "Password must be at least six characters";
                        hasError = true;
                        return;
                    } else if(errorCode === 'auth/email-already-in-use') {
                        statusLabel.style.color = "red";
                        statusLabel.style.visibility = "visible";
                        statusLabel.innerHTML = "That email is already in use.";
                        hasError = true;
                        return;
                    }
                }).then(function(user) {

                    // Save it to the database.
                    var social = {"facebook":"","linkedin":"","instagram":"","twitter":""};
                    var currentUser = {
                        "fullname" : fullNameField.value,
                        "email" : emailField.value,
                        "password" : passwordField1.value,
                        "userID" : user.uid,
                        "photoURL" : "https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FcircleProfilePic.png?alt=media&token=7725c514-2e32-4feb-a4ff-de2b8be2e865",
                        "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FemptyProfileBackground.png?alt=media&token=68191f6d-9d79-4a2e-9047-87b7803e52f9",
                        "followers" : 0,
                        "following" : 0,
                        "bio" : "Bio",
                        "social_media_links" : social,
                        "likes":[],
                        "favorites":[]
                    };
                    fireRef.child("Users").child(user.uid).set(currentUser);

                    if (typeof(Storage) !== "undefined") {
                        window.localStorage.setItem("current_user", JSON.stringify(currentUser));
                    }

                    // Go to the user's profile page.
                    hist.push('/profile');

                }); // End of creating the user.

                // Handle errors.
                if(hasError !== undefined && hasError !== null) {
                    return;
                }

            } else {
                statusLabel.style.visibility = "visible";
                statusLabel.innerHTML = "Passwords do not match.";
                console.log('not logging in');
            }
        } else {
            statusLabel.style.visibility = "visible";
            statusLabel.innerHTML = "Please fill out each item.";
            console.log('not logging in');
        }
    };



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    // Returns whether or not a value for a particular element exists.
    valueExists(element) {
        if(element !== undefined && element !== null && element !== '') {
            return true;
        } else {
            return false;
        }
    }

    // Returns whether or not ALL of the values in an array are present.
    valuesExist(elements) {
        for(var e in elements) {
            if(!this.valueExists(e)) { return false; }
        }
        return true;
    }

    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default SignUp;
