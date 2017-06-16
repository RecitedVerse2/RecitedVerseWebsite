import React, { Component } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import * as firebase from 'firebase';

import CircleButton from './CircleButton';
import Clock from './Clock';

import _ from '../css/AudioPlayer.css';
import background from '../../public/res/BlankBanner.png';


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
            bottom:'-70px',
            seeking:false,
            currentTime:'0:00',
            duration:'0:00',
            doubleClickBack:false
        }
    }

    componentDidMount() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            if(store.audio.loop === true) {
                this.loopBtn.style.color = 'red';
            } else {
                this.loopBtn.style.color = 'white';
            }
        }
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'fixed',
            bottom:this.state.bottom,
            width:'100%',
            height:'90px',
            color:'white',
            zIndex:'1000',
            textAlign:'center',
            display:'inline-block',
            WebkitTransitionDuration:'0.3s'
        }
    }
    getBackgroundStyle() {
        return {
            width:'100%',
            height:'100%'
        }
    }
    getCBS() {
        return {
            width: '45px',
            height: '45px',
            textColor:'white',
            hoverColor:'#ADB8F9',
            border:'2px white solid',
            backgroundColor:'rgba(0,0,0,0)',
            WebkitTransitionDuration:'0.4s'
        };
    }




    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
         const popover = (
            <Popover id="popover-positioned-top" style={{textAlign:'center'}}>
                <input  ref={(input)=>{this.volumeSlider = input}}
                        style={{display: 'table-cell'}}
                        type="range" id="volumeSlider"
                        orient='vertical'
                        min={0} max={100} defaultValue={this.props.rStore.getState().volume} step={1}
                        onMouseMove={this.setVolume.bind(this)} />
            </Popover>
        );

        return (
            <div ref={(AudioPlayer)=>{this.ap = AudioPlayer}} style={this.getStyles()}>
                
                {/* The buttons for playing the audio. */}
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
            

                {/* The audio slider. */}
                <div className="title_area">
                    <p id="audio_title">{this.state.title}</p>
                    <div id="sliderArea" style={{position: 'relative', display: 'table', margin: 'auto'}}>
                        <audio id="rv_loaded_audio" preload="none"></audio>
                        <span style={{display: 'table-cell'}} id="curtimetext">{this.state.currentTime}</span>
                            &nbsp;&nbsp;&nbsp;
                            <input  ref={(input)=>{this.seekSlider = input}}
                                    style={{width: 350, display: 'table-cell'}}
                                    type="range" id="seekSlider"
                                    min={0} max={100} defaultValue={0} step={1}
                                    onMouseDown={(event)=>{ this.setState({seeking:true}); this.seek(event); }}
                                    onMouseMove={(event)=>{ this.seek(event); }}
                                    onMouseUp={()=>{ this.setState({ seeking:false }); }}/>
                            &nbsp;&nbsp;&nbsp;
                        <span style={{display: 'table-cell'}} id="durtimetext">{this.state.duration}</span>
                    </div>
                </div>


                {/* The buttons for volume and looping. */}
                <div className="right_buttons">
                    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                        <button id='volumeBtn' ref={(button)=>{this.volumeButton = button}} data-toggle="popover" data-placement="top">
                            <p ref={(p)=>{this.volumeIcon = p}} className='fa fa-volume-up'></p>
                        </button>
                    </OverlayTrigger>

                    &nbsp;&nbsp;&nbsp;

                    <button style={{color:'white'}} className="fa fa-repeat" onClick={this.handleLoop.bind(this)} ref={(button)=>{this.loopBtn = button}}/>
                
                    &nbsp;&nbsp;&nbsp;
                </div>
                <button style={{color:'white',fontSize:'20px'}} className="fa fa-caret-up" onClick={this.toggleAudioPlayer.bind(this)} ref={(button)=>{this.toggleBtn = button}}/>
                


                {/* The background for the audio player. */}
                <img src={background} alt="ap" style={this.getBackgroundStyle()}/>

                {/* The updating clock. */}
                <Clock onupdate={this.updateAP.bind(this)}></Clock>
            </div>
        );
    }


    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    toggleAudioPlayer() {
        this.props.rStore.dispatch({
            type:'TOGGLE_AUDIOPLAYER'
        });

        // Reset the double clicking for going backward.
        this.setState({
            doubleClickBack:false
        })
    }

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

        // Reset the double clicking for going backward.
        this.setState({
            doubleClickBack:false
        })
    }

    handleLoop() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            store.audio.loop = store.audio.loop === true ? false : true;
            this.loopBtn.style.color = this.loopBtn.style.color === 'white' ? 'red' : 'white';
            this.props.rStore.dispatch({
                type: 'LOOP_AUDIO'
            })
        }

        // Reset the double clicking for going backward.
        this.setState({
            doubleClickBack:false
        })
    }

    handleStepforward() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            store.audio.currentTime = store.audio.duration;
        }

        // Reset the double clicking for going backward.
        this.setState({
            doubleClickBack:false
        })
    }

    handleStepbackward(e) {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            store.audio.currentTime = 0;

            // Go to the last recitation in the playlist if there is one.
            if(this.state.doubleClickBack === true) {
                this.startNextRecitation('last');
                this.setState({
                    doubleClickBack: false
                })
            } else {
                this.setState({
                    doubleClickBack: true
                })
            }
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

        // Change the toggling of the audio player.
        if(store.audioPlayerOpen === true) {
            this.setState({
                bottom:'0px'
            });
            this.toggleBtn.className = "fa fa-caret-down";
        } else {
            this.setState({
                bottom:'-70px'
            });
            this.toggleBtn.className = "fa fa-caret-up";
        }

        // If the recitation is part of a playlist and one recitation ends, start the next one.
        if(store.audio !== null) {
            if(store.loop === false) {
                if(this.state.currentTime !== null && this.state.duration !== null) {
                    if(this.state.currentTime === this.state.duration) {
                        var rec = store.recitation;
                        
                        // Check if it part of a playlist. Otherwise it should just stop playing.
                        if(rec.playlist !== null && rec.playlist !== undefined) {

                            // If it's not the last item in the playlist, then play the next one.
                            if(rec.playlist.indexOf(rec) < rec.playlist.length()) {
                                this.startNextRecitation('next');
                            }
                        }
                    }
                }
            }
        }
    }

    setVolume() {
        const store = this.props.rStore.getState();

        if(store.audio !== null) {
            store.audio.volume = this.volumeSlider.value / 100;
            this.props.rStore.dispatch({
                type: 'ADJUST_VOLUME',
                volume: this.volumeSlider.value
            });
        }

        // Reset the double clicking for going backward.
        this.setState({
            doubleClickBack:false
        })
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

        if(store.audio !== null) {
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


    /** Used when playing recitations in a playlist. */
    startNextRecitation(next) {
        const store = this.props.rStore.getState();
        const storageRef = firebase.storage().ref();
        var rec;

        if(next === 'next') {
            rec = store.recitation.playlist.next(store.recitation);
        } else if(next === 'last') {
            rec = store.recitation.playlist.last(store.recitation);
        }
        
        // First, check if that next recitation is null. If so, just return.
        if(rec === null) { return; }

        // First, clear whatever is there.
        if(store.audio !== null) { store.audio.pause(); }
        this.props.rStore.dispatch({
            type:'CLEAR'
        });

        // Get the new audio.
        storageRef.child(rec.uploaderID).child(rec.id).getDownloadURL().then( (url) => {
            var audio = new Audio(url);
            audio.loop = false;

            // First set the audio if it is null. Then play it.
            if(store.audio === null) {
                this.props.rStore.dispatch({
                    type:'SET',
                    id:rec.id,
                    uploaderID:rec.uploaderID,
                    uploaderName:rec.uploaderName,
                    image:rec.image,
                    title:rec.title,
                    author:rec.author,
                    recitedBy:rec.recitedBy,
                    published:rec.published,
                    genre:rec.genre,
                    description:rec.description,
                    likes:rec.likes,
                    plays:rec.plays,
                    favorites:rec.favorites,
                    text:rec.text,
                    recitation:rec,
                    audio:audio,
                    volume:store.volume,
                    loop:store.loop,
                });
                store.audio.play();
            }
        });


        // Reset the double clicking for going backward.
        this.setState({
            doubleClickBack:false
        })
    }
}


export default AudioPlayer;
