import React, { Component } from 'react';

import LandingVideo from '../components/LandingPageComps/LandingVideo';
import MainPointsSection from '../components/LandingPageComps/MainPointsSection';


// The landing page for RecitedVerse.
class Landing extends Component {

    getStyles = () => {
        return {
            position:'absolute',
            left:'0px',
            top:'0px'
        };
    };


    render() {
        return (
            <div style={this.getStyles()}>
                <LandingVideo loginBtn={this.goToLogin.bind(this)}
                              signupBtn={this.goToSignup.bind(this)}>
                </LandingVideo>

                <MainPointsSection submitToMailingList={this.submitToMailingList.bind(this)}></MainPointsSection>
                <br/><br/><br/><br/><br/><br/>
            </div>
        );
    }


    goToLogin() {
        this.props.navHeader.goTo('login');
    }
    goToSignup() {
        this.props.navHeader.goTo('signup');
    }
    submitToMailingList() {
        console.log('On mailing list!');
    }
}

export default Landing;
