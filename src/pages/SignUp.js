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
                        <input ref={(input)=>{this.fullNameField = input}} className="round_input" type="text" placeholder="Enter your full name" id='fullname_field'/>
                        <br /><br />
                        <input ref={(input)=>{this.emailField = input}} className="round_input" type="email" placeholder="Enter your email" id='email_field'/>
                        <br /><br />
                        <input ref={(input)=>{this.passwordField = input}} className="round_input" type="password" placeholder="Create a password" id='password_field_1'/>
                        <br /><br />
                        <input ref={(input)=>{this.passwordConfirmField = input}} className="round_input" type="password" placeholder="Re-enter your password" id='password_field_2'/>
                        <p ref={(p)=>{this.statusLabel = p}} id="status_label" style={{color: 'red', visibility: 'hidden'}}>The passwords do not match.</p>

                        <PillButton {...this.getPBS()} style={this.getBtnStyle()}> Sign Up </PillButton>
                        <br /><br />
                    </div>
                </ContentArea>
                {this.props.children}
            </div>
        );
    }


    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    // Handles signing the user up.
    handleSignUp() {
        var fireAuth = firebase.auth();
        var fireRef = firebase.database().ref();

        // Get all the different input values.
        var fullname = this.fullNameField.value, email = this.emailField.value,
            password = this.passwordField.value, passwordConfirm = this.passwordConfirmField.value;

        // Make sure the values exist for all of them.
        if(this.valuesExist([fullname,email,password,passwordConfirm])) {

            // Make sure that the passwords match.
            if(password === passwordConfirm) {

                // Login with Firebase.
                fireAuth.createUserWithEmailAndPassword(email, password).catch( (error) => {
                    var errorCode = error.code;

                    // Handle any errors in signing up.
                    if(errorCode === 'auth/weak-password') {
                        this.statusLabel.style.color = "red";
                        this.statusLabel.style.visibility = "visible";
                        this.statusLabel.innerHTML = "Password must be at least six characters";
                        return;
                    } else if(errorCode === 'auth/email-already-in-use') {
                        this.statusLabel.style.color = "red";
                        this.statusLabel.style.visibility = "visible";
                        this.statusLabel.innerHTML = "That email is already in use.";
                        return;
                    } else {
                        this.statusLabel.style.color = "red";
                        this.statusLabel.style.visibility = "visible";
                        this.statusLabel.innerHTML = "Error creating account. Make sure all information is entered properly.";
                        return;
                    }
                }).then( (user) => {

                    // Create the user dictionary that gets saved to firebase.
                    var social = {0:'',1:'',2:'',3:''};
                    var createdUser = {
                        "fullname" : this.fullNameField.value,
                        "email" : this.emailField.value,
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

                    // Save that user to firebase.
                    fireRef.child('Users').child(user.uid).set(createdUser);

                    // Save the currently logged in user's userID to the local storage.
                    if (typeof(Storage) !== "undefined") {
                        window.localStorage.setItem("currentUID", JSON.stringify(user.uid));
                    }

                    // Login and go to the user's profile page.
                    this.handleLoginAfterSignup(fireAuth, email, password);

                }); // End of creating a user.
            } // End of making sure passwords match.
        } // End of making sure values exist.
    }


    handleLoginAfterSignup(fireAuth, email, password) {
        // Handle firebase login.
        fireAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;

            if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
                this.statusLabel.style.color = "red";
                this.statusLabel.innerHTML = "Incorrect Email or Password.";
                this.statusLabel.style.visibility = "visible";
                return;
            } else if(errorCode === 'auth/user-not-found') {
                this.statusLabel.style.color = "red";
                this.statusLabel.innerHTML = "No user was found with that email and password.";
                this.statusLabel.style.visibility = "visible";
                return;
            } else {
                this.statusLabel.style.color = "red";
                this.statusLabel.innerHTML = "There was an error signing in.";
                this.statusLabel.style.visibility = "visible";
                return;
            }
        });

        // Wait for the login, then change pages.
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                window.localStorage.setItem('currentUID',user.uid);
                this.props.navHeader.goTo('profile');
            } else {
                return;
            }
        });
    }




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
    goToPage(page) {
        this.props.navHeader.goTo('/'+page);
        //this.props.history.push('/'+page);
    }
}

export default SignUp;
