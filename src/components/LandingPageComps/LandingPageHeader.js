import React, { Component } from 'react';

import PillButton from '../PillButton';

// The video that shows at the top of the landing page.
class LandingPageHeader extends Component {

    getLPHStyles() {
        return {
            position: 'relative',
            top: '-450px',
            width: '100%',
            zIndex: '10',
            textAlign: 'center',
            fontFamily: '-apple-system',
            fontSize: '13px',
            fontWeight: '500'
        };
    }



    render() {
        return (
            <div style={this.getLPHStyles()}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FRVLogo.png?alt=media&token=15628916-c2cc-44c7-9e67-e77865839153" alt="logo" className="logo" width={150} height={150} />
                    <h2 style={{color: 'white', fontStyle: 'italic', fontSize: 30}}>Recited Verse</h2>
                    <h3 style={{color: 'white', fontStyle: 'italic', fontSize: 23}}>A free treasury of online poetry recitations</h3>

                    <PillButton width='60px' height='30px' hoverColor="rgb(135, 206, 235)" clickFunction={()=>{this.props.loginBtn()}}>
                        Login
                    </PillButton>
                    &nbsp;&nbsp;&nbsp;
                    <PillButton width='60px' height='30px' hoverColor="rgb(135, 206, 235)" clickFunction={()=>{this.props.signupBtn()}}>
                        Sign Up
                    </PillButton>
                    <br/><br/><br/>
            </div>
        );
    }
}

export default LandingPageHeader;
