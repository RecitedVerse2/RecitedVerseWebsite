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
            audioTitle:'',
            recording:null
        }
    }

    componentDidMount() {
        var recitation = JSON.parse(window.sessionStorage.getItem("recitation_to_look_at"));
        var currentUID = window.localStorage.getItem('currentUID');

        var storageRef = firebase.storage().ref();
        storageRef.child(currentUID).child(recitation.title).getDownloadURL().then( (url) => {
            //var xhr = this.createCORSRequest('POST', url);
            var audio = new Audio();
            audio.src = url;
            audio.loop = false;
            this.setState({
                audioTitle:recitation.title,
                recording:audio
            });
        });
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

                    <CircleButton {...this.getCBS()}>
                        <p className='fa fa-play' style={{paddingTop:'10px'}}></p>
                    </CircleButton>

                    <CircleButton {...this.getCBS()}>
                        <p className='fa fa-step-forward' style={{paddingTop:'10px'}}></p>
                    </CircleButton>
                </div>



                <div className="title_area">
                    <p id="audio_title">{this.state.audioTitle}</p>
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



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }
}


export default AudioPlayer;
