import React, { Component } from 'react';

import LandingVideo from '../components/LandingPageComps/LandingVideo';
import MainPointsSection from '../components/LandingPageComps/MainPointsSection';


// The landing page for RecitedVerse.
class Landing extends Component {
    render() {
        return (
            <div style={{position:'absolute',left:'0px',top:'0px'}}>
                <LandingVideo loginBtn={this.goToLogin.bind(this)}
                              signupBtn={this.goToSignup.bind(this)}>
                </LandingVideo>

                <MainPointsSection submitToMailingList={this.submitToMailingList.bind(this)}></MainPointsSection>
                <br/><br/><br/><br/><br/><br/>
            </div>
        );
    }


    goToLogin() {
        this.props.history.push('/login');
    }
    goToSignup() {
        this.props.history.push('/signup');
    }
    submitToMailingList() {
        console.log('On mailing list!');
    }
}

export default Landing;
