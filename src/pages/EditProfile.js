import React, { Component } from 'react';
import * as firebase from 'firebase';

import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import RectButton from '../components/RectButton';
import FileChooserForm from '../components/FileChooserForm';

import _ from '../css/EditProfile.css';


// This is where users edit their profiles.
class EditProfile extends Component {
    /**********************
    *                     *
    *       LOADING       *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            profileSrc:'',
            backgroundSrc:'',
            email:'',
            fullName:'',
            bio:'',
            social:['','','',''],
            uid:''
        };
    }

    componentDidMount() {
        this.props.navHeader.unhide();

        var onUserDataChanged = (snapshot) => {
            if(snapshot != null) {
                var em = snapshot.val()["email"];
                var fullname = snapshot.val()["fullname"];
                var userID = snapshot.val()["userID"];
                var photoURL = snapshot.val()["photoURL"];
                var backgroundImg = snapshot.val()["backgroundImage"];
                var bio = snapshot.val()["bio"];
                var social = snapshot.val()["social_media_links"];

                var dict = {
                    email:em,
                    profileSrc:photoURL,
                    backgroundSrc:backgroundImg,
                    fullName:fullname,
                    bio:bio,
                    fb:social[0],
                    li:social[1],
                    in:social[2],
                    tw:social[3],
                    uid:userID
                };
                this.setState(dict);
                this.fbfield.value = social[0] || '';
                this.lifield.value = social[1] || '';
                this.infield.value = social[2] || '';
                this.twfield.value = social[3] || '';
            }
        };
        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            firebase.database().ref().child("Users").child(window.localStorage.getItem('currentUID')).once('value').then(onUserDataChanged);
        }
    }




    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/
    getFormButtonStyle() {
        return {
            width: '200px',
            height: '40px',
            color: 'black',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '400',
            paddingTop: '10px',
            textAlign: 'center',
            display: 'inline-block',
            backgroundColor: 'rgb(76, 182, 203)',
            WebkitTransitionDuration: '0.4s'
        };
    }



    render() {
        return (
            <div>
                <ContentArea>
                    <div style={{position:'relative',paddingLeft:'20px',color:'rgb(128,128,128)'}}>
                        <h3 className="ep_header">Edit Profile</h3>

                        <img ref={(img)=>{this.profilePicture = img}} id="profile_picture" src={this.state.profileSrc} alt="ppi" />
                        <br /><br />

                        <FileChooserForm formButtonStyle={this.getFormButtonStyle()} accept='image/*' name='profilepicfile' multiple='false'
                            fileSelectedHandler={(e)=>{this.changeProfilePicture(e)}}>
                            Choose Profile Picture
                        </FileChooserForm>

                        <br/>

                        <img ref={(img)=>{this.backgroundPicture = img}} id="background_picture" src={this.state.backgroundSrc} alt="bpi" />
                        <br /><br />

                        <FileChooserForm formButtonStyle={this.getFormButtonStyle()} accept='image/*' name='backgroundimgfile' multiple='false'
                            fileSelectedHandler={(e)=>{this.changeBackgroundPicture(e)}}>
                            Choose Background Picture
                        </FileChooserForm>

                        <br/>

                        <h4><b>Personal Information</b></h4>
                        Full Name: &nbsp;&nbsp;&nbsp; <input ref={(input)=>{this.fullNameField = input}} id='fullNameField' type="text" className="inputField" placeholder={this.state.fullName}/>
                        <br /><br />
                        Email: &nbsp;&nbsp;&nbsp; <input ref={(input)=>{this.emailField = input}} id='emailField' type="email" className="inputField" placeholder={this.state.email}/>
                        <br /><br />
                        Password: &nbsp;&nbsp;&nbsp; <input ref={(input)=>{this.passwordField = input}} type="text" id='passwordField1' className="inputField" placeholder="Enter a new password"/>
                        <br /><br />
                        Re-enter Password: &nbsp;&nbsp;&nbsp; <input ref={(input)=>{this.passwordConfirmField = input}} id='passwordField2' type="text" className="inputField" placeholder="Re-enter your new password" />
                        <br /><br /><br />

                        <h4><b>Profile</b></h4>
                        Bio: &nbsp;&nbsp;&nbsp; <textarea ref={(textarea)=>{this.bioField = textarea}} id="ep_bio_field" placeholder={this.state.bio}/>
                        <br /><br /><br />


                        <h4>Social Media Links: &nbsp;&nbsp;&nbsp;</h4>
                        <br />
                        <p><label htmlFor="cbox1">Facebook:&nbsp;&nbsp;</label>
                        <input ref={(input)=>{this.fbfield = input}} type="url" id="facebookLink" className="inputField"/><button onClick={()=>{this.fbfield.value = ''}}>x</button>
                        <br /><br />
                        <label htmlFor="cbox1">LinkedIn:&nbsp;&nbsp;</label>
                        <input ref={(input)=>{this.lifield = input}} type="url" id="linkedinLink" className="inputField"/><button onClick={()=>{this.lifield.value = ''}}>x</button>
                        <br /><br />
                        <label htmlFor="cbox1">Instagram:&nbsp;&nbsp;</label>
                        <input ref={(input)=>{this.infield = input}} type="url" id="instagramLink" className="inputField"/><button onClick={()=>{this.infield.value = ''}}>x</button>
                        <br /><br />
                        <label htmlFor="cbox1">Twitter:&nbsp;&nbsp;</label>
                        <input ref={(input)=>{this.twfield = input}} type="url" id="twitterLink" className="inputField"/><button onClick={()=>{this.twfield.value = ''}}>x</button>
                        </p>
                        <br /><br /><br /><br />
                        <RectButton width='140px' height='40px' textColor='black' backgroundColor='rgb(76, 182, 203)' hoverColor='rgb(76, 132, 183)'
                            clickFunction={this.handleSaveChanges.bind(this)}>
                            <h5>Save Changes</h5>
                        </RectButton>
                        <br /><br /><br /><br /><br /><br /><br /><br />
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

    handleSaveChanges() {
        var fullname = this.fullNameField.value || this.state.fullName;
        var email = this.emailField.value || this.state.email;
        var password = this.passwordField.value;
        var passwordConfirm = this.passwordConfirmField.value;
        var bio = this.bioField.value || this.state.bio;

        var user = firebase.auth().currentUser;
        var changes = this.state;
        var canExitPage = true;


        // Check for a change in the full name.
        if(this.valueExists(fullname)) {
            changes['fullName'] = fullname;
        }

        // Check for a change in the email, then update it in authentication and database.
        // Email takes a little bit longer, so just update the database when ready.
        if(this.valueExists(email)) {
            user.updateEmail(email).then( () => {
                changes['email'] = email;
                firebase.database().ref().child("Users").child(this.state.uid).child('email').set(email);
            }, (error) => {
                alert('That email is already in use.' + error);
                canExitPage = false;
                return;
            });
        }

        // Check for a change in the password, then update it in authentication and database.
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
                canExitPage = false;
            }
        } else if(!this.valueExists(password) && !this.valueExists(passwordConfirm)) {
            // Don't do anything.
        } else {
            alert('Error changing password.');
            canExitPage = false;
        }

        // Check for changes in the bio.
        if(this.valueExists(bio)) {
            changes['bio'] = bio;
        }


        // Handle social links.
        var social = [this.fbfield.value,this.lifield.value,this.infield.value,this.twfield.value];
        changes["social_media_links"] = social;


        // Lastly, do the profile and background images.
        changes['profileSrc'] = this.profilePicture.src;
        changes['backgroundSrc'] = this.backgroundPicture.src;


        // Rename the keys to how they appear in Firebase.
        changes = this.renameKeys(changes);

        // Only start the updating process if there aren't any problems.
        if(canExitPage === true) {
            this.saveToFirebase(changes);
        } else {
            return;
        }
    };


    /*
        Button for selecting a profile/background picture.
    */
    changeProfilePicture(e) {
        this.profilePicture.src = e;
    };
    changeBackgroundPicture(e) {
        this.backgroundPicture.src = e;
    };


    /*
        Saves the object to firebase.
    */
    saveToFirebase(changes) {
        this.uploadNewProfilePicture(() => {
            this.uploadNewBackgroundPicture(() => {
                firebase.database().ref().child("Users").child(this.state.uid).update(changes);
                this.props.navHeader.goTo('profile');
            });
        });
    }

    uploadNewProfilePicture(callback) {
        var profilePicture = this.profilePicture;
        if(profilePicture.src !== this.state.profileSrc) {
            firebase.storage().ref().child(this.state.uid).child("profilePicture").putString(profilePicture.src, 'data_url').then(snapshot => {
                var updates = {
                    'photoURL':snapshot.downloadURL
                }
                firebase.database().ref().child("Users").child(this.state.uid).update(updates);
                callback();
            });
        } else {
            callback();
        }
    }

    uploadNewBackgroundPicture(callback) {
        var backgroundPicture = this.backgroundPicture;
        if(backgroundPicture.src !== this.state.backgroundSrc) {
            firebase.storage().ref().child(this.state.uid).child("backgroundPicture").putString(backgroundPicture.src, 'data_url').then(snapshot => {
                var updates = {
                    'backgroundImage':snapshot.downloadURL
                }
                firebase.database().ref().child("Users").child(this.state.uid).update(updates);
                callback();
            });
        } else {
            callback();
        }
    }





    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    // Renames the keys in the dictionary so that they fit the way they are in Firebase.
    renameKeys(changes) {
        var newChanges = {
            'backgroundImage':changes['backgroundSrc'],
            'bio':changes['bio'],
            'email':changes['email'],
            'fullname':changes['fullName'],
            'photoURL':changes['profileSrc'],
            'social_media_links':changes['social_media_links'],
            'userID':changes['uid']
        };
        return newChanges;
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
