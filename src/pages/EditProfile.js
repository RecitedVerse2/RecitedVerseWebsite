import React, { Component } from 'react';
import * as firebase from 'firebase';

import AudioPlayer from '../components/AudioPlayer';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import RectButton from '../components/RectButton';

import _ from '../css/EditProfile.css';


// This is where users edit their profiles.
class EditProfile extends Component {
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
                    email:email || "Change your email",
                    password:"Change your password",
                    likes:likes,
                    favorites:favorites,
                    profileSrc:photoURL,
                    backgroundSrc:backgroundImg,
                    fullName:fullname || 'Change your full name',
                    bio:bio || 'Bio',
                    followers:fs,
                    following:fing,
                    fb:social[0] || 'Link to your Facebook page',
                    li:social[1] || 'Link to your LinkedIn page',
                    in:social[2] || 'Link to your Instagram page',
                    tw:social[3] || 'Link to your Twitter page',
                    uid:userID
                };
                this.setState(dict);
            }
        };
        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            firebase.database().ref().child("Users").child(window.localStorage.getItem('currentUID')).on('value', onUserDataChanged.bind(this));
        }
    }







    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>




                <ContentArea>
                    <div style={{position:'relative',left:'20px',color:'rgb(128,128,128)'}}>
                        <h3 className="ep_header">Edit Profile</h3>

                        <img id="profile_picture" src={this.state.profileSrc} alt="ppi" />
                        <br /><br />
                        <form action style={{textAlign: 'left'}}>
                            <input type="file" name="profpicfile" id="profilepicfile" className="inputfile" accept="image/x-png" multiple="false" />
                            <label id="labelForProfilePicFile" htmlFor="profilepicfile">Choose Profile Picture</label>
                        </form>
                        <br/>
                        <img id="background_picture" src={this.state.backgroundSrc} alt="bpi" />
                        <br /><br />
                        <form action style={{textAlign: 'left'}}>
                            <input type="file" name="backgroundfile" id="backgroundimgfile" className="inputfile" accept="image/x-png" multiple="false" />
                            <label id="labelForBackgroundPicFile" htmlFor="backgroundimgfile">Choose Background Picture</label>
                        </form>
                        <br/>

                        <h4><b>Personal Information</b></h4>
                        Full Name: &nbsp;&nbsp;&nbsp; <input type="text" className="inputField" placeholder={this.state.fullName}/>
                        <br /><br />
                        Email: &nbsp;&nbsp;&nbsp; <input type="email" className="inputField" placeholder={this.state.email}/>
                        <br /><br />
                        Password: &nbsp;&nbsp;&nbsp; <input type="text" className="inputField" placeholder={this.state.password}/>
                        <br /><br />
                        Re-enter Password: &nbsp;&nbsp;&nbsp; <input type="text" className="inputField" placeholder="Re-enter your new password" />
                        <br /><br /><br />

                        <h4><b>Profile</b></h4>
                        Bio: &nbsp;&nbsp;&nbsp; <textarea id="ep_bio_field" value={this.state.bio}/>
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
                        <RectButton width='140px' height='40px' textColor='black' backgroundColor='rgb(76, 182, 203)' hoverColor='rgb(76, 132, 183)'><h5>Save Changes</h5></RectButton>
                        <br /><br /><br /><br /><br /><br /><br /><br />
                    </div>
                </ContentArea>



                <AudioPlayer></AudioPlayer>
            </div>
        );
    }


    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default EditProfile;
