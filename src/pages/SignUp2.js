import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../res/brickBackground.jpg';
import background from '../res/BlankBanner.png';
import RVLogo from '../res/RV-Final-Icon.png';

// eslint-disable-next-line
import _ from '../css/fonts.css';
// eslint-disable-next-line
import __ from '../css/SignUp.css';
// eslint-disable-next-line
import ___ from '../css/Header.css';

import Clock from '../components/Clock';

import Header from '../components/LandingComps/Header';
import googleIcon from '../res/icon-google.png';

import Alertify from 'alertify.js';


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
            backgroundColor:'rgba(0,0,0,0)',
            errorInfoShow: 'none'
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
            top:'0px',
            width:'100%'
        };
    }
    getHeaderStyle() {
        return {
            position: 'fixed',
            top:'0px',
            left:'0xp',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: this.state.backgroundColor
        }
    }
    getLogoStyle() {
        return {
            position:'absolute',
            top:'0px',
            left:'20px',
            width:'80px',
            height:'90%',
            cursor:'pointer',
            marginTop:'5px',
            display:'table-cell'
        }
    }
    getButtonsSectionStyle() {
        return {
            position:'absolute',
            top:'0px',
            right:'0px',
            textAlign:'right',
            marginTop:'20px',
            display:'table-cell',
        }
    }
    getButtonsStyle() {
        return {
            textDecoration:'none',
            border:'none',
            background:'none',
            color:'white',
            fontFamily:'NEB',
            fontSize:'17px',
            outline:'none'
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
            width:'70%',
            height:'50px',
            margin:'auto',
            display:'table',
            color:'white',
            borderRadius:'25px',
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSBStylesPasswordConfirm() {
        return {
            position:'relative',
            width:'75%',
            height:'50px',
            margin:'auto',
            display:'table',
            color:'white',
            borderRadius:'25px',
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSearchBarStyle(width = 15) {
        return {
            position:'absolute',
            marginTop:'0px',
            width: width + '%' || '15%',
            height:'100%',
            float:'left',
            overflow:'scroll',
            fontSize:'22px',
            fontFamily:'HelveticaNeue',
            paddingLeft:'10px',
            WebkitPaddingBefore: '10px',
            display:'table-cell',
        }
    }
    getInputStyles(left = 15) {
        return {
            position:'absolute',
            left: left + '%' || '15%',
            width: 100 - left + '%' || '85%',
            height:'100%',
            border:'none',
            color:'white',
            outline:'none',
            background:'none',
            textDecoration:'none',
            fontFamily:'HelvetivaNeue',
            fontSize:'25px',
            MozPaddingBefore:'-20px',
            display:'table-cell'
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
            fontFamily:'HelveticaNeue'
        }
    }


    getErrorInfoStyle(){
      return{
        display: this.state.errorInfoShow
      }
    }

    getMarginBottomStyle(){
      return{
        marginTop:'30px',
        height:'100px'
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
            <div style={this.getOverlay()}></div>


            <Header nav={this.props.nav} style={this.getHeaderStyle()} owner='login' ></Header>


            <div className="container-login100">
              <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-55">
                    Sign Up
                  </span>

                  <div ref={(div)=>{this.errorInfo= div}} className="alert alert-danger" style={this.getErrorInfoStyle()}>

                  </div>

                  <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid name is John Steve">
                    <input className="input100" type="text"  ref={(input)=>{this.name = input}}  name="name" placeholder="Full Name"/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <span className="lnr lnr-user"></span>
                    </span>
                  </div>

                  <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
                    <input className="input100" type="text"  ref={(input)=>{this.email = input}}    name="email" placeholder="Email"/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <span className="lnr lnr-envelope"></span>
                    </span>
                  </div>

                  <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                    <input className="input100" type="password"  ref={(input)=>{this.pass = input}}  name="pass" placeholder="Password"/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <span className="lnr lnr-lock"></span>
                    </span>
                  </div>

                  <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                    <input className="input100" type="password" ref={(input)=>{this.pass2 = input}}   name="pass2" placeholder="Confirm Password"/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <span className="lnr lnr-lock"></span>
                    </span>
                  </div>






                  <div className="container-login100-form-btn p-t-25">
                  <button type="button" className="login100-form-btn" onClick={this.SignUp.bind(this)}>Register</button>

                  </div>

                  <div style={this.getMarginBottomStyle()}></div>


                </form>
              </div>
            </div>

            </div>
        );
    }


    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    goToHomePage() {
          window.location = '/';
    }

    goToAccountSettings() {
        this.props.nav.goTo('accountsettings');
    }
    goToPRofile() {
        this.props.nav.goTo('profile');
    }

    SignUp(){
      var userName = this.name.value.substring(0, this.name.value.indexOf(' '))
      if(userName.length <= 0){
        this.errorInfo.style.display = 'block'
        this.errorInfo.innerHTML='<strong>Warning!</strong>Valid name likes John Steve with a whitespace';
        return;
      }

      if(this.checkEmail(this.email.value) == false){
        this.errorInfo.style.display = 'block'
        this.errorInfo.innerHTML='<strong>Warning!</strong> Valid email is required: john@example.com';
        return;
      }

      if(this.pass.value.length < 6){
        this.errorInfo.style.display = 'block'
        this.errorInfo.innerHTML='<strong>Warning!</strong> Password at least has 6 characters';
        return;
      }

      if(this.pass.value != this.pass2.value){
        this.errorInfo.style.display = 'block'
        this.errorInfo.innerHTML='<strong>Warning!</strong> Password must be confirmed';
        return;
      }

      var fireAuth = firebase.auth();
      var fireRef = firebase.database().ref();
      firebase.auth().fetchProvidersForEmail(this.email.value)
.then(providers => {
  if (providers.length === 0) {
    // this email hasn't signed up yet
     this.handleSignUpNew();
  } else {
    this.errorInfo.style.display = 'block'
    this.errorInfo.innerHTML='<strong>Warning!</strong> Email has registered, please Signin';
  }
});
    }

    checkEmail(email){
      if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
      } else {
        return false;
      }
    }


    handleSignUpNew(){
      var fireAuth = firebase.auth();
      var fireRef = firebase.database().ref();
      var fullname = this.name.value;
      var userName = this.name.value.substring(0, this.name.value.indexOf(' '))
      var email = this.email.value;
      var password = this.pass.value

      fireAuth.createUserWithEmailAndPassword(email, password).catch( (error) => {
        this.errorInfo.style.display = "block";
        this.errorInfo.innerHTML = "Error creating account. Make sure all information is entered properly.";
        return;

    }).then( (user) => {

        // Let the user know the account is being created.
        this.errorInfo.style.color = "green";
        this.errorInfo.style.visibility = "visible";
        this.errorInfo.innerHTML = "Creating account!";

        // Create the user dictionary that gets saved to firebase.
        var social = {0:'',1:'',2:'',3:''};
        var createdUser = {
            "fullname" : fullname,
            "username": userName,
            "email" : email,
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

        var missingInfo = "Create Account successfully, go to Signin Page ";


       Alertify.alert(missingInfo);

      setInterval(function(){
           window.location.href = 'login';
       }, 2000);






      });


    }

    // Handles signing the user up.
    handleSignUp() {
        var fireAuth = firebase.auth();
        var fireRef = firebase.database().ref();

        // Get all the different input values.
        var fullname = this.fullNameField.value, username = this.usernameField.value, email = this.emailField.value,
            password = this.passwordField.value, passwordConfirm = this.passwordConfirmField.value;

        // Make sure the values exist for all of them.
        if(this.valuesExist([fullname,username,email,password,passwordConfirm])) {

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
                        "username": this.usernameField.value,
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
                this.props.nav.goTo('profile');
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
        if(document.body.scrollTop >= 30 || window.scrollY >= 30) {
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
