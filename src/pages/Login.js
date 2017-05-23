import React, { Component } from 'react';
import * as firebase from 'firebase';

import _ from '../css/Login.css';

import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import PillButton from '../components/PillButton';


// This is where users can log into accounts on RecitedVerse.com
class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.navHeader.unhide();
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
                <ContentArea backgroundColor='rgb(242,244,248)'>
                    <div style={this.getLoginBoxStyle()}>
                        <h2 style={{fontFamily: '-apple-system',fontSize: '25px',fontWeight: '500'}}>Login</h2>
                        <input ref={(input)=>{this.emailField = input}} className="round_input" id='input1' type="email" placeholder="Enter your email"/>
                        <br /><br />
                        <input ref={(input)=>{this.passwordField = input}} className="round_input" id='input2' type="password" placeholder="Enter your password"/>
                        <br /><br />
                        <p ref={(p)=>{this.statusLabel = p}} id="status_label" style={{color: 'red', visibility: 'hidden'}}>Incorrect Email or Password.</p>

                        <PillButton {...this.getPBS()} style={this.getBtnStyle()}> Login </PillButton>
                        <br /> <br />
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

    loginUser() {
        var email = this.emailField.value;
        var password = this.passwordField.value;

        // Make sure a value exists for the email and password.
        if(this.valueExists(email) && this.valueExists(password)) {
            var fireAuth = firebase.auth();

            // Handle firebase login.
            fireAuth.signInWithEmailAndPassword(email, password).catch( (error) => {
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
            }); // End of login.

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

}

export default Login;
