import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../../public/res/brickBackground.jpg';
import background from '../../public/res/BlankBanner.png';
import RVLogo from '../../public/res/RV-Final-Icon.png';

import _ from '../css/fonts.css';
import __ from '../css/SignUp.css';

import Clock from '../components/Clock';


// This is where users can register for accounts on RecitedVerse.com
class SignUp extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            backgroundColor:'rgba(0,0,0,0)'
        }
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'absolute',
            left:'0px',
            top:'0px'
        };
    }
    getHeaderStyle() {
        return {
            position: 'fixed',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: this.state.backgroundColor,
            WebkitTransitionDuration: '0.2s'
        }
    }
    getLogoStyle() {
        return {
            position:'relative',
            left:'20px',
            top:'-15px',
            width:'80px',
            height:'90%',
            cursor:'pointer',
            display:'table-cell'
        }
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }
    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1',
        }
    }
    getBannerStyle() {
        return {
            position:'relative',
            top:'100px',
            width:'100%',
            height:'150px'
        }
    }
    getBannerTextStyles() {
        return {
            position:'relative',
            top:'-80%',
            color:'white',
            textAlign:'center',
            fontSize:'75px',
            fontFamily:'Monthoers'
        }
    }
    getSBStyles() {
        return {
            position:'relative',
            width:'50%',
            height:'50px',
            margin:'auto',
            color:'white',
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSBStyles2() {
        return {
            position:'relative',
            width:'65%',
            height:'50px',
            margin:'auto',
            color:'white',
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSearchBarStyle() {
        return {
            position:'relative',
            top:'-5px',
            left:'10px',
            float:'left',
            textAlign:'left',
            fontFamily:'NEB',
            fontSize:'25px',
        }
    }
    getSearchBarStyle2() {
        return {
            position:'relative',
            top:'-5px',
            left:'10px',
            float:'left',
            textAlign:'left',
            fontFamily:'NEB',
            fontSize:'20px',
        }
    }
    getInputStyles() {
        return {
            position:'relative',
            margin:'auto',
            float:'left',
            left:'20px',
            width:'80%',
            height:'100%',
            border:'none',
            fontSize:'30px',
            background:'none',
            textDecoration:'none',
            WebkitBoxShadow: 'none',
            boxShadow: 'none',
            outline: '0',
        }
    }
    getButton() {
        return {
            position:'relative',
            margin:'auto',
            outline:'none',
            border:'none',
            background:'none',
            boxShadow: 'none',
            textAlign:'center',
            fontFamily:'Monthoers',
            fontSize:'70px',
            color:'white',
            textDecoration:'none',
            WebkitBoxShadow: 'none'
        }
    }
    getStatusLabelStyles() {
        return {
            textAlign:'center',
            fontSize:'30px',
            fontFamily:'NEB'
        }
    }
    



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                {/* The header area */}
                <div style={this.getHeaderStyle()}>
                    &nbsp;&nbsp;
                    <img onClick={this.goToHomePage.bind(this)} alt='logo' style={this.getLogoStyle()} src={RVLogo}></img>
                </div>

                {/* The background image */}
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>


                {/* The banner with the sign in text */}
                <div style={this.getBannerStyle()}>
                    <img style={{width:'100%',height:'150px'}} src={background} alt="bg2"/>
                    <h1 style={this.getBannerTextStyles()}>Register</h1>
                </div>


                {/* Fields */}
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <div style={this.getSBStyles()}>
                    <h1 style={this.getSearchBarStyle()}>Full name:</h1>
                    <input ref={(input)=>{this.fullNameField = input}} style={this.getInputStyles()} type='text' />
                </div>

                <br/><br/><br/>

                <div style={this.getSBStyles()}>
                    <h1 style={this.getSearchBarStyle()}>Email:</h1>
                    <input ref={(input)=>{this.emailField = input}} style={this.getInputStyles()} type='email' />
                </div>
                
                <br/><br/><br/>

                <div style={this.getSBStyles()}>
                    <h1 style={this.getSearchBarStyle()}>Password:</h1>
                    <input ref={(input)=>{this.passwordField = input}} style={this.getInputStyles()} type='password' />
                </div>

                <br/><br/><br/>

                <div style={this.getSBStyles2()}>
                    <h1 style={this.getSearchBarStyle2()}>Re-enter password:</h1>
                    <input ref={(input)=>{this.passwordConfirmField = input}} style={this.getInputStyles()} type='password' />
                </div>

                <br/><br/><br/>

                <div style={{position:'relative',width:'100%',margin:'auto',textAlign:'center'}}>
                    <p style={this.getStatusLabelStyles()} ref={(p)=>{this.statusLabel = p}}></p>
                </div>
                

                {/* Sign up button */}
                <div style={{width:'100%',textAlign:'center',margin:'auto'}}>
                    <button onMouseEnter={this.handleHover.bind(this)}
                            onMouseLeave={this.handleUnhover.bind(this)}
                            onClick={this.handleSignUp.bind(this)}
                            style={this.getButton()}>
                            Enter
                    </button>
                </div>


                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Clock onupdate={this.update.bind(this)}></Clock>
                {this.props.children}
            </div>
        );
    }


    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    goToHomePage() {
        this.props.nav.goTo('home');
    }

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
            if(password !== '' && passwordConfirm !== '' && password === passwordConfirm) {

                // Login with Firebase.
                fireAuth.createUserWithEmailAndPassword(email, password).catch( (error) => {
                    
                    this.statusLabel.style.color = "red";
                    this.statusLabel.style.visibility = "visible";
                    this.statusLabel.innerHTML = "Error creating account. Make sure all information is entered properly.";
                    return;

                }).then( (user) => {

                    // Let the user know the account is being created.
                    this.statusLabel.style.color = "green";
                    this.statusLabel.style.visibility = "visible";
                    this.statusLabel.innerHTML = "Creating account!";

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
            }
            else {
                this.statusLabel.style.color = "red";
                this.statusLabel.style.visibility = "visible";
                this.statusLabel.innerHTML = "Passwords do not match.";
            } // End of making sure passwords match.

        } else {
            this.statusLabel.style.color = "red";
            this.statusLabel.style.visibility = "visible";
            this.statusLabel.innerHTML = "Please enter all credentials.";    
        }// End of making sure values exist.
    }

    // Logs the user in after they just signed up.
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

    handleHover() {
        this.setState({
            
        })
    }

    handleUnhover() {
        this.setState({
            
        })
    }

    update() {
        if(document.body.scrollTop >= 30) {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0.85)'
            })
        } else {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0)'
            })
        }
    }

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
}

export default SignUp;
