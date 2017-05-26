import React, { Component } from 'react';

import fonts from '../../css/fonts.css';

import HeadphonesIcon from '../../../public/res/HeadphoneIcon.png';
import MicrophoneIcon from '../../../public/res/Mic.png';
import SocialIcon from '../../../public/res/SocialIcon.png';

import MainPointBubble from './MainPointBubble';

class MainPointsSection extends Component {

    getMPSStyles() {
        return {
            width: '100%',
            height: '200px',
            textAlign: 'center',
            fontFamily: '-apple-system',
            fontSize: '13px',
            fontWeight: '500',
            display:'table',
            borderSpacing:'20px',
            borderCollapse:'separate'
        };
    }
    getQuoteStyle() {
        return {
            width:'40%',
            margin:'auto',
            color:'white',
            textAlign:'center'
        }
    }




    render() {
        return (
            <div style={{position:'relative',top:'50px'}}>

                <div style={this.getQuoteStyle()}>
                    <br/><br/><br/><br/>
                    <p style={{fontFamily:'NEBB', fontSize:'20px'}}>
                        Lorem ipsum dolor sit amet molestie consequat, vel illum dolore eu feugiat null a facilisis at vero eros et accumsan.<br/>- Lorem Ipsum
                    </p>
                    <br/><br/><br/>

                    <h1 style={{fontFamily:'Monthoers', fontSize:'70px'}}>SERVICES</h1>
                </div>

                <div style={this.getMPSStyles()}>
                    <MainPointBubble description="The world's first - and leading - treasury of original poetry recitations." src={HeadphonesIcon}></MainPointBubble>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MainPointBubble description="Record your own recitations for others to listen to, favorite, and share." src={MicrophoneIcon}></MainPointBubble>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MainPointBubble description="Create, share, follow, discover. Get to know other reciting artists and keep up with their latest posts." src={SocialIcon}></MainPointBubble>
                </div>
            </div>
        );
    }

}

export default MainPointsSection;
