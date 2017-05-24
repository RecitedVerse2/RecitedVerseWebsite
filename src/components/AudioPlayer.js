import React, { Component } from 'react';

import CircleButton from './CircleButton';
import Clock from './Clock';

import _ from '../css/AudioPlayer.css';

// This is the audio player.
class AudioPlayer extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor(props) {
        super(props);
        this.state = {
            seeking:false,
            currentTime:'0:00',
            duration:'0:00'
        }
    }

    componentDidMount() {

    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    // Attemps to hide the audio player
    hide() {
        this.ap.style.opacity = '0';
    }

    // Unhides the audio player
    unhide() {
        this.ap.style.opacity = '1';
    }

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
            <div ref={(AudioPlayer)=>{this.ap = AudioPlayer}} style={this.getAPStyles()}>
                <div className="audio_buttons_section">
                    <CircleButton {...this.getCBS()} clickFunction={this.handleStepbackward.bind(this)}>
                        <p className='fa fa-step-backward' style={{paddingTop:'10px'}}></p>
                    </CircleButton>

                    <CircleButton {...this.getCBS()} clickFunction={this.handlePlay.bind(this)}>
                        <p className='fa fa-play' style={{paddingTop:'10px'}} ref={(p)=>{this.playIcon = p;}}></p>
                    </CircleButton>

                    <CircleButton {...this.getCBS()} clickFunction={this.handleStepforward.bind(this)}>
                        <p className='fa fa-step-forward' style={{paddingTop:'10px'}}></p>
                    </CircleButton>
                </div>



                <div className="title_area">
                    <p id="audio_title">{this.state.title}</p>
                    <div id="sliderArea" style={{position: 'relative', display: 'table', margin: 'auto'}}>
                        <audio id="rv_loaded_audio" preload="none"></audio>
                        <span style={{display: 'table-cell'}} id="curtimetext">{this.state.currentTime}</span>
                            &nbsp;&nbsp;&nbsp;
                            <input  ref={(input)=>{this.seekSlider = input}}
                                    style={{width: 300, display: 'table-cell'}}
                                    type="range" id="seekSlider"
                                    min={0} max={100} defaultValue={0} step={1}
                                    onMouseDown={(event)=>{ this.setState({seeking:true}); this.seek(event); }}
                                    onMouseMove={(event)=>{ this.seek(event); }}
                                    onMouseUp={()=>{ this.setState({ seeking:false }); }}/>
                            &nbsp;&nbsp;&nbsp;
                        <span style={{display: 'table-cell'}} id="durtimetext">{this.state.duration}</span>
                    </div>
                </div>

                <div className="right_buttons">
                    <button style={{color:'white'}} className="fa fa-repeat" onClick={this.handleLoop.bind(this)} ref={(button)=>{this.loopBtn = button}}/>
                </div>


                <Clock onupdate={this.updateAP.bind(this)}></Clock>
            </div>
        );
    }


    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    handlePlay() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            if(store.audio.paused === true || store.audio.ended === true) {
                store.audio.play();
                this.playIcon.className = 'fa fa-pause';
            } else {
                store.audio.pause();
                this.playIcon.className = 'fa fa-play';
            }
        }
    }


    handleLoop() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            store.audio.loop = store.audio.loop === true ? false : true;
            this.loopBtn.style.color = this.loopBtn.style.color === 'white' ? 'red' : 'white';
        }
    }


    handleStepforward() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            store.audio.currentTime = store.audio.duration;
        }
    }

    handleStepbackward() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            store.audio.currentTime = 0;
        }
    }



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    updateAP() {
        const store = this.props.rStore.getState();
        this.setState(store);

        // Change to play/pause button when audio is/isn't playing.
        if(store.audio !== null) {
            this.seekTimeUpdate();

            if(store.audio.paused === true || store.audio.ended === true) {
                this.playIcon.className = 'fa fa-play';
            } else {
                this.playIcon.className = 'fa fa-pause';
            }
        }
    }


    seek(e) {
        const store = this.props.rStore.getState();

        if(this.state.seeking === true) {
            this.seekSlider.value = e.clientX - this.seekSlider.offsetLeft;
            var seekto = store.audio.duration * (this.seekSlider.value / 100);
            store.audio.currentTime = seekto;
        }
    }

    seekTimeUpdate() {
        const store = this.props.rStore.getState();

        var newTime = store.audio.currentTime * (100 / store.audio.duration);
        this.seekSlider.value = newTime;
        var curmins = Math.floor(store.audio.currentTime / 60);
        var cursecs = Math.floor(store.audio.currentTime - curmins * 60);
        var durmins = Math.floor(store.audio.duration / 60);
        var dursecs = Math.floor(store.audio.duration - durmins * 60);
        if(cursecs < 10) { cursecs = "0"+cursecs; }
        if(dursecs < 10) { dursecs = "0"+dursecs; }
        if(curmins < 10) { curmins = "0"+curmins; }
        if(durmins < 10) { durmins = "0"+durmins; }
        this.setState({
            currentTime:curmins+":"+cursecs,
            duration:durmins+":"+dursecs
        });
    }
}


export default AudioPlayer;
