import React, { Component } from 'react';

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
        this.state = {showUploadModal:false};
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
                        <img id="profile_background" src='' alt="pbi" width="100%" height="100%" />
                    </div>


                    <ContentHeader top="200px" height="350px">
                        <button id="edit_profile_btn">Edit Profile</button>
                        <button id="logout_btn">Logout</button>

                        <div className="profile_info_area">
                            <div className="profile_picture_area">
                                <img id="profile_picture" src='' alt="ppi" />

                                <h4 id="profile_name">Full Name</h4>
                                <p id="profile_bio">Bio</p>
                                <p id="profile_followers">Followers: 0</p>
                                <p id="profile_following">Following: 0</p>

                            </div>
                        </div>

                        <button className='uploadRecBtn' onClick={()=>{this.handleOpenModal()}}>Upload a recitation</button>
                    </ContentHeader>


                    <UploadBox show={this.state.showUploadModal} onHide={()=>{this.handleCloseModal()}}></UploadBox>
                    <br/><br/><br/>



                    <TabPane>

                    </TabPane>

                </ContentArea>
            </div>
        );
    }



    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Profile;
