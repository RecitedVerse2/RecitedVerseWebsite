import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import audioRec from 'au-audio-recorder';
import * as firebase from 'firebase';

import FileChooserForm from '../FileChooserForm';
import CircleButton from '../CircleButton';

import _ from '../../css/UploadBox.css';


// The box for uploading recitations.
class UploadBox extends Component {
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
    getModalOverlayStyle() {
        return {
            zIndex:'1000',
            textAlign:'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        };
    }
    getModalContentStyle() {
        return {
            position:'fixed',
            top: '10%',
            left:'25%',
            width:'50%',
            height: '80%',
            textAlign:'center',
            color: 'lightsteelblue'
        };
    }
    getFormButtonStyle() {
        return {
            width: '100px',
            height: '30px',
            color: 'black',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '400',
            paddingTop: '8px',
            textAlign: 'center',
            display: 'inline-block',
            backgroundColor: 'rgb(76, 182, 203)',
            WebkitTransitionDuration: '0.4s'
        };
    }
    getCBS() {
        return {
            width: '50px',
            height: '50px',
            backgroundColor:'#ADD8E6',
            hoverColor:'#ADB8F9',
            WebkitTransitionDuration:'0.4s'
        };
    }



    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Upload Recitation</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{textAlign:'center'}}>
                    <h5>Poem Name: <input id='poemName' className='inp' type="text" placeholder="Enter the name of the poem"/> </h5>
                    <h5>Author: <input id='poemAuthor' className='inp'  type="text" placeholder="Enter the author's name" /> </h5>
                    <h5>Recited By: <input id='poemRecitedBy' className='inp'  type="text" placeholder="Enter the reciter's name"/> </h5>
                    <h5>Published: <input id='poemPublished' className='inp'  type="text" placeholder="Year of publication" /> </h5>
                    <h5>Genre: <input id='poemGenre' className='inp'  type="text" placeholder="Enter the genre of the poem" /> </h5>
                    <h5>Written Text: </h5>
                    <textarea id='poemWrittenText'className='inp' rows="15" cols="35"></textarea>
                    <h5>Description (Optional): </h5>
                    <textarea id='poemDescription' rows="5" cols="30"></textarea>
                    <h5>Image (Optional):</h5>
                    <img id='poem_image' width="200px" height="200px" src="https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FEmptyPhoto.png?alt=media&token=ce1a33f5-f1d6-4f22-a6f8-8ab40cbd5c83" alt="poem_photo"/>
                    <br/><br/>

                    <FileChooserForm formButtonStyle={this.getFormButtonStyle()} formButtonId='addPhotoBtn' formButtonClass='pill_btn' name='recImageFile' accept='image/x-png' multiple='false'
                                    fileSelectedHandler={(e)=>{this.uploadRecitationImage(e)}}>
                        Add Photo
                    </FileChooserForm>

                    <br />
                    <h5 className="page_text">Upload a recording from a file</h5>
                    <FileChooserForm formButtonStyle={this.getFormButtonStyle()} formButtonId='fromFileBtn' formButtonClass='pill_btn' name='fileRecitation' accept='audio/x-mpeg' multiple='false'
                                    fileSelectedHandler={(e)=>{this.uploadAudioFile(e)}}>
                        Upload
                    </FileChooserForm>
                    <p id='uploadAudioCheck' className='fa fa-check'></p>

                    <p className="page_text">Or</p>
                    <h5 className="page_text">Record a recitation here.</h5>
                    {/*<p id="canvas_holder" className="canvas_holder"><canvas className="visualizer" /></p>*/}
                    <div className="mediaButtons">
                        <CircleButton id='recordBtn' {...this.getCBS()} style={{paddingTop:'10px'}} clickFunction={this.handleRecord.bind(this)}><p className="fa fa-microphone"></p></CircleButton>
                        <CircleButton {...this.getCBS()} style={{paddingTop:'10px'}} clickFunction={this.handleEndRecord.bind(this)}><p className="fa fa-stop-circle-o"></p></CircleButton>
                        <CircleButton {...this.getCBS()} style={{paddingTop:'10px'}} clickFunction={this.handlePlay.bind(this)}><p className="fa fa-play"></p></CircleButton>
                        <CircleButton {...this.getCBS()} style={{paddingTop:'10px'}} clickFunction={this.handlePause.bind(this)}><p className="fa fa-pause"></p></CircleButton>
                        <CircleButton {...this.getCBS()} style={{paddingTop:'10px'}} clickFunction={this.handleStop.bind(this)}><p className="fa fa-stop"></p></CircleButton>
                        <CircleButton {...this.getCBS()} style={{paddingTop:'10px'}} clickFunction={this.handleClear.bind(this)}><p className="fa fa-trash"></p></CircleButton>
                    </div>
                    <br/>
                    <p id='statusLabel'></p>
                </Modal.Body>

                <Modal.Footer>
                    <button className="pill_btn" id="submit_recitation_btn" style={{cursor:'pointer'}} onClick={this.handleSubmit.bind(this)}>Submit</button>
                </Modal.Footer>
            </Modal>
        );
    }



    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    uploadRecitationImage(e) {
        var poemImage = document.getElementById('poem_image');
        poemImage.src = e;
    };

    uploadAudioFile(e) {
        document.getElementById('uploadAudioCheck').style.visibility = 'visible';
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
        audioRec.startRecording();
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = 'Recording...';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';
    }

    handleEndRecord() {
        audioRec.stopRecording();
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = '';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';
    }

    handlePlay() {
        var statusLabel = document.getElementById('statusLabel');
        if(this.state.audioObj !== null) {
            this.state.audioObj.play();
            statusLabel.innerHTML = 'Playing...';
            statusLabel.style.WebkitTransitionDuration = '0s';
            statusLabel.style.opacity = '1';
        } else {
            if(audioRec.getRecording() !== null) {
                audioRec.play();
                statusLabel.innerHTML = 'Playing...';
                statusLabel.style.WebkitTransitionDuration = '0s';
                statusLabel.style.opacity = '1';
            }
        }
    }

    handlePause() {
        var statusLabel = document.getElementById('statusLabel');
        if(this.state.audioObj !== null) {
            this.state.audioObj.pause();
            statusLabel.innerHTML = '';
            statusLabel.style.WebkitTransitionDuration = '0s';
            statusLabel.style.opacity = '1';
        } else {
            if(audioRec.getRecording() !== null) {
                audioRec.pause();
                statusLabel.innerHTML = 'Playing...';
                statusLabel.style.WebkitTransitionDuration = '0s';
                statusLabel.style.opacity = '1';
            }
        }
    }

    handleStop() {
        var statusLabel = document.getElementById('statusLabel');
        if(this.state.audioObj !== null) {
            this.state.audioObj.pause();
            var a = this.state.audioObj;
            a.pause();
            a.currentTime = 0;
            this.setState({
                audioObj:a
            });
            statusLabel.innerHTML = '';
            statusLabel.style.WebkitTransitionDuration = '0s';
            statusLabel.style.opacity = '1';
        } else {
            if(audioRec.getRecording() !== null) {
                audioRec.stop();
                statusLabel.innerHTML = 'Playing...';
                statusLabel.style.WebkitTransitionDuration = '0s';
                statusLabel.style.opacity = '1';
            }
        }
    }

    handleClear() {
        audioRec.stop();
        if(this.state.audioObj !== null) { this.state.audioObj.pause(); }
        this.setState({audioObj:null});
        audioRec.clear();
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = 'Cleared';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';
        document.getElementById('uploadAudioCheck').style.visibility = 'hidden';

        setTimeout(() => {
            statusLabel.style.WebkitTransitionDuration = '0.5s';
            statusLabel.style.opacity = '0';
            setTimeout(()=> {
                this.removeClearMessage();
            }, 500);
        }, 1000);
    }

    handleSubmit() {
        const fireRef = firebase.database().ref();
        const storageRef = firebase.storage().ref();
        const currentUserID = window.localStorage.getItem('currentUID');
        const props = this.props;

        var poemName = document.getElementById('poemName');
        var poemAuthor = document.getElementById('poemAuthor');
        var poemRecitedBy = document.getElementById('poemRecitedBy');
        var poemPublished = document.getElementById('poemPublished');
        var poemGenre = document.getElementById('poemGenre');
        var poemWrittenText = document.getElementById('poemWrittenText');
        var poemDescription = document.getElementById('poemDescription');

        if(this.valueExists(poemName.value) && this.valueExists(poemAuthor.value) && this.valueExists(poemRecitedBy.value)
        && this.valueExists(poemPublished.value) && this.valueExists(poemGenre.value) && this.valueExists(poemWrittenText.value)) {

            document.getElementById('submit_recitation_btn').disabled = true;

            // Create a dictionary object for the audio.
            // Save that dictionary to the Firebase database.
            // Save the audio to the Firebase storage.
            // Return from this method.

            /* Create dictionary for the recitation. */
            var dictionary = {
                "title":poemName.value,
                "author":poemAuthor.value,
                "published":poemPublished.value,
                "genre":poemGenre.value,
                "text":poemWrittenText.value,
                "description":poemDescription.value || "",
                "image":document.getElementById('poem_image').src,
                "recited_by":poemRecitedBy.value,
                "plays":0,
                "likes":0,
                "favorites":0,
                "comments":[],
                "timestamp":firebase.database.ServerValue.TIMESTAMP
            };


            var myRecording = audioRec.getRecordingFile();
            // If the recording is not null, then upload that. Otherwise, upload a file.
            if(myRecording != null) {

                /* Save it to the database under Recitations->UserID->AutoID:Dictionary*/
                fireRef.child("Recitations").child(currentUserID).child(poemName.value).setWithPriority(dictionary, 0 - Date.now());

                /* Save the actual audio to the storage. */
                storageRef.child(currentUserID).child(poemName.value).put(myRecording).then(function() {
                    props.onHide();
                });

            } else if(this.valueExists(this.state.audioObj)) {

                /* Save it to the database under Recitations->UserID->AutoID:Dictionary*/
                fireRef.child("Recitations").child(currentUserID).child(poemName.value).set(dictionary);

                /* Save the actual audio to the storage. */
                storageRef.child(currentUserID).child(poemName.value).putString(this.state.audioObj.src, 'data_url').then(function(snapshot) {
                    props.onHide();
                });

            }
        } else {
            if(!this.valueExists(poemName.value)) { poemName.style.borderColor = "red"; }
            if(!this.valueExists(poemAuthor.value)) { poemAuthor.style.borderColor = "red"; }
            if(!this.valueExists(poemRecitedBy.value)) { poemRecitedBy.style.borderColor = "red"; }
            if(!this.valueExists(poemPublished.value)) { poemPublished.style.borderColor = "red"; }
            if(!this.valueExists(poemGenre.value)) { poemGenre.style.borderColor = "red"; }
            if(!this.valueExists(poemWrittenText.value)) { poemWrittenText.style.borderColor = "red"; }
            if(!this.valueExists(this.state.audioObj) && audioRec.getRecording() === null) {
                document.getElementById('fromFileBtn').style.backgroundColor = "red";
                document.getElementById('recordBtn').style.backgroundColor = "red";
                setTimeout(function() {
                    document.getElementById('fromFileBtn').style.backgroundColor = "#ADD8E6";
                    document.getElementById('recordBtn').style.backgroundColor = "#ADD8E6";
                }, 3000);
            }
        }
    }

    removeClearMessage() {
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = '';
    }

    stoppedPlaying() {
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = '';
    }




    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    // Returns whether or not a value for a particular element exists.
    valueExists(element) {
        if(element !== undefined && element !== null && element !== '') {
            return true;
        } else {
            return false;
        }
    }
}


export default UploadBox;
