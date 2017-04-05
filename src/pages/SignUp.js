import React, { Component } from 'react';

import AudioPlayer from '../components/AudioPlayer';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import PillButton from '../components/PillButton';

import _ from '../css/SignUp.css';


// This is where users can register for accounts on RecitedVerse.com
class SignUp extends Component {

    // The styling.
    getSignupBoxStyle() {
        return {
            position: 'relative',
            top: '100px',
            margin: 'auto',
            textAlign: 'center',
            borderRadius: '25px',
            borderColor: 'cornflowerblue',
            backgroundColor: 'ghostwhite',
            color: 'cornflowerblue',
            border: '1.5px solid cornflowerblue',
            width: '50%',
            height: '50%',
            fontFamily: '-apple-system',
            fontSize: '13px',
            fontWeight: '500'
        };
    }
    getBtnStyle() {
        return {
            textAlign: 'center',
            borderRadius: '25px',
            borderStyle: 'none',
            padding: '10px',
            WebkitTransitionDuration: '0.4s'
        };
    }



    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>





                <ContentArea>
                    <div style={this.getSignupBoxStyle()}>
                        <h2>Sign Up</h2>
                        <input className="round_input" type="text" placeholder="Enter your full name" />
                        <br /><br />
                        <input className="round_input" type="email" placeholder="Enter your email" />
                        <br /><br />
                        <input className="round_input" type="password" placeholder="Create a password" />
                        <br /><br />
                        <input className="round_input" type="password" placeholder="Re-enter your password" />
                        <p id="status_label" style={{color: 'red', visibility: 'hidden'}}>The passwords do not match.</p>

                        <PillButton style={this.getBtnStyle()}
                                    width='80px' height='30px'
                                    btnColor='cornflowerblue' hoverColor='royalblue'>
                                    Sign Up
                        </PillButton>
                        <br /><br />
                    </div>
                </ContentArea>

                <AudioPlayer></AudioPlayer>
            </div>
        );
    }



    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default SignUp;
