import React, { Component } from 'react';

import MainPointBubble from './MainPointBubble';
import PillButton from '../PillButton';


class MainPointsSection extends Component {

    getMPSStyles() {
        return {
            position: 'relative',
            top: '-450px',
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
    getBottomStyles() {
        return {
            position: 'relative',
            top: '-450px',
            width: '100%',
            height: '200px',
            textAlign: 'center',
            fontFamily: '-apple-system',
            fontSize: '13px',
            fontWeight: '500',
        }
    }
    getInputStyles() {
        return {
            width: '90%',
            height: '25px',
            color: 'gray'
        };
    }




    render() {
        return (
            <div>
                <div style={this.getMPSStyles()}>
                    <MainPointBubble title="Recitations" description="The world's first - and leading - treasury of original poetry recitations." src='https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FHeadphonesIcon.png?alt=media&token=70528209-3036-40c6-b5bd-d6b7a4110d2f'></MainPointBubble>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MainPointBubble title="Upload" description="Record your own recitations for others to listen to, favorite, and share." src='https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FMicrophoneImage.png?alt=media&token=a5c3eb71-30c6-4b69-a0b7-c4b413aca15c'></MainPointBubble>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MainPointBubble title="Social" description="Create, share, follow, discover. Get to know other reciting artists and keep up with their latest posts." src='https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FSocialImageIcon.png?alt=media&token=d9fcf459-bee0-48ac-8552-11ae91ed3101'></MainPointBubble>
                </div>

                <div style={this.getBottomStyles()}>
                    <h3 style={{color:'gray'}}>Want to be notified when Recited Verse launches? Enter your email below!</h3>
                    <input type='text' placeholder='Email Address' style={this.getInputStyles()}></input>
                    <br/><br/><br/>
                    <PillButton width='80px' height='35px' hoverColor="rgb(135, 206, 235)" clickFunction={()=>{this.props.submitToMailingList()}}>
                        Submit
                    </PillButton>
                </div>
            </div>
        );
    }

}

export default MainPointsSection;
