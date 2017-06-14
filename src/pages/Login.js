import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../../public/res/brickBackground.jpg';
import background from '../../public/res/BlankBanner.png';
import RVLogo from '../../public/res/RV-Final-Icon.png';

import _ from '../css/fonts.css';

import Clock from '../components/Clock';


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
            width:'60%',
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
                    <img onClick={this.goToLandingPage.bind(this)} alt='logo' style={this.getLogoStyle()} src={RVLogo}></img>
                </div>

                {/* The background image */}
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>


                {/* The banner with the sign in text */}
                <div style={this.getBannerStyle()}>
                    <img style={{width:'100%',height:'150px'}} src={background} alt="bg2"/>
                    <h1 style={this.getBannerTextStyles()}>Sign In</h1>
                </div>


                {/* Email/Password field */}
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
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

                <div style={{position:'relative',width:'100%',margin:'auto',textAlign:'center'}}>
                    <p style={this.getStatusLabelStyles()} ref={(p)=>{this.statusLabel = p}}></p>
                </div>

                {/* Login button */}
                <div style={{width:'100%',textAlign:'center',margin:'auto'}}>
                    <button onMouseEnter={this.handleHover.bind(this)}
                            onMouseLeave={this.handleUnhover.bind(this)}
                            onClick={this.loginUser.bind(this)}
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

    goToLandingPage() {
        this.props.nav.goTo('/');
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
                    window.localStorage.setItem('currentUID',user.uid);
                    firebase.database().ref().child('Users').child(user.uid).once('value', (snap) => {
                        var usr = snap.val();
                    
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

}

export default Login;
