import React, { Component } from 'react';

import LandingPageHeader from './LandingPageHeader';

// The video that shows at the top of the landing page.
class LandingVideo extends Component {

    // Returns the style for the video background.
    getVideoStyle() {
        return {
            "position":"relative",
            "top":"-100px",
            "left":"0px",
            "width":"100%",
            "height":"60%",
            "zIndex":"-100",
            "backgroundColor":"green"
        };
    }


    render() {
        return (
            <div>
                <video autoPlay loop style={this.getVideoStyle()}>
                    <source type="video/mp4" src="https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2Fvideobackground2.mp4?alt=media&token=45788508-3c4c-45c3-a53a-732e468bb8c6"></source>
                </video>

                <LandingPageHeader loginBtn={this.props.loginBtn} signupBtn={this.props.signupBtn}></LandingPageHeader>
            </div>
        );
    }
}

export default LandingVideo;
