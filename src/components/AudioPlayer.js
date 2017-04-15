import React, { Component } from 'react';
import * as firebase from 'firebase';

import CircleButton from './CircleButton';

import _ from '../css/AudioPlayer.css';

// This is the audio player.
class AudioPlayer extends Component {
    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            audio:null,
            ended:false
        }
    }

    componentDidMount() {
        const cpri = JSON.parse(window.sessionStorage.getItem('currently_playing_recitation_info'));
        if(cpri !== null) {




        }
    }



    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getAPStyles() {
        return {
            position: 'fixed',
            left:'0px',
            bottom:'0px',
            width:'100%',
            height:'65px',
            zIndex:'500',
            color: 'white',
            display: 'table',
            textAlign: 'center',
            backgroundColor:'rgb(76, 182, 203)'
        };
    }
    getCBS() {
        return {
            width: '45px',
            height: '45px',
            border:'2px white solid',
            textColor:'white',
            backgroundColor:'rgba(0,0,0,0)',
            hoverColor:'#ADB8F9',
            WebkitTransitionDuration:'0.4s'
        };
    }




    render() {
        return (
            <div style={this.getAPStyles()}>

                <div className="audio_buttons_section">
                    <CircleButton {...this.getCBS()} >
                        <p className='fa fa-step-backward' style={{paddingTop:'10px'}}></p>
                    </CircleButton>

                    <CircleButton {...this.getCBS()} clickFunction={this.handlePlay.bind(this)}>
                        <p className='fa fa-play' style={{paddingTop:'10px'}} ref={(p)=>{this.playIcon = p;}}></p>
                    </CircleButton>

                    <CircleButton {...this.getCBS()}>
                        <p className='fa fa-step-forward' style={{paddingTop:'10px'}}></p>
                    </CircleButton>
                </div>



                <div className="title_area">
                    <p id="audio_title"></p>
                    <div id="sliderArea" style={{position: 'relative', display: 'table', margin: 'auto'}}>
                        <audio id="rv_loaded_audio" preload="none"></audio>
                        <span style={{display: 'table-cell'}} id="curtimetext">0:00</span>&nbsp;&nbsp;&nbsp;<input style={{width: 300, display: 'table-cell'}} type="range" id="seekSlider" min={0} max={100} defaultValue={0} step={1} />&nbsp;&nbsp;&nbsp;<span style={{display: 'table-cell'}} id="durtimetext">0:00</span>
                    </div>
                </div>

                <div className="right_buttons">
                    <button className="fa fa-random"/>
                    <button className="fa fa-repeat"/>
                </div>
            </div>
        );
    }


    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    handlePlay() {
        if(this.state.audio) {
            if(this.state.audio.paused === true) {
                this.props.poemPlayBtn.className = 'description_button fa fa-pause';
                this.playIcon.className = 'fa fa-pause';
                this.state.audio.play();
            } else {
                this.props.poemPlayBtn.className = 'description_button fa fa-play';
                this.playIcon.className = 'fa fa-play';
                this.state.audio.pause();
            }
            window.sessionStorage.setItem('currently_playing_recitation_info', JSON.stringify(this.state));
        }
    }



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    updateAP(aud) {
        this.setState({audio:aud});
    }
}


export default AudioPlayer;
