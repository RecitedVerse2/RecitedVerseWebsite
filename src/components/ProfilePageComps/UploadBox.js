import React, { Component } from 'react';
import ReactModal from 'react-modal';

// The box for uploading recitations.
class UploadBox extends Component {

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/
    getModalOverlayStyle() {
        return {
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
            <ReactModal style={{overlay:this.getModalOverlayStyle(),content:this.getModalContentStyle()}} isOpen={this.props.shouldShow} contentLabel='Upload Recitation'>
                <div style={{width:'100%',display:'table'}}>
                    <div style={{paddingLeft:'35px',display:'table-cell',width:'95%'}}>
                        <h2>Upload Recitation</h2>
                    </div>
                    <div style={{display:'table-cell', width:'5%'}}>
                        <button onClick={this.props.shouldClose} style={{position:'relative',top:'-20px',fontSize:'20px',border:'none',backgroundColor:'rgba(0,0,0,0)',backgroundImage: 'none',outline: '0',WebkitBoxShadow: 'none',boxShadow: 'none',cursor:'pointer'}}>x</button>
                    </div>
                </div>
                <br/>

                <h5>Poem Name: <input type="text" placeholder="Enter the name of the poem"/> </h5>
                <h5>Author: <input type="text" placeholder="Enter the author's name"/> </h5>
                <h5>Recited By: <input type="text" placeholder="Enter the reciter's name"/> </h5>
                <h5>Published: <input type="text" placeholder="Year of publication"/> </h5>
                <h5>Genre: <input type="text" placeholder="Enter the genre of the poem"/> </h5>
                <h5>Written Text: </h5>
                <textarea rows="15" cols="35"></textarea>
                <h5>Description (Optional): </h5>
                <textarea rows="5" cols="30"></textarea>
                <h5>Image (Optional):</h5>
                <img width="200px" height="200px" src="https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FEmptyPhoto.png?alt=media&token=ce1a33f5-f1d6-4f22-a6f8-8ab40cbd5c83" alt="poem_photo"/>
                <br/><br/>

            </ReactModal>
        );
    }
}


export default UploadBox
