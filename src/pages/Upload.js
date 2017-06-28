
import React, { Component } from 'react';
import * as firebase from 'firebase';
import audioRec from 'au-audio-recorder';
import Alertify from 'alertify.js';

// eslint-disable-next-line
import _ from '../css/UploadBox.css';

import backgroundImage from '../res/brickBackground.jpg';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import FileChooserForm from '../components/FileChooserForm';
import Clock from '../components/Clock';


class Upload extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            audioObj: null,
            poemName:'',
            poemAuthor:'',
            poemRecitedBy:'',
            poemPublished:'',
            poemGenre:'',
            poemWrittenText:'',
            poemDescription:''
        }
    }

    componentDidMount() {
        audioRec.requestPermission();
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'absolute',
            left:'0px',
            top:'0px',
            width:'100%',
            height:'2500px',
            color:'white'
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }
    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1',
        }
    }
    getFormButtonStyle() {
        return {
            width: '500px',
            height: '30px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '40px',
            fontFamily:'Monthoers',
            textAlign: 'center',
            background: 'none',
            border: 'none',
            outline: 'none',
            textDecoration: 'none'
        };
    }
    getFormButtonStyle2() {
        return {
            width: '200px',
            height: '50px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '30px',
            fontFamily:'Monthoers',
            textAlign: 'center',
            border: 'none',
            borderRadius:'40px',
            outline: 'none',
            textDecoration: 'none',
            paddingTop: '10px',
            display: 'inline-block',
            backgroundColor: this.state.audioObj == null ? 'rgb(76, 182, 203)' : 'rgb(102, 214, 147)',
            WebkitTransitionDuration: '0.4s',
        };
    }



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                <Clock onupdate={this.handleStopPlaying.bind(this)}></Clock>
                
                {/* Header and Background stuff. */}
                <ProfileHeader nav={this.props.nav} rStore={this.props.rStore}></ProfileHeader>
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>


                {/* The banner that displays the page title. */}
                <ProfileBanner top='150px' height='180px' rStore={this.props.rStore}>
                    <h1 style={{fontFamily:'Monthoers', fontSize:'80px'}}>Upload your Recitation</h1>
                </ProfileBanner>


                {/* All of the input fields. */}
                <div className='uploadInputs' style={{margin:'auto',textAlign:'center'}}>
                    <div className='inputArea'>
                        <h1 className='inputTitle'>Poem:</h1>
                        <input className='inputField' ref={(input)=>{this.poemField = input}} type='text' />
                    </div>

                    <br/><br/>

                    <div className='inputArea'>
                        <h1 className='inputTitle'>Poet:</h1>
                        <input className='inputField' ref={(input)=>{this.poetField = input}} type='text' />
                    </div>

                    <br/><br/>

                    <div className='inputArea'>
                        <h1 className='inputTitle'>Recited By:</h1>
                        <input style={{paddingLeft:'100px'}} className='inputField' ref={(input)=>{this.recitedByField = input}} type='text' />
                    </div>

                    <br/><br/>

                    <div className='inputArea'>
                        <h1 className='inputTitle'>Year Published:</h1>
                        <input style={{paddingLeft:'150px'}} className='inputField' ref={(input)=>{this.publishedField = input}} type='text' />
                    </div>

                    <br/><br/>

                    <div className='inputArea'>
                        <h1 className='inputTitle'>Genre:</h1>
                        <input className='inputField' ref={(input)=>{this.genreField = input}} type='text' />
                    </div>

                    <br/>

                    {/* Longer input fields. */}
                    <div className='largeArea'>
                        <h1 className='largeTitle'>Poem Transcript:</h1>
                        <textarea className='largeInput' ref={(textarea)=>{this.transcriptField = textarea}} rows={5} cols={55}></textarea>
                    </div>

                    <br/><br/>

                    <div className='largeArea'>
                        <h1 className='largeTitle'>Description (Optional):</h1>
                        <textarea className='largeInput' ref={(textarea)=>{this.descriptionField = textarea}} rows={5} cols={55}></textarea>
                    </div>

                    <br/><br/>

                    {/* Uploading image. */}
                    <div className='imageArea'>
                        <h1 className='imageTitle'>Image (Optional):</h1>
                        <img ref={(img)=>{this.poemImage = img}} width="250px" height="250px" src="https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FEmptyPhoto.png?alt=media&token=ce1a33f5-f1d6-4f22-a6f8-8ab40cbd5c83" alt="poem_photo"/>
                        <br/>

                        <FileChooserForm formButtonStyle={this.getFormButtonStyle()}
                                        ref={(FileChooserForm)=>{this.addPhotoBtn = FileChooserForm}}
                                        formButtonId='addPhotoBtn' 
                                        formButtonClass='pill_btn' name='recImageFile' 
                                        accept='image/x-png' multiple='false'
                                        fileSelectedHandler={(e)=>{this.uploadRecitationImage(e)}}>
                            Add Photo
                        </FileChooserForm>
                    </div>

                    {/* Uploading a recitation. */}
                    <div className='uploadArea'>
                        {/* Upload from file */}
                        <h5 className='uploadTitle'>Upload A Recording</h5>
                        <br/>
                        <FileChooserForm formButtonStyle={this.getFormButtonStyle2()} 
                                        ref={(FileChooserForm)=>{this.fromFileBtn = FileChooserForm}}
                                        formButtonId='fromFileBtn' 
                                        formButtonClass='pill_btn' name='fileRecitation' 
                                        accept='audio/*' multiple='false'
                                        fileSelectedHandler={(e)=>{this.uploadAudioFile(e)}}>
                            Upload
                        </FileChooserForm>
                        
                        <br/>
                        <p style={{fontFamily:'Monthoers',fontSize:'25px'}}>Or</p>
                        <br/>

                        {/* Record in browser */}
                        <div>
                            <h1 className='recordTitle'>Record a poem</h1>
                            <div className="mediaButtons">
                                <button onClick={this.handleRecord.bind(this)} ref={(button)=>{this.recordBtn = button}} className='recordingButtons fa fa-microphone'></button>
                                <button onClick={this.handlePlay.bind(this)} ref={(button)=>{this.playBtn = button}} className='recordingButtons fa fa-play'></button>
                                <button onClick={this.handlePause.bind(this)} ref={(button)=>{this.pauseBtn = button}} className='recordingButtons fa fa-pause'></button>
                                <button onClick={this.handleStop.bind(this)} ref={(button)=>{this.stopBtn = button}} className='recordingButtons fa fa-stop'></button>
                                <button onClick={this.handleClear.bind(this)} ref={(button)=>{this.clearBtn = button}} className='recordingButtons fa fa-trash'></button>
                            </div>
                            <br/>
                            <p ref={(p)=>{this.statusLabel = p}}></p>
                            
                            <button className='uploadButton' 
                                    ref={(button)=>{this.submitBtn = button}}
                                    onClick={this.handleSubmit.bind(this)}>Upload</button>
                            <br/>
                        </div>
                    </div>
                </div>


                <br/><br/><br/>
                <Clock onupdate={this.handleStopPlaying.bind(this)}></Clock>
                {this.props.children}
            </div>
        );
    }


    /**********************
    *                     *
    *       BUTTONS       *
    *                     *
    ***********************/

    uploadRecitationImage(e) {
        var poemImage = this.poemImage;
        poemImage.src = e;
    };

    uploadAudioFile(e) {
        var aud = new Audio();
        aud.src = e;
        this.setState({
            audioObj:aud
        });
    }



    /**********************
    *                     *
    *    AUDIO RECORDER   *
    *                     *
    ***********************/

    handleRecord() {
        var statusLabel = this.statusLabel;

        if(!this.recordBtn.className.includes('fa-microphone-slash')) {
            audioRec.startRecording();
            this.recordBtn.className = 'recordingButtons fa fa-microphone-slash';
            statusLabel.innerHTML = 'Recording...';
            statusLabel.style.WebkitTransitionDuration = '0s';
            statusLabel.style.opacity = '1';
        } else {
            this.recordBtn.className = 'recordingButtons fa fa-microphone';
            this.handleEndRecord();
        }
        return;
    }

    handleEndRecord() {
        audioRec.stopRecording();
        var statusLabel = this.statusLabel;
        statusLabel.innerHTML = '';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';

        return;
    }

    handlePlay() {
        var statusLabel = this.statusLabel;
        if(this.state.audioObj !== null) {
            this.state.audioObj.play();
            statusLabel.innerHTML = 'Playing...';
            statusLabel.style.WebkitTransitionDuration = '0s';
            statusLabel.style.opacity = '1';
            return;
        } else if(audioRec.getRecording() !== null) {
            audioRec.play();
            statusLabel.innerHTML = 'Playing...';
            statusLabel.style.WebkitTransitionDuration = '0s';
            statusLabel.style.opacity = '1';
            return;
        } else {
            return;
        }
    }

    handlePause() {
        if(this.state.audioObj !== null) {
            this.state.audioObj.pause();
            this.statusLabel.innerHTML = 'Paused...';
            this.statusLabel.style.WebkitTransitionDuration = '0s';
            this.statusLabel.style.opacity = '1';
            return;
        } else if(audioRec.getRecording() !== null) {
            audioRec.pause();
            this.statusLabel.innerHTML = 'Paused...';
            this.statusLabel.style.WebkitTransitionDuration = '0s';
            this.statusLabel.style.opacity = '1';
            return;
        } else {
            return;
        }
    }

    handleStop() {
        if(this.state.audioObj !== null) {
            this.state.audioObj.pause();
            var a = this.state.audioObj;
            a.pause();
            a.currentTime = 0;
            this.setState({
                audioObj:a
            });
            this.statusLabel.innerHTML = '';
            this.statusLabel.style.WebkitTransitionDuration = '0s';
            this.statusLabel.style.opacity = '1';
            return;
        } else if(audioRec.getRecording() !== null) {
            audioRec.stop();
            this.statusLabel.innerHTML = '';
            this.statusLabel.style.WebkitTransitionDuration = '0s';
            this.statusLabel.style.opacity = '1';
            return;
        } else {
            this.statusLabel.innerHTML = '';
            this.statusLabel.style.WebkitTransitionDuration = '0s';
            this.statusLabel.style.opacity = '1';
            return;
        }
    }

    handleClear() {
        audioRec.stop();
        if(this.state.audioObj !== null) { this.state.audioObj.pause(); }
        this.setState({audioObj:null});
        audioRec.clear();
        var statusLabel = this.statusLabel;
        statusLabel.innerHTML = 'Cleared';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';

        setTimeout(() => {
            this.removeClearMessage();
        }, 1000);
    }

    handleSubmit() {
        var missingInfo = '';
        this.statusLabel.style.WebkitTransitionDuration = '0s';
        this.statusLabel.style.visibility = 'visible';
        this.statusLabel.style.opacity = '1';

        var finalRecording = audioRec.getRecording();
        const fireRef = firebase.database().ref();
        const storageRef = firebase.storage().ref();
        const store = this.props.rStore.getState();

        var poemName = this.poemField;
        var poemAuthor = this.poetField;
        var poemRecitedBy = this.recitedByField;
        var poemPublished = this.publishedField;
        var poemGenre = this.genreField;
        var poemWrittenText = this.transcriptField;
        var poemDescription = this.descriptionField;

        if( (this.valueExists(this.state.audioObj) || finalRecording !== null) && this.valueExists(poemName.value) && this.valueExists(poemAuthor.value) 
            && this.valueExists(poemRecitedBy.value) && this.valueExists(poemPublished.value)
            && this.valueExists(poemGenre.value) && this.valueExists(poemWrittenText.value)) {

            // Create a dictionary object for the audio.
            // Save that dictionary to the Firebase database.
            // Save the audio to the Firebase storage.
            // Return from this method.
            var fp = fireRef.child("Recitations").push();

            /* Create dictionary for the recitation. */
            var dictionary = {
                "id":fp.key,
                "uploaderID":store.currentUser.userID,
                "uploaderName":store.currentUser.fullname,
                "title":poemName.value,
                "author":poemAuthor.value,
                "published":poemPublished.value,
                "genre":poemGenre.value,
                "text":poemWrittenText.value,
                "description":poemDescription.value || "",
                "image":this.poemImage.src,
                "recited_by":poemRecitedBy.value,
                "plays":0,
                "likes":0,
                "favorites":0,
                "comments":[],
                "timestamp":Date.now()
            };


            var myRecording = audioRec.getRecordingFile();
            // If the recording is not null, then upload that. Otherwise, upload a file.
            if(myRecording !== null) {
                this.statusLabel.style.visibility = 'visible';
                this.statusLabel.style.WebkitTransitionDuration = '0.5s';
                this.statusLabel.style.opacity = '1';
                this.statusLabel.innerHTML = "Uploading...";

                /* Save it to the database under Recitations->UserID->AutoID:Dictionary*/
                fp.setWithPriority(dictionary, 0 - Date.now());

                /* Save the actual audio to the storage. */
                storageRef.child('Recitations').child(dictionary['id']).put(myRecording).then(() => {
                    this.statusLabel.innerHTML = "Done!";
                    return;
                });

            } else if(this.valueExists(this.state.audioObj)) {
                this.statusLabel.style.visibility = 'visible';
                this.statusLabel.style.WebkitTransitionDuration = '0.5s';
                this.statusLabel.style.opacity = '1';
                this.statusLabel.innerHTML = "Uploading...";

                /* Save it to the database under Recitations->UserID->AutoID:Dictionary*/
                fp.set(dictionary);

                /* Save the actual audio to the storage. */
                storageRef.child('Recitations').child(dictionary['id']).putString(this.state.audioObj.src, 'data_url').then((snapshot) => {
                    this.statusLabel.innerHTML = "Done!";
                    return;
                });

            }
            return;
        } else {
            
            if(!this.valueExists(this.state.audioObj) && finalRecording === null) { missingInfo += "You must upload or record a poem before submitting<br/>"; }
            if(!this.valueExists(poemName.value)) { missingInfo += "Enter a name for the poem<br/>"; }
            if(!this.valueExists(poemAuthor.value)) { missingInfo += "Enter a name of the poet<br/>"; }
            if(!this.valueExists(poemRecitedBy.value)) { missingInfo += "Enter a name for the reciting artist<br/>"; }
            if(!this.valueExists(poemPublished.value)) { missingInfo += "Enter a year of publication<br/>"; }
            if(!this.valueExists(poemGenre.value)) { missingInfo += "Enter the genre of the poem<br/>"; }
            if(!this.valueExists(poemWrittenText.value)) { missingInfo += "Enter the transcript of the poem<br/>"; }

            Alertify.alert(missingInfo);
            return;
        }
    }

    removeClearMessage() {
        this.statusLabel.innerHTML = '';
    }

    handleStopPlaying() {
        if(this.state.audioObj !== null) {
            if(this.state.audioObj.ended === true) {
                this.statusLabel.innerHTML = '';
                var a = this.state.audioObj;
                a.pause();
                a.currentTime = 0;
                this.setState({
                    audioObj:a
                });
            }
        } else {
            if(audioRec.isFinished() === true) {
                this.statusLabel.innerHTML = '';
            }
        }
    }



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    // Returns whether or not a value for a particular element exists.
    valueExists(element) {
        if(element !== undefined && element !== null && element !== '' && element !== ' ') {
            return true;
        } else {
            return false;
        }
    }

}

export default Upload;