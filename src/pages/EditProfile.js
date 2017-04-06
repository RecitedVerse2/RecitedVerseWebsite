import React, { Component } from 'react';
import * as firebase from 'firebase';

import AudioPlayer from '../components/AudioPlayer';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
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
            password:'',
            bio:'',
            likes:'',
            favorites:'',
            followers:0,
            following:0,
            social:[],
            uid:''
        };
    }

    componentDidMount() {
        var onUserDataChanged = function(snapshot) {
            if(snapshot != null) {
                var email = snapshot.val()["email"];
                var fullname = snapshot.val()["fullname"];
                var password = snapshot.val()['password'];
                var userID = snapshot.val()["userID"];
                var photoURL = snapshot.val()["photoURL"];
                var backgroundImg = snapshot.val()["backgroundImage"];
                var bio = snapshot.val()["bio"];
                var social = snapshot.val()["social_media_links"];
                var likes = snapshot.val()["likes"];
                var favorites = snapshot.val()["favorites"];
                var fs = snapshot.val()["followers"];
                var fing = snapshot.val()["following"];

                var dict = {
                    email:email,
                    password:password,
                    likes:likes,
                    favorites:favorites,
                    profileSrc:photoURL,
                    backgroundSrc:backgroundImg,
                    fullName:fullname,
                    bio:bio,
                    followers:fs,
                    following:fing,
                    fb:social[0],
                    li:social[1],
                    in:social[2],
                    tw:social[3],
                    uid:userID
                };
                this.setState(dict);
            }
        };
        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            firebase.database().ref().child("Users").child(window.localStorage.getItem('currentUID')).on('value', onUserDataChanged.bind(this));
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
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>




                <ContentArea>
                    <div style={{position:'relative',paddingLeft:'20px',color:'rgb(128,128,128)'}}>
                        <h3 className="ep_header">Edit Profile</h3>

                        <img id="profile_picture" src={this.state.profileSrc} alt="ppi" />
                        <br /><br />

                        <FileChooserForm formButtonStyle={this.getFormButtonStyle()} accept='image/*' name='profilepicfile' multiple='false'
                            fileSelectedHandler={(e)=>{this.changeProfilePicture(e)}}>
                            Choose Profile Picture
                        </FileChooserForm>

                        <br/>

                        <img id="background_picture" src={this.state.backgroundSrc} alt="bpi" />
                        <br /><br />

                        <FileChooserForm formButtonStyle={this.getFormButtonStyle()} accept='image/*' name='backgroundimgfile' multiple='false'
                            fileSelectedHandler={(e)=>{this.changeBackgroundPicture(e)}}>
                            Choose Background Picture
                        </FileChooserForm>

                        <br/>

                        <h4><b>Personal Information</b></h4>
                        Full Name: &nbsp;&nbsp;&nbsp; <input id='fullNameField' type="text" className="inputField" placeholder={this.state.fullName}/>
                        <br /><br />
                        Email: &nbsp;&nbsp;&nbsp; <input id='emailField'  type="email" className="inputField" placeholder={this.state.email}/>
                        <br /><br />
                        Password: &nbsp;&nbsp;&nbsp; <input type="text" id='passwordField1' className="inputField" placeholder="Enter a new password"/>
                        <br /><br />
                        Re-enter Password: &nbsp;&nbsp;&nbsp; <input id='passwordField2' type="text" className="inputField" placeholder="Re-enter your new password" />
                        <br /><br /><br />

                        <h4><b>Profile</b></h4>
                        Bio: &nbsp;&nbsp;&nbsp; <textarea id="ep_bio_field" placeholder={this.state.bio}/>
                        <br /><br /><br />


                        <h4>Social Media Links: &nbsp;&nbsp;&nbsp;</h4>
                        <br />
                        <p><label htmlFor="cbox1">Facebook:&nbsp;&nbsp;</label>
                        <input type="url" id="facebookLink" className="inputField" placeholder={this.state.fb}/>
                        <br /><br />
                        <label htmlFor="cbox1">LinkedIn:&nbsp;&nbsp;</label>
                        <input type="url" id="linkedinLink" className="inputField" placeholder={this.state.li}/>
                        <br /><br />
                        <label htmlFor="cbox1">Instagram:&nbsp;&nbsp;</label>
                        <input type="url" id="instagramLink" className="inputField" placeholder={this.state.in}/>
                        <br /><br />
                        <label htmlFor="cbox1">Twitter:&nbsp;&nbsp;</label>
                        <input type="url" id="twitterLink" className="inputField" placeholder={this.state.tw}/>
                        </p>
                        <br /><br /><br /><br />
                        <RectButton width='140px' height='40px' textColor='black' backgroundColor='rgb(76, 182, 203)' hoverColor='rgb(76, 132, 183)'
                            clickFunction={this.handleSaveChanges.bind(this)}>
                            <h5>Save Changes</h5>
                        </RectButton>
                        <br /><br /><br /><br /><br /><br /><br /><br />
                    </div>
                </ContentArea>



                <AudioPlayer></AudioPlayer>
            </div>
        );
    }




    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    handleSaveChanges() {
        var fullname = document.getElementById('fullNameField').value || this.state.fullName;
        var email = document.getElementById('emailField').value || this.state.email;
        var password1 = document.getElementById('passwordField1').value || this.state.password;
        var password2 = document.getElementById('passwordField2').value || this.state.password;
        var bio = document.getElementById('ep_bio_field').value || this.state.bio;

        var changes = this.state;

        if( fullname !== "" && fullname !== null ) {
            changes["fullName"] = fullname;
        }
        if( email !== "" && email !== null && email !== changes["email"]) {
            var user = firebase.auth().currentUser;
            user.updateEmail(email).then(function() {
                changes["email"] = email;
            }, function(error) {
                alert('That email is already in use.');
                return;
            });
        }
        if( password1 !== "" && password1 !== null ) {
            if( password2 !== "" && password2 !== null ) {
                if(password1 === password2) {
                    changes["password"] = password1;
                }

            }
        }
        if( bio !== "" && bio !== null ) {
            changes["bio"] = bio;
        }

        var social = [];
        var fbLink = document.getElementById('facebookLink').value || "";
        var liLink = document.getElementById('linkedinLink').value || "";
        var inLink = document.getElementById('instagramLink').value || "";
        var twLink = document.getElementById('twitterLink').value || "";
        social.push(fbLink);
        social.push(liLink);
        social.push(inLink);
        social.push(twLink);
        changes["social_media_links"] = social;

        // Rename the keys to how they appear in Firebase.
        changes = this.renameKeys(changes);

        this.saveToFirebase(changes);
    };


    /*
        Button for selecting a profile/background picture.
    */
    changeProfilePicture(e) {
        document.getElementById('profile_picture').src = e;
    };
    changeBackgroundPicture(e) {
        document.getElementById('background_picture').src = e;
    };


    /*
        Saves the object to firebase.
    */
    saveToFirebase(changes) {
        firebase.database().ref().child("Users").child(this.state.uid).update(changes);

        this.uploadNewProfilePicture(() => {
            this.uploadNewBackgroundPicture(() => {
                this.props.history.push('profile');
            });
        });
    }

    uploadNewProfilePicture(callback) {
        var profilePicture = document.getElementById('profile_picture');
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
        var backgroundPicture = document.getElementById('background_picture');
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
            'favorites':changes['favorites'],
            'followers':changes['followers'],
            'following':changes['following'],
            'fullname':changes['fullName'],
            'likes':changes['likes'],
            'password':changes['password'],
            'photoURL':changes['profileSrc'],
            'social_media_links':[changes['fb'],changes['li'],changes['in'],changes['tw']],
            'userID':changes['uid']
        };
        return newChanges;
    }


    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default EditProfile;
