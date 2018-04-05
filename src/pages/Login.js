import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../res/brickBackground.jpg';
import background from '../res/BlankBanner.png';
import RVLogo from '../res/RV-Final-Icon.png';
import googleIcon from '../res/icon-google.png';

import Header from '../components/LandingComps/Header';

// eslint-disable-next-line
import _ from '../css/fonts.css';
// eslint-disable-next-line
import ___ from '../css/Header.css';

import Clock from '../components/Clock';

import _1 from '../css/icon-font.min.css';
import _2 from '../css/login_util.css';
import _3 from '../css/login_main.css';






// This is where users can log into accounts on RecitedVerse.com
class Login extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            backgroundColor:'rgba(0,0,0,0)'
        };
    }

    componentDidMount() {

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
    getSearchBarStyle(width = 15) {
        return {
            position:'absolute',
            marginTop:'0px',
            width: width + '%' || '15%',
            height:'100%',
            float:'left',
            fontSize:'25px',
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
            fontFamily:'HelvetivaNeue'
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
               <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>


              <Header nav={this.props.nav} style={this.getHeaderStyle()} ></Header>




              <div className="container-login100">
          			<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
          				<form className="login100-form validate-form">
          					<span className="login100-form-title p-b-55">
          						Login
          					</span>

          					<div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
          						<input className="input100" type="text" name="email" placeholder="Email"/>
          						<span className="focus-input100"></span>
          						<span className="symbol-input100">
          							<span className="lnr lnr-envelope"></span>
          						</span>
          					</div>

          					<div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
          						<input className="input100" type="password" name="pass" placeholder="Password"/>
          						<span className="focus-input100"></span>
          						<span className="symbol-input100">
          							<span className="lnr lnr-lock"></span>
          						</span>
          					</div>

          					<div className="contact100-form-checkbox m-l-4">
          						<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
          						<label className="label-checkbox100" for="ckb1">
          							Remember me
          						</label>
          					</div>

          					<div className="container-login100-form-btn p-t-25">
          						<button className="login100-form-btn">
          							Login
          						</button>
          					</div>

          					<div className="text-center w-full p-t-42 p-b-22">
          						<span className="txt1">
          							Or login with
          						</span>
          					</div>

          					<a href="#" className="btn-face m-b-10">
          						<i className="fa fa-facebook-official"></i>
          						Facebook
          					</a>

          					<a href="#" className="btn-google m-b-10">
          						<img src={googleIcon} alt="GOOGLE"/>
          						Google
          					</a>

          					<div className="text-center w-full p-t-30">
          						<span className="txt1">
          							Not a member?
          						</span>

          						<a className="txt1 bo1 hov1" href="#">
          							Sign up now
          						</a>
          					</div>
          				</form>
          			</div>
          		</div>



                <div style={{width:'100%',textAlign:'center',margin:'auto'}}>
                    <button onMouseEnter={this.handleHover.bind(this)}
                            onMouseLeave={this.handleUnhover.bind(this)}
                            onClick={this.loginUser.bind(this)}
                            style={this.getButton()}>
                            Enter
                    </button>
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
        this.props.nav.goTo('home');
    }

    goToAccountSettings() {
        this.props.nav.goTo('accountsettings');
    }
    goToPRofile() {
        this.props.nav.goTo('profile');
    }

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

            // Print out the logging in message.
            this.statusLabel.style.color = "green";
            this.statusLabel.innerHTML = "Logging in!";
            this.statusLabel.style.visibility = "visible";

            // Wait for the login, then change pages.
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebase.database().ref().child('Users').child(user.uid).once('value', (snap) => {
                        var usr = snap.val();
                        window.localStorage.setItem('currentUser',JSON.stringify(usr));

                        this.props.rStore.dispatch({
                            type:'LOGIN',
                            currentUser: usr
                        });
                        document.body.scrollTop = 0;
                        this.props.nav.goTo('home');
                    })
                } else {
                    return;
                }
            });
        } else {
            this.statusLabel.style.color = "red";
            this.statusLabel.innerHTML = "Please enter both credentials.";
            this.statusLabel.style.visibility = "visible";
            return;
        }
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

}

export default Login;
