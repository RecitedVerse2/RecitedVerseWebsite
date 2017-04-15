import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import * as firebase from 'firebase';

import AudioPlayer from '../components/AudioPlayer';
import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';
import TabPane from '../components/ProfilePageComps/TabPane';
import UploadBox from '../components/ProfilePageComps/UploadBox';

import _ from '../css/Profile.css';




// Here is where users will view their own profiles.
class Profile extends Component {
    constructor() {
        super();

        // Default state.
        this.state = {
            showUploadModal:false,
            profileSrc:'',
            backgroundSrc:'',
            fullName:'',
            bio:'',
            followers:0,
            following:0,
            social:[],
            uid:''
        };
    }

    componentDidMount() {
        var onUserDataChanged = function(snapshot) {
            if(snapshot != null) {
                 //var email = snapshot.val()["email"];
                var fullname = snapshot.val()["fullname"];
                //var password = snapshot.val()["password"];
                var userID = snapshot.val()["userID"];
                var photoURL = snapshot.val()["photoURL"];
                var backgroundImg = snapshot.val()["backgroundImage"];
                var bio = snapshot.val()["bio"];
                var social = snapshot.val()["social_media_links"];
                //var likes = snapshot.val()["likes"];
                //var favorites = snapshot.val()["favorites"];
                var fs = snapshot.val()["followers"];
                var fing = snapshot.val()["following"];

                var dict = {
                    showUploadModal:false,
                    profileSrc:photoURL,
                    backgroundSrc:backgroundImg,
                    fullName:fullname,
                    bio:bio,
                    followers:fs,
                    following:fing,
                    social:social,
                    uid:userID
                };
                this.setState(dict);
            }
        };

        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            firebase.database().ref().child("Users").child(window.localStorage.getItem('currentUID')).on('value', onUserDataChanged.bind(this));
        }
    }

    componentWillUnmount() {

    }



    /**********************
    *                     *
    *    MODAL CONTROLS   *
    *                     *
    ***********************/
    handleCloseModal() { this.setState({ showUploadModal: false }); }
    handleOpenModal() { this.setState({ showUploadModal: true }); }




    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>


                <ContentArea>
                    <div className="profile_background_area">
                        <img id="profile_background" src={this.state.backgroundSrc} alt="pbi" width="100%" height="100%" />
                    </div>


                    <ContentHeader top="200px" height="350px">
                        <button id="edit_profile_btn" onClick={()=>{this.goToPage('editprofile')}}>Edit Profile</button>
                        <button id="logout_btn" onClick={this.handleLogout.bind(this)}>Logout</button>

                        <div className="profile_info_area">
                            <div className="profile_picture_area">
                                <br/>
                                <Image style={{width:'120px',height:'120px'}} src={this.state.profileSrc} circle/>
                                <br/><br/>

                                <h4 id="profile_name">{this.state.fullName}</h4>
                                <p id="profile_bio">{this.state.bio}</p>
                                <p id="profile_followers">Followers: {this.state.followers}</p>
                                <p id="profile_following">Following: {this.state.following}</p>

                            </div>
                        </div>

                        <button className='uploadRecBtn' onClick={()=>{this.handleOpenModal()}}>Upload a recitation</button>
                    </ContentHeader>


                    <UploadBox show={this.state.showUploadModal} onHide={()=>{this.handleCloseModal()}}></UploadBox>
                    <br/><br/><br/>



                    <TabPane goToPoemPage={()=>{this.props.history.push('/poem');}}>

                    </TabPane>

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

    // Logouts out the current user and returns to the login page.
    handleLogout = () => {
        const fireAuth = firebase.auth();
        const hist = this.props.history;

        fireAuth.signOut().then(function() {
            window.localStorage.removeItem('currentUID');
            hist.push('/login');
        }).catch(function(error) {
            console.log(error);
        });
    };


    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Profile;
