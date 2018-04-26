
import React, { Component } from 'react';
import * as firebase from 'firebase';
import audioRec from 'au-audio-recorder';
import Alertify from 'alertify.js';

// eslint-disable-next-line
import _ from '../css/UploadBox.css';


import randImage1 from '../res/rand1.jpg';
import randImage2 from '../res/rand2.jpg';
import randImage3 from '../res/rand3.jpg';
import randImage4 from '../res/rand4.jpg';
import randImage5 from '../res/rand5.jpg';
import randImage6 from '../res/rand6.jpg';
import randImage7 from '../res/rand7.jpg';
import randImage8 from '../res/rand8.jpg';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import HomeHeader from '../components/HomePageComponents/HomeHeader';

import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import FileChooserForm from '../components/FileChooserForm';
import Clock from '../components/Clock';
import { Button } from 'react-bootstrap';

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
            poemDescription:'',
            choseImage: false,
            isFileUpdate: true,
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
            backgroundColor:'white'
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'blue',
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
            fontFamily:'Roboto',
            textAlign: 'center',
            background: 'none',
            border: 'none',
            outline: 'none',
            textDecoration: 'none'
        };
    }
    getFormButtonStyle2() {
        return {
          width: '100%',
          height: '30px',
          margin: 'auto',
          marginTop: '150px',
          paddingTop: '3px',
          textAlign: 'center',
          fontSize: '15px',
          borderRadius:'10px'
        };
    }


    getUploadDivStyle() {
      return {
          width: '600px',
          height: '400px',
          margin: 'auto',
          marginTop: '80px',
          backgroundColor: '#FAFAFA'
      }
    }

    getUploadH1Style() {
      return {
         paddingTop:'50px',
         color: 'black',
         fontFamily: 'Roboto',
      }
    }

    getUploadButtonDivStyle() {
      return {
          width: '160px',
          margin: 'auto',
      }
    }

   getRecordingStyle() {
     return{
       background:'blue',
       paddingTop:'10px'

     }
   }

   getRecordingH2Style() {
     return{
       paddingTop:'10px',
       marginLeft:'80px',
       color:'black',
       fontSize:'12px',
       cursor: 'pointer'

     }
   }
   getRecodingDivStyle(){
     return{
        margin: 'auto',
        paddingTop: '60px',
        width: '300px',

     }
   }

   getRecodingButtonsDivStyle() {
       return {
         width: '220px',
         paddingTop: '30px',
         margin: 'auto',

       };
   }

   getRecoding2ButtonsDivStyle() {
       return {
         width: '80px',
         margin: 'auto',

       };
   }

   getRecodingDoneButtonStyle() {
       return {
         width: '100%',
         height: '30px',
         margin: 'auto',
         marginTop: '50px',
         paddingTop: '3px',
         textAlign: 'center',
         fontSize: '15px',
         borderRadius:'10px',
         backgroundColor:'grey'
       };
   }

   getButtonTDDivStyle(){
     return{
       width:'30px'
     }

   }

   getButtonTDDivStyle(){
     return{
     }

   }

   getRecodingButtonsHtml() {

         return(
          <div style={this.getUploadDivStyle()}>
           <div style={this.getRecodingDivStyle()}>
               <h1 className='recordTitle'>Record a poem</h1>

               <div style={this.getRecodingButtonsDivStyle()}>
               <table><tr>
               <td style={this.getButtonTDDivStyle()}><button onClick={this.handleRecord.bind(this)} ref={(button)=>{this.recordBtn = button}} className='recordingButtons fa fa-microphone'></button></td>
              <td style={this.getButtonTDDivStyle()} ><button onClick={this.handleStop.bind(this)} ref={(button)=>{this.stopBtn = button}} className='recordingButtons fa fa-stop'></button></td>

               <td style={this.getButtonTDDivStyle()} ><button onClick={this.handlePlay.bind(this)} ref={(button)=>{this.playBtn = button}} className='recordingButtons fa fa-play'></button></td>
               <td style={this.getButtonTDDivStyle()} ><button onClick={this.handlePause.bind(this)} ref={(button)=>{this.pauseBtn = button}} className='recordingButtons fa fa-pause'></button></td>

               <td style={this.getButtonTDDivStyle()} ><button onClick={this.handleClear.bind(this)} ref={(button)=>{this.clearBtn = button}} className='recordingButtons fa fa-trash'></button></td>

               </tr>
                <tr>
    <td style={this.getButtonTDDivStyle()} >record</td>
    <td style={this.getButtonTDDivStyle()} >stop</td>
    <td style={this.getButtonTDDivStyle()} >play</td>
    <td style={this.getButtonTDDivStyle()} >pause</td>
    <td style={this.getButtonTDDivStyle()}>clear</td>
                </tr>
               </table>
               </div>

               <p ref={(p)=>{this.statusLabel = p}}></p>

               <button  style={this.getRecodingDoneButtonStyle()}
                       ref={(button)=>{this.submitBtn = button}}
                       onClick={this.handleSubmit.bind(this)}>Done</button>

           </div>
            </div>
         )



   }

   getLoadFileFormHtml(){
     return(
       <div style={this.getUploadDivStyle()}>
        <h1 style={this.getUploadH1Style()}>Upload Recording</h1>
       <div style={this.getUploadButtonDivStyle()} >
       <FileChooserForm formButtonStyle={this.getFormButtonStyle2()}
                       ref={(FileChooserForm)=>{this.fromFileBtn = FileChooserForm}}
                       formButtonId='btn btn-default'
                       formButtonClass='pill_btn' name='fileRecitation'
                       accept='audio/*' multiple='false'
                       fileSelectedHandler={(e)=>{this.uploadAudioFile(e)}}>
           Upload
       </FileChooserForm>
       or
        <Button onClick={this.recordNow.bind(this)}>Record Now</Button>


       </div>
       </div>
     )
   }

    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {

     var loadDiv = "";
     if(this.state.isFileUpdate){
       loadDiv = this.getLoadFileFormHtml()
     }else{
       loadDiv = this.getRecodingButtonsHtml();
     }




        return (
            <div style={this.getStyles()}>
                <Clock onupdate={this.handleStopPlaying.bind(this)}></Clock>

                {/* Header and Background stuff. */}
                <HomeHeader nav={this.props.nav} rStore={this.props.rStore}></HomeHeader>



                        {loadDiv}




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

        this.setState({ choseImage: true });
    };

    uploadAudioFile(e) {
        var aud = new Audio();
        aud.src = e;
        this.setState({
            audioObj:aud
        });
        alert("upload done")
    }

    recordNow(){
      this.setState({ isFileUpdate: false });
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
            this.setState({ recodingStatus: 1 });
        } else {
            this.recordBtn.className = 'recordingButtons fa fa-microphone';
            this.handleEndRecord();
            this.setState({ recodingStatus: 1 });
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
            alert("I am first")
            return;
        } else if(audioRec.getRecording() !== null) {
            audioRec.stop();
            this.statusLabel.innerHTML = '';
            this.statusLabel.style.WebkitTransitionDuration = '0s';
            this.statusLabel.style.opacity = '1';

            this.recordBtn.className = 'recordingButtons fa fa-microphone';
            this.handleEndRecord();
            this.setState({ recodingStatus: 1 });


            return;
        } else {
            this.statusLabel.innerHTML = '';
            this.statusLabel.style.WebkitTransitionDuration = '0s';
            this.statusLabel.style.opacity = '1';

            this.recordBtn.className = 'recordingButtons fa fa-microphone';
            this.handleEndRecord();
            this.setState({ recodingStatus: 1 });

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

        // Select a random image if choseImage is false
        if(this.state.choseImage === false) {
            const images = [randImage1, randImage2, randImage3, randImage4, randImage5,
                            randImage6, randImage7, randImage8];
            const randIndex = Math.floor( (Math.random() * 8) + 1);

            this.poemImage.src = images[randIndex];
        }

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
                    document.body.scrollTop = 0;
                    this.props.nav.goTo('home')
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
                    document.body.scrollTop = 0;
                    this.props.nav.goTo('home')
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
