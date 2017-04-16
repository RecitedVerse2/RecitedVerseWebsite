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
            clickFunction: ()=>{this.loginUser()}
        }
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

                        <PillButton {...this.getPBS()} style={this.getBtnStyle()}> Login </PillButton>
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
            var hist = this.props.history;

            fireAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;

                if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
                    statusLabel.style.color = "red";
                    statusLabel.innerHTML = "Incorrect Email or Password.";
                    statusLabel.style.visibility = "visible";
                    return;
                } else if(errorCode === 'auth/user-not-found') {
                    statusLabel.style.color = "red";
                    statusLabel.innerHTML = "No user was found with that email and password.";
                    statusLabel.style.visibility = "visible";
                    return;
                }
            });

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    window.localStorage.setItem('currentUID',user.uid);
                    hist.push('/profile');
                } else {
                    return;
                }
            });
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

    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Login;
