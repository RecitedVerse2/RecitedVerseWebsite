
import React, { Component } from 'react';
import * as firebase from 'firebase';
import audioRec from 'au-audio-recorder';
import Alertify from 'alertify.js';


import emptyImage from '../res/empty.png';

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

import HomeHeader from '../components/HomePageComponents/HomeHeader';
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
            poemDescription:'',
            choseImage: false,
            isFileUpdate: true,
            isUpdateDone: false,

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
            height:'1000px',
            color:'white',
            backgroundColor:'#FAFAFA'
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'white',
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
          width: '100%',
          height: '30px',
          margin: 'auto',
          marginTop: '150px',
          paddingTop: '3px',
          textAlign: 'center',
          fontSize: '15px',
          borderRadius:'4px',
          backgroundColor:'#5cb85c'
        };
    }


    getUploadDivStyle() {
      return {
          width: '600px',
          height: '400px',
          margin: 'auto',
          marginTop: '100px',
          backgroundColor: 'white',
          boxShadow: '0 1px 8px 0 rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.12)',
      }
    }

    getUploadDiv2Style() {
      return {
          width: '800px',
          height: '800px',
          margin: 'auto',
          marginTop: '100px',
          backgroundColor: 'white',
          boxShadow: '0 1px 8px 0 rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.12)',
          fontFamily: 'Roboto',
      }
    }

    getUploadH1Style() {
      return {
         paddingTop:'50px',
         color: '#757575',
         fontFamily: 'Roboto',
         lineHeight: '62px',
         fontWeight: '400',
      }
    }

    getUploadH2Style() {
      return {
         paddingTop:'50px',
         color: 'black',
         fontFamily: 'Roboto',
      }
    }

    getUploadButtonDivStyle() {
      return {
          width: '200px',
          margin: 'auto',
      }
    }

   getRecordingStyle() {
     return{
       background:'white',
       paddingTop:'10px'

     }
   }

   getRecordingH2Style() {
     return{
       paddingTop:'10px',
       color:'black',
       fontSize:'12px',
       cursor: 'pointer',
       textAlign: 'center',
       marginTop: '5px',
       backgroundColor: 'rgb(92, 184, 92)',
       borderRadius: '4px',
       fontSize: '15px',
       paddingTop: '6px',
       height: '30px',

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
         backgroundColor: 'rgb(92, 184, 92)'
       };
   }

   getButtonTDDivStyle(){
     return{
       width:'30px',
       color:'black'
     }

   }

   getUploadInfoDivStyle() {
     return {
       marginTop:'40px',
       backgroundColor:'black'
     }
   }

   getUploadLeftInfoDivStyle(){
     return {
       marginTop: '20px',
       float: 'left',
       width: '300px',
       marginLeft: '80px',
       backgroundColor:'yellow'
     }
   }

   getUploadRightInfoDivStyle(){
     return {
       float: 'left',
       width: '300px',
       backgroundColor:'grey',

       padding:'20px 20px 20px 20px',
     }
   }

   getEmptyImageStyle(){
     return {
        position: 'absolute',
        height: '200px',
        width: '200px',
        marginLeft: '20px'

     }
   }

   getUploadImageButtonStyle(){
     return{
       position:'absolute',
       marginTop: '140px',
       marginLeft:'60px',
       width:'130px',
       textAlign: 'center',
       fontSize: '12px',
       borderRadius:'4px',
     }
   }

   GalleryButtonStyle(){
     return{
       position:'absolute',
       marginTop: '220px',
       marginLeft:'50px',

     }
   }

   getDownArrowStyle(){
     return {
       color: 'black',
       paddingTop:'10px',
       paddingLeft: '0px',
       position:'relative',
       width: '100px'
     }
   }

 getPTagStyle(){
   return{
     fontWeight: 'bold',
     color:'white'
   }
 }

 submitButtonStyle(){
   return{
     marginLeft:'40px'
   }
 }

 cancelButtonStyle(){
   return{
      marginLeft:'40px'
   }
 }

 getSubmitDivStyle(){
   return{
     marginTop:'20px'
   }
 }

 getInputImageStyle(){
   return{
      display: 'none'
   }
 }

 getStatusLabelStyle(){
   return{
     color: "red",
     padding:'10px 30px  20 px',
     backgroundColor: 'black',
     marginLeft: '50px',
   }
 }


   getRecodingButtonsHtml() {

         return(
          <div style={this.getUploadDivStyle()}>
           <div style={this.getRecodingDivStyle()}>
               <h2 style={{fontFamily: 'Roboto', color: 'black'}}>Create Your Recording</h2>

               <div style={this.getRecodingButtonsDivStyle()}>
               <table>
               <tr>
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
                       onClick={this.recordDone.bind(this)}>Continue</button>

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
                       formButtonId='fromFileBtn'
                       formButtonClass='pill_btn' name='fileRecitation'
                       accept='audio/*' multiple='false'
                       fileSelectedHandler={(e)=>{this.uploadAudioFile(e)}}>
           Upload Audio Record
       </FileChooserForm>

         <h2 style={this.getRecordingH2Style()}  onClick={this.recordNow.bind(this)}   >Record Now</h2>


       </div>
       </div>
     )
   }

   getFormAfterUpdate(){
     return(
       <div style={this.getUploadDiv2Style()}>
        <h1 style={this.getUploadH2Style()}>Poem/Excerpt Details</h1>
       <div style={this.getUploadInfoDivStyle()} >

          <div style={this.getUploadLeftInfoDivStyle()}  >

          <img style={this.getEmptyImageStyle()} src={emptyImage}  ref={(img)=>{this.poemImage= img}}  ></img>

          <FileChooserForm formButtonStyle={this.getUploadImageButtonStyle()}
                          ref={(FileChooserForm)=>{this.addPhotoBtn = FileChooserForm}}
                          formButtonId='addPhotoBtn'
                          formButtonClass='pill_btn' name='recImageFile'
                          accept='image' multiple='false'
                          fileSelectedHandler={(e)=>{this.uploadRecitationImage(e)}}>
            Select Default Image
          </FileChooserForm>

          <button type="button" style={this.GalleryButtonStyle()}  onClick={this.RandomGallery.bind(this)} className="btn btn-success">Select Default Image</button>

          </div>
            <div  style={this.getUploadRightInfoDivStyle()} >
             <label className="control-label col-sm-2" >Poem:</label><br/>
             <div >
               <input type="email" className="form-control"  placeholder="Enter Title" ref={(input)=>{this.poemField = input}} ></input>
             </div>

             <label className="control-label col-sm-2" >Poet:</label><br/>
             <div >
               <input type="email" className="form-control"  placeholder="Enter Author" ref={(input)=>{this.poetField = input}}  ></input>
             </div>


             <label className="control-label col-sm-2" >Genre:</label><br/>
             <div >
               <input type="email" className="form-control"  placeholder="Enter Title" ref={(input)=>{this.genreField = input}} ></input>
             </div>
              <label className="control-label col-sm-2" >Transcript:</label><br/>
             <div >
               <textarea rows="4" cols="50" className="form-control" id="email" placeholder="Enter Description & Poem Transcript"  ref={(textarea)=>{this.transcriptField = textarea}}  ></textarea>
             </div>

  <div className="checkbox">
  <p style={this.getPTagStyle()} >This is a recording of a work of poetry that is either in the
public domain (published before 1923) or I am its author and authorize its circulation as written and
recorded text on the Recited Verse archive</p>
  <label><input type="checkbox" name="remember" ref={(input)=>{this.copyRightField = input}} ></input> Yes, I agree.</label>

 <div  style={this.getSubmitDivStyle()}>
  <p style={this.getStatusLabelStyle()} ref={(p)=>{this.statusLabel = p}}></p>
  <button type="button" style={this.cancelButtonStyle()}  onClick={this.cancel.bind(this)} className="btn btn-success">Cancel</button>
  <button type="button" style={this.submitButtonStyle()} onClick={this.handleSubmit.bind(this)} className ="btn btn-success">Submit</button>
  </div>


</div>








             </div>




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

     if(this.state.isUpdateDone == true){
       loadDiv = this.getFormAfterUpdate();
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

    cancel(){
      alert(this.poemImage.src)

    }

    RandomGallery(){
          const randIndex = Math.floor( (Math.random() * 8) + 1);
          //  1 ---  8 storage in firebase
          var url = 'https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2Frand' + randIndex +'.jpg?alt=media'
          this.poemImage.src = url;
          this.setState({ choseImage: true });
    }

    uploadRecitationImage(e) {
        this.poemImage.src = e;
        this.setState({ choseImage: true });
    };

    recordDone(){
        this.setState({ isUpdateDone: true });
    }
    uploadAudioFile(e) {

        var aud = new Audio();
        aud.src = e;
        this.setState({
            audioObj:aud
        });
        this.setState({ isUpdateDone: true });

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

        if(! this.copyRightField.checked){
           missingInfo += "Plase check the box \"Yes I know\", to make sure your recording does not violate copyright law.";

          Alertify.alert(missingInfo);

            return;
        }else{
          this.statusLabel.innerHTML = "";
        }

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
          const randIndex = Math.floor( (Math.random() * 8) + 1);
          //  1 ---  8 storage in firebase
          var url = 'https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2Frand' + randIndex +'.jpg?alt=media'


            this.poemImage.src = url;
        }

        if( (this.valueExists(this.state.audioObj) || finalRecording !== null) && this.valueExists(poemName.value) && this.valueExists(poemAuthor.value)
        && this.valueExists(poemGenre.value) && this.valueExists(poemWrittenText.value)) {

            // Create a dictionary object for the audio.
            // Save that dictionary to the Firebase database.
            // Save the audio to the Firebase storage.
            // Return from this method.
            var fp = fireRef.child("Recitations").push();


            var cUser = JSON.parse(window.localStorage.getItem('currentUser'));

            /* Create dictionary for the recitation. */
            var dictionary = {
                "id":fp.key,
                "uploaderID":store.currentUser.userID,
                "uploaderName":store.currentUser.fullname,
                "title":poemName.value,
                "author":poemAuthor.value,
                "genre":poemGenre.value,
                "text":poemWrittenText.value,
                "Published":"unkown",
                "image":this.poemImage.src,
                "recited_by": store.currentUser.fullname,
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
            if(audioRec.isFinished() === true && this.statusLabel) {
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
