import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import audioRec from 'au-audio-recorder';

import FileChooserForm from '../FileChooserForm';
import CircleButton from '../CircleButton';

import _ from '../../css/UploadBox.css';


// The box for uploading recitations.
class UploadBox extends Component {

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
                    <h5>Poem Name: <input className='inp' type="text" placeholder="Enter the name of the poem"/> </h5>
                    <h5>Author: <input className='inp'  type="text" placeholder="Enter the author's name"/> </h5>
                    <h5>Recited By: <input className='inp'  type="text" placeholder="Enter the reciter's name"/> </h5>
                    <h5>Published: <input className='inp'  type="text" placeholder="Year of publication"/> </h5>
                    <h5>Genre: <input className='inp'  type="text" placeholder="Enter the genre of the poem"/> </h5>
                    <h5>Written Text: </h5>
                    <textarea className='inp' rows="15" cols="35"></textarea>
                    <h5>Description (Optional): </h5>
                    <textarea rows="5" cols="30"></textarea>
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
                                    fileSelectedHandler={(e)=>{}}>
                        Upload
                        <p id="filenameLabel" style={{color: 'limegreen'}} />
                    </FileChooserForm>

                    <p className="page_text">Or</p>
                    <h5 className="page_text">Record a recitation here.</h5>
                    {/*<p id="canvas_holder" className="canvas_holder"><canvas className="visualizer" /></p>*/}
                    <div className="mediaButtons">
                        <CircleButton {...this.getCBS()} style={{paddingTop:'10px'}} clickFunction={this.handleRecord.bind(this)}><p className="fa fa-microphone"></p></CircleButton>
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
                    <button className="pill_btn" id="submit_recitation_btn" style={{cursor:'pointer'}} onClick={this.props.onHide}>Submit</button>
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
        if(audioRec.getRecording() !== null) {
            audioRec.play();
            var statusLabel = document.getElementById('statusLabel');
            statusLabel.innerHTML = 'Playing...';
            statusLabel.style.WebkitTransitionDuration = '0s';
            statusLabel.style.opacity = '1';
        }
    }

    handlePause() {
        audioRec.pause();
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = '';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';
    }

    handleStop() {
        audioRec.stop();
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = '';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';
    }

    handleClear() {
        audioRec.clear();
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = 'Cleared';
        statusLabel.style.WebkitTransitionDuration = '0s';
        statusLabel.style.opacity = '1';

        setTimeout(() => {
            statusLabel.style.WebkitTransitionDuration = '0.5s';
            statusLabel.style.opacity = '0';
            setTimeout(()=> {
                this.removeClearMessage();
            }, 500);
        }, 1000);
    }

    removeClearMessage() {
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = '';
    }

    stoppedPlaying() {
        var statusLabel = document.getElementById('statusLabel');
        statusLabel.innerHTML = '';
    }
}


export default UploadBox;
