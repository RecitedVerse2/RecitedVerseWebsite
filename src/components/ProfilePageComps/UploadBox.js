import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import _ from '../../css/UploadBox.css';


// The box for uploading recitations.
class UploadBox extends Component {

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
                    <img width="200px" height="200px" src="https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FEmptyPhoto.png?alt=media&token=ce1a33f5-f1d6-4f22-a6f8-8ab40cbd5c83" alt="poem_photo"/>
                    <br/><br/>

                    <form style={{textAlign: 'center'}}>
                        <input type="file" name="recImage" id="recImageFile" className="inputfile" accept="image/x-png" multiple="false" />
                        <label id="addPhotoBtn" className="pill_btn" htmlFor="recImageFile">Add Photo</label>
                    </form>
                    <br />
                    <h5 className="page_text">Upload a recording from a file</h5>
                    <form style={{textAlign: 'center'}}>
                        <input type="file" name="fileRec" id="fileRecitation" className="inputfile" accept="audio/x-mpeg" multiple="false" />
                        <label id="fromFileBtn" className="pill_btn" htmlFor="fileRecitation">Upload</label>
                        <p id="filenameLabel" style={{color: 'limegreen'}} />
                    </form>
                    <p className="page_text">Or</p>
                    <h5 className="page_text">Record a recitation here.</h5>
                    <p id="canvas_holder" className="canvas_holder"><canvas className="visualizer" /></p>
                    <div className="mediaButtons">
                        <button id="recordBtn" className="roundBtn fa fa-microphone"/>
                        <button id="stopRecBtn" className="roundBtn fa fa-stop-circle-o" />
                        <button id="playAudioBtn" className="roundBtn fa fa-play" />
                        <button id="pauseBtn" className="roundBtn fa fa-pause" />
                        <button id="stopBtn" className="roundBtn fa fa-stop" />
                        <button id="clearBtn" className="roundBtn fa fa-trash" />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="pill_btn" id="submit_recitation_btn" style={{cursor:'pointer'}} onClick={this.props.onHide}>Submit</button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default UploadBox;
