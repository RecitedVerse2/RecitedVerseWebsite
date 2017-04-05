import React, { Component } from 'react';
import * as firebase from 'firebase';

import _ from '../css/Login.css';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import PillButton from '../components/PillButton';


// This is where users can log into accounts on RecitedVerse.com
class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }



    // The styling.
    getLoginBoxStyle() {
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
            width: '40%',
            height: '40%',
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


    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>


                <ContentArea backgroundColor='rgb(242,244,248)'>
                    <div style={this.getLoginBoxStyle()}>
                        <h2 style={{fontFamily: '-apple-system',fontSize: '25px',fontWeight: '500'}}>Login</h2>
                        <input className="round_input" id='input1' type="email" placeholder="Enter your email"/>
                        <br /><br />
                        <input className="round_input" id='input2' type="password" placeholder="Enter your password"/>
                        <br /><br />
                        <p id="status_label" style={{color: 'red', visibility: 'hidden'}}>Incorrect Email or Password.</p>

                        <PillButton style={this.getBtnStyle()}
                                    width='80px' height='30px'
                                    btnColor='cornflowerblue' hoverColor='royalblue'
                                    clickFunction={()=>{this.loginUser();}}>
                                    Login
                        </PillButton>
                        <br /> <br />
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

    loginUser() {
        var email = document.getElementById('input1').value;
        var password = document.getElementById('input2').value;
        var statusLabel = document.getElementById('status_label');

        if(this.valueExists(email) && this.valueExists(password)) {
            var fireAuth = firebase.auth();
            var fireRef = firebase.database().ref();
            var gotUser = true;

            fireAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;

                if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
                    statusLabel.style.color = "red";
                    statusLabel.innerHTML = "Incorrect Email or Password.";
                    statusLabel.style.visibility = "visible";
                    gotUser = false;
                    return;
                } else if(errorCode === 'auth/user-not-found') {
                    statusLabel.style.color = "red";
                    statusLabel.innerHTML = "No user was found with that email and password.";
                    statusLabel.style.visibility = "visible";
                    gotUser = false;
                    return;
                }
            });

            if(gotUser === true) {
                var user = fireAuth.currentUser;
                if(user) {
                    this.loadCurrentUser(fireRef, fireAuth, email, password, user.uid);
                } else {
                    console.log("Problem logging in");
                } // End of if-statement.
            }
        }
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


    // Loads and returns the current user object.
    loadCurrentUser(fireRef, fireAuth, email, password, uid) {
        var currentUser;
        var hist = this.props.history;

        fireRef.child('Users').child(uid).once('value').then(function(snapshot) {
            var em = snapshot.val()["email"];
            var fullname = snapshot.val()["fullname"];
            var pass = snapshot.val()["password"];
            var userID = snapshot.val()["userID"];
            var photoURL = snapshot.val()["photoURL"];
            var backgrounImg = snapshot.val()["backgroundImage"];
            var bio = snapshot.val()["bio"];
            var social = snapshot.val()["social_media_links"];
            var likes = snapshot.val()["likes"];
            var favorites = snapshot.val()["favorites"];

            if(em === email && pass === password) {
                currentUser = {
                    "fullname" : fullname,
                    "email" : email,
                    "password" : password,
                    "userID" : userID,
                    "photoURL" : photoURL,
                    "backgroundImage" : backgrounImg,
                    "followers" : 0,
                    "following" : 0,
                    "bio" : bio,
                    "social_media_links" : social,
                    "likes":likes,
                    "favorites":favorites
                };

                if (typeof(Storage) !== "undefined") { window.localStorage.setItem("current_user", JSON.stringify(currentUser)); }
                hist.push('/home');
            } else {
                if (typeof(Storage) !== "undefined") { window.localStorage.removeItem("current_user"); }
                return;
            }

        }); // End of firebase observe.
    }


    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Login;
