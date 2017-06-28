import React, { Component } from 'react';

// eslint-disable-next-line
import _ from '../../css/fonts.css';

import HeadphonesIcon from '../../res/HP-Icon.png';
import MicrophoneIcon from '../../res/Mic-Icon.png';
import SocialIcon from '../../res/SM-Icon.png';

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

                    <h1 style={{fontFamily:'Monthoers', fontSize:'70px'}}>Services</h1>
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
