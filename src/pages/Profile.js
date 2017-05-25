import React, { Component } from 'react';
import { Image, Popover, OverlayTrigger } from 'react-bootstrap';

import * as firebase from 'firebase';

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
            social:['','','',''],
            uid:''
        };
    }

    componentDidMount() {
        this.props.navHeader.unhide();

        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            firebase.database().ref().child("Users").child(window.localStorage.getItem('currentUID')).once('value').then(this.onUserDataChanged);
        }
    }



    /**********************
    *                     *
    *    MODAL CONTROLS   *
    *                     *
    ***********************/
    handleCloseModal() { this.setState({ showUploadModal: false }); }
    handleOpenModal() { this.setState({ showUploadModal: true }); }




    render() {
        const popover = (
            <Popover id="popover-positioned-left" title="Profile" style={{textAlign:'center'}}>
                <button className='edit_buttons' onClick={()=>{this.props.navHeader.goTo('editprofile')}}>Edit Profile</button>
                <br/>
                <button className='edit_buttons' onClick={()=>{this.handleLogout()}}>Logout</button>
            </Popover>
        );

        return (
            <div>
                <ContentArea>
                    <div className="profile_background_area">
                        <img id="profile_background" src={this.state.backgroundSrc} alt="pbi" width="100%" height="100%" />
                    </div>


                    <ContentHeader top="200px" height="350px">
                        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                            <button ref={(button)=>{this.editButton = button}} id='edit_profile_btn' data-toggle="popover" data-placement="left">
                                ...
                            </button>
                        </OverlayTrigger>


                        <div className="profile_info_area">
                            <div className="profile_picture_area">
                                <br/>
                                <Image style={{width:'120px',height:'120px'}} src={this.state.profileSrc} circle/>
                                <br/><br/>

                                <h4 id="profile_name">{this.state.fullName}</h4>
                                <p id="profile_bio">{this.state.bio}</p>

                                <br/>
                                <div>
                                    <button id='facebookBtn' className='fa fa-facebook' onClick={()=>{window.location = this.state.social[0]}}></button>
                                    <button id='linkedinBtn' className='fa fa-linkedin' onClick={()=>{window.location = this.state.social[1]}}></button>
                                    <button id='instagramBtn' className='fa fa-instagram' onClick={()=>{window.location = this.state.social[2]}}></button>
                                    <button id='twitterBtn' className='fa fa-twitter' onClick={()=>{window.location = this.state.social[3]}}></button>
                                </div>
                            </div>
                        </div>

                        <button ref={(button)=>{this.uploadButton = button}} className='uploadRecBtn' onClick={()=>{this.handleOpenModal()}}>Upload a recitation</button>
                    </ContentHeader>


                    <UploadBox show={this.state.showUploadModal} onHide={()=>{this.handleCloseModal()}}></UploadBox>
                    <br/><br/><br/>



                    <TabPane navHeader={this.props.navHeader} rStore={this.props.rStore}>

                    </TabPane>

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

    // Logouts out the current user and returns to the login page.
    handleLogout = () => {
        const fireAuth = firebase.auth();

        fireAuth.signOut().then( () => {
            window.localStorage.removeItem('currentUID');
            this.props.navHeader.goTo('login');
        }).catch( (error) => {
            console.log(error);
        });
    };


    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    onUserDataChanged = (snapshot) => {
        if(snapshot != null) {
             //var email = snapshot.val()["email"];
            var fullname = snapshot.val()["fullname"];
            var userID = snapshot.val()["userID"];
            var photoURL = snapshot.val()["photoURL"];
            var backgroundImg = snapshot.val()["backgroundImage"];
            var bio = snapshot.val()["bio"];
            var social = snapshot.val()["social_media_links"];
            //var likes = snapshot.val()["likes"];
            //var favorites = snapshot.val()["favorites"];

            var dict = {
                showUploadModal:false,
                profileSrc:photoURL,
                backgroundSrc:backgroundImg,
                fullName:fullname,
                bio:bio,
                social:social,
                uid:userID
            };
            this.setState(dict);
            this.updateSocialButtons();


            // Check if it is the current user's profile page or a different users'
            if(window.localStorage.getItem('currentUID') !== firebase.auth().currentUser.uid) {
                this.editButton.style.visibility = 'hidden';
                this.uploadButton.style.visibility = 'hidden';
            } else {
                this.editButton.style.visibility = 'visible';
                this.uploadButton.style.visibility = 'visible';
            }
        }
    };

    // Update the social media buttons on the profile page.
    updateSocialButtons() {
        if(this.state.social) {
            if(this.state.social[0] !== '') {
                document.getElementById('facebookBtn').style.opacity = '1';
                document.getElementById('facebookBtn').disabled = false;
            } else {
                document.getElementById('facebookBtn').style.opacity = '0.25';
                document.getElementById('facebookBtn').disabled = true;
            }
            if(this.state.social[1] !== '') {
                document.getElementById('linkedinBtn').disabled = false;
                document.getElementById('linkedinBtn').style.opacity = '1';
            } else {
                document.getElementById('linkedinBtn').disabled = true;
                document.getElementById('linkedinBtn').style.opacity = '0.25';
            }
            if(this.state.social[2] !== '') {
                document.getElementById('instagramBtn').disabled = false;
                document.getElementById('instagramBtn').style.opacity = '1';
            } else {
                document.getElementById('instagramBtn').disabled = true;
                document.getElementById('instagramBtn').style.opacity = '0.25';
            }
            if(this.state.social[3] !== '') {
                document.getElementById('twitterBtn').disabled = false;
                document.getElementById('twitterBtn').style.opacity = '1';
            } else {
                document.getElementById('twitterBtn').disabled = true;
                document.getElementById('twitterBtn').style.opacity = '0.25';
            }
        }
    }

}

export default Profile;
