import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../res/brickBackground.jpg';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';

// eslint-disable-next-line
import _ from '../css/EditProfile.css';

class EditProfile extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            name:'',
            email:'',
            bio:'',
            password:'Enter your password',
            passwordConfirm:'Re-enter your password',
            social:['','','','']
        }
    }

    componentDidMount() {
        var cUser = this.getCurrentUser();

        this.setState({
            name: cUser.fullname,
            email: cUser.email,
            bio: cUser.bio,
            social: [
                cUser.social_media_links[0],
                cUser.social_media_links[1],
                cUser.social_media_links[2],
                cUser.social_media_links[3]
            ]
        });
    }

    getCurrentUser() {
        var cUser = this.props.rStore.getState().currentUser;
        if(cUser === null) { 
            cUser = JSON.parse(window.localStorage.getItem('currentUser'));

            if(cUser === null || cUser === undefined) {
                this.props.nav.goTo('login');
                return null;
            }
        }
        return cUser;
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
            width:'100%',
        };
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

    getSBStyles(width = 60) {
        return {
            position:'relative',
            width: width + '%' || '50%',
            height:'50px',
            margin:'auto',   
            display:'table',
            color:'white',       
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSearchBarTitleStyle(width = 15, left = 0) {
        return {
            position:'absolute',
            left:left + 'px' || '0px',
            marginTop:'0px',
            width: width + '%' || '15%',
            height:'100%',
            float:'left',
            fontSize:'20px',
            fontFamily:'HelveticaNeue',
            paddingLeft: '5px',
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
            fontFamily:'HelveticaNeue',
            fontSize:'20px',
            MozPaddingBefore:'-20px',
            display:'table-cell'
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
                {/* Header and Banner stuff. */}
                <ProfileHeader nav={this.props.nav} rStore={this.props.rStore}></ProfileHeader>
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>
                <ProfileBanner top='100px' rStore={this.props.rStore}>
                    <h1 style={{marginTop:'65px',fontFamily:'Monthoers',fontSize:'90px'}}>Edit Profile</h1>
                </ProfileBanner>



                {/* Edit personal information. */}
                <div className='editingContainer'>
                    <h1 className='titleText'>Personal</h1>

                    {/* All of the input fields. */}
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(10, -2)}>Name:</h1>
                        <input ref={(input)=>{this.nameField = input}} style={this.getInputStyles(10)} type='text' placeholder={this.state.name} />
                    </div>
                    <p></p><p></p><p></p>
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(10, -2)}>Email:</h1>
                        <input ref={(input)=>{this.emailField = input}} style={this.getInputStyles(10)} type='text' placeholder={this.state.email} />
                    </div>
                    <p></p><p></p><p></p>
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(15, 0)}>Password:</h1>
                        <input ref={(input)=>{this.passwordField = input}} style={this.getInputStyles(17)} type='text' placeholder={this.state.password} />
                    </div>
                    <p></p><p></p><p></p>
                    <div style={this.getSBStyles(70)}>
                        <h1 style={this.getSearchBarTitleStyle(25, -2)}>Re-enter Password:</h1>
                        <input ref={(input)=>{this.passwordConfirmField = input}} style={this.getInputStyles(25)} type='text' placeholder={this.state.password} />
                    </div>
                    <p></p><p></p><p></p>
                    <br/>


                    {/* Setting the bio. */}
                    <h1 className='titleText'>Profile</h1>
                    <h1 className='bioText'>Bio</h1>
                    <textarea className='bioField'
                              ref={(textarea)=>{this.bioField = textarea}}
                              rows={5} cols={45}
                              placeholder={this.state.bio}></textarea>


                    <br/><br/><br/>

                    <h1 className='titleText'>Social Media Links</h1>
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(15, 5)}>Facebook:</h1>
                        <input ref={(input)=>{this.facebookField = input}} style={this.getInputStyles(20)} type='text' placeholder={this.state.social[0]} />
                    </div>
                    <p></p><p></p><p></p>
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(15, 5)}>Twitter:</h1>
                        <input ref={(input)=>{this.twitterField = input}} style={this.getInputStyles(18)} type='text' placeholder={this.state.social[1]} />
                    </div>
                    <p></p><p></p><p></p>
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(15, 5)}>LinkedIn:</h1>
                        <input ref={(input)=>{this.linkedinField = input}} style={this.getInputStyles(18)} type='text' placeholder={this.state.social[2]} />
                    </div>
                    <p></p><p></p><p></p>
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(15, 5)}>Instagram:</h1>
                        <input ref={(input)=>{this.instagramField = input}} style={this.getInputStyles(20)} type='text' placeholder={this.state.social[3]} />
                    </div>
                    <p></p><p></p><p></p>

                    <br/><br/><br/><br/>
                    <button className='titleText' onClick={this.handleSaveChanges.bind(this)}>Save Changes</button>
                    <br/><br/><br/><br/>
                    <br/><br/><br/><br/>
                </div>

                {this.props.children}
            </div>
        );
    }




    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    handleSaveChanges() {
        var cUser = this.getCurrentUser();
        var user = firebase.auth().currentUser;
        var changes = cUser;
        var canSaveChanges = true;

        var name = this.nameField.value;
        var email = this.emailField.value;
        var password = this.passwordField.value;
        var passwordConfirm = this.passwordConfirmField.value;
        var bio = this.bioField.value;
        var facebook = this.facebookField.value;
        var twitter = this.twitterField.value;
        var linkedin = this.linkedinField.value;
        var instagram = this.instagramField.value;


        // Set all the appropriate values.
        if(this.valueExists(name) && name !== cUser.fullname) {
            changes['fullname'] = name;
        }

        if(this.valueExists(email)) {
            user.updateEmail(email).then( () => {
                changes['email'] = email;
                firebase.database().ref().child("Users").child(cUser.userID).child('email').set(email);
            }, (error) => {
                alert('That email is already in use.' + error);
                return;
            });
        }

        if(this.valueExists(password) && this.valueExists(passwordConfirm)) {
            if(password === passwordConfirm) {
                user.updatePassword(password).then( () => {
                    return;
                }, (error) => {
                    alert('Error changing password.');
                    return;
                });
            } else {
                alert('Passwords must match.');
                canSaveChanges = false;
            }
        } else if(!this.valueExists(password) && !this.valueExists(passwordConfirm)) {
            // Don't do anything.
        } else {
            alert('Error changing password.');
            canSaveChanges = false;
        }

        if(this.valueExists(bio)) {
            changes['bio'] = bio;
        }

        var social = [facebook || cUser.social_media_links[0],
                     twitter || cUser.social_media_links[1],
                     linkedin || cUser.social_media_links[2],
                     instagram || cUser.social_media_links[3]];
        changes["social_media_links"] = social;


        if(canSaveChanges === true) {
            this.saveToFirebase(changes);
        } else {
            return;
        }
    }


    saveToFirebase(changes) {
        var cUser = this.getCurrentUser();

        firebase.database().ref().child("Users").child(cUser.userID).update(changes);
        
        // Update the current user object.
        firebase.database().ref().child('Users').child(cUser.userID).once('value', (snap) => {
            var usr = snap.val();
            window.localStorage.setItem('currentUser',JSON.stringify(usr));
        
            this.props.rStore.dispatch({
                type:'LOGIN',
                currentUser: usr
            });
            document.body.scrollTop = 0;
        });


        this.props.nav.goTo('profile');
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

export default EditProfile;