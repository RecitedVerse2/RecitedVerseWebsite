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
            textAlign: 'center'
        };
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
            <div style={this.getMPSStyles()}>
                <MainPointBubble title="Recitations" description="The world's first - and leading - treasury of original poetry recitations."></MainPointBubble>
                <MainPointBubble title="Upload" description="Record your own recitations for others to listen to, favorite, and share."></MainPointBubble>
                <MainPointBubble title="Social" description="Create, share, follow, discover. Get to know other reciting artists and keep up with their latest posts."></MainPointBubble>

                <h3 style={{color:'gray'}}>Want to be notified when Recited Verse launches? Enter your email below!</h3>
                <input type='text' placeholder='Email Address' style={this.getInputStyles()}></input>
                <br/><br/><br/>
                <PillButton width='80px' height='35px' title='Submit' hoverColor="rgb(135, 206, 235)" clickFunction={()=>{this.props.submitToMailingList()}}/>
            </div>
        );
    }

}

export default MainPointsSection;
