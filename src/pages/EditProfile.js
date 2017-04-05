import React, { Component } from 'react';

import AudioPlayer from '../components/AudioPlayer';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import RectButton from '../components/RectButton';

import _ from '../css/EditProfile.css';


// This is where users edit their profiles.
class EditProfile extends Component {

    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>




                <ContentArea>
                    <div style={{position:'relative',left:'20px',color:'rgb(128,128,128)'}}>
                        <h3 className="ep_header">Edit Profile</h3>

                        <img id="profile_picture" src='' alt="ppi" />
                        <br /><br />
                        <form action style={{textAlign: 'left'}}>
                            <input type="file" name="profpicfile" id="profilepicfile" className="inputfile" accept="image/x-png" multiple="false" />
                            <label id="labelForProfilePicFile" htmlFor="profilepicfile">Choose Profile Picture</label>
                        </form>
                        <br/>
                        <img id="background_picture" src='' alt="bpi" />
                        <br /><br />
                        <form action style={{textAlign: 'left'}}>
                            <input type="file" name="backgroundfile" id="backgroundimgfile" className="inputfile" accept="image/x-png" multiple="false" />
                            <label id="labelForBackgroundPicFile" htmlFor="backgroundimgfile">Choose Background Picture</label>
                        </form>
                        <br/>

                        <h4><b>Personal Information</b></h4>
                        Full Name: &nbsp;&nbsp;&nbsp; <input type="text" className="inputField" placeholder="Change your full name" />
                        <br /><br />
                        Email: &nbsp;&nbsp;&nbsp; <input type="email" className="inputField" placeholder="Change your email" />
                        <br /><br />
                        Password: &nbsp;&nbsp;&nbsp; <input type="text" className="inputField" placeholder="Change your password" />
                        <br /><br />
                        Re-enter Password: &nbsp;&nbsp;&nbsp; <input type="text" className="inputField" placeholder="Re-enter your new password" />
                        <br /><br /><br />

                        <h4><b>Profile</b></h4>
                        Bio: &nbsp;&nbsp;&nbsp; <textarea id="ep_bio_field" />
                        <br /><br /><br />


                        <h4>Social Media Links: &nbsp;&nbsp;&nbsp;</h4>
                        <br />
                        <p><label htmlFor="cbox1">Facebook:&nbsp;&nbsp;</label>
                        <input type="url" id="facebookLink" className="inputField" placeholder="Enter the url to your Facebook page" />
                        <br /><br />
                        <label htmlFor="cbox1">LinkedIn:&nbsp;&nbsp;</label>
                        <input type="url" id="linkedinLink" className="inputField" placeholder="Enter the url to your LinkedIn page" />
                        <br /><br />
                        <label htmlFor="cbox1">Instagram:&nbsp;&nbsp;</label>
                        <input type="url" id="instagramLink" className="inputField" placeholder="Enter the url to your Instagram page" />
                        <br /><br />
                        <label htmlFor="cbox1">Twitter:&nbsp;&nbsp;</label>
                        <input type="url" id="twitterLink" className="inputField" placeholder="Enter the url to your Twitter page" />
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
