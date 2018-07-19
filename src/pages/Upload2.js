
import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';
import Select from 'react-select';

import { confirmAlert } from 'react-confirm-alert'; // Import
import IsUserFirst from './IsUserFirst';
import '../css/react-confirm-alert.css'


import emptyImage from '../res/empty.png';

// eslint-disable-next-line
import _ from '../css/UploadBox.css';




// import randImage1 from '../res/rand1.jpg';
// import randImage2 from '../res/rand2.jpg';
// import randImage3 from '../res/rand3.jpg';
// import randImage4 from '../res/rand4.jpg';
// import randImage5 from '../res/rand5.jpg';
// import randImage6 from '../res/rand6.jpg';
// import randImage7 from '../res/rand7.jpg';
// import randImage8 from '../res/rand8.jpg';

import HomeHeader from '../components/HomePageComponents/HomeHeader';
import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import FileChooserForm from '../components/FileChooserForm';
import Clock from '../components/Clock';
import 'react-select/dist/react-select.css';
import { base } from '../objects/config';


var audioRec = require('../au-audio-recorder/src/AUAudioRecorderIndex.js');

const GallerySize = 40;  // 1 -8 so it is 8


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
            multiValue: [],
            multi: true,
            options: [
              { value: 'R', label: 'Red' },
              { value: 'G', label: 'Green' },
              { value: 'B', label: 'Blue' }
            ],
            value: undefined,
            titles: [],
            authors: [],

            fullWork: true,
            nameOfCompleteWork: '',
            translation: false,
            translator: '',
            transcript: '',

        }

        this.func123 = this.showReminder.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.updateValueTitle = this.updateValueTitle.bind(this);
        this.onInputChangeToUpperCase = this.onInputChangeToUpperCase.bind(this);

    }

    handleInputChange(event) {

      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      if(target.id === "fullworkName"){
        var newValue = this.toTitleCase(target.value)
        this.setState({
          [name]: newValue
        });
      }else{
        this.setState({
          [name]: value
        });
      }


    }

    showReminder(event){
      //alert("this is a test")
      event.preventDefault();
      this.beforeUpload()

    }

    onInputChangeToUpperCase(newValue){
      newValue = this.toTitleCase(newValue)
      return newValue
    }


    updateValue (newValue) {
      this.setState({
        author: newValue,
      });
    }

    toTitleCase(str) {
      if(str == null) return ""
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

      updateValueTitle (newValue) {
        // this.setState({
        //   title: "newValue",
        // });

        this.state.titles.map((title) => {

          var upperValue = this.toTitleCase(title.label)
          console.log(upperValue + "   compare  " + newValue +"----" +" ---"+title.author);
          if(upperValue === newValue && title.transcript && title.author){
            this.setState({title: newValue, transcript: title.transcript, author: title.author })
          }
        })

        this.setState({
          title: newValue,
        });
      }

    componentDidMount() {

        audioRec.requestPermission();
        document.getElementById("fromFileBtn").addEventListener("click", this.func123);


      //   document.getElementById("fromFileBtn").addEventListener("click", function(event){
      //    alert("this is a test")
      //    event.preventDefault()
      // });
      if (navigator.userAgent.indexOf("Chrome") !== -1){
      }else{

        confirmAlert({
          title: 'Warning',
          message: 'Only Chrome browser supports Upload.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {

              }
            },
          ]
        })

      }

      let tags = [];
      // fetch tags
      base.fetch('/tags', {
        context: this,
        asArray: true,
        then(data){
          data.map((tag) => {
            tags.push(tag.option);
          })
        }
      })
      this.setState({options: tags});

      // fetch all the titles of poems
      base.fetch('/Recitations', {
        context: this,
        asArray: true,
        then(recitations){
          let allTitles = recitations.map((recitation) => {
            return {
              value: recitation.title,
              label: recitation.title,
              transcript: recitation.text,
              author: recitation.author,
            };

          });

          let originalTitles = recitations.map((recitation) => {
            return {
              value: recitation.title,
              label: recitation.title,
              transcript: recitation.text,
              author: recitation.author,
            };

          });

          let allAuthors = recitations.map((recitation) => {
            return {
              value: recitation.author,
              label:  recitation.author,
            }
          })

          this.setState({titles: allTitles, authors: allAuthors, originalTitles});
        }
      })




  }

    handleOnChange(value){
      const { multi } = this.state;
        if (multi) {
          this.setState({ multiValue: value });
        } else {
          this.setState({ value });
        }
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
          height: '900px',
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
          width: '220px',
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
     marginLeft:'80px',
     width: '100px'

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


 getConvertLinkStyle(){
   return{
     marginTop:'40px',


     fontSize:'12px',
     cursor: 'pointer',
     textAlign: 'center',


     fontSize: '12px',

   }
 }


   getRecodingButtonsHtml() {

         return(
          <div style={this.getUploadDivStyle()}>
           <div style={this.getRecodingDivStyle()}>
               <h2 style={{fontFamily: 'Roboto', color: 'black'}}>Create Your Recording</h2>

               <div style={this.getRecodingButtonsDivStyle()}>
               <table>
               <tbody>
               <tr>
               <td style={this.getButtonTDDivStyle()}><button onClick={this.handleRecord.bind(this)} ref={(button)=>{this.recordBtn = button}} className='recordingButtons fa fa-microphone'></button></td>
              <td style={this.getButtonTDDivStyle()} ><button onClick={this.handleStop.bind(this)} ref={(button)=>{this.stopBtn = button}} className='recordingButtons fa fa-stop'></button></td>

               <td style={this.getButtonTDDivStyle()} ><button onClick={this.handlePlay.bind(this)} ref={(button)=>{this.playBtn = button}} className='recordingButtons fa fa-play'></button></td>
               <td style={this.getButtonTDDivStyle()} ><button onClick={this.handlePause.bind(this)} ref={(button)=>{this.pauseBtn = button}} className='recordingButtons fa fa-pause'></button></td>

               <td style={this.getButtonTDDivStyle()} ><button onClick={this.handleClear.bind(this)} ref={(button)=>{this.clearBtn = button}} className='recordingButtons fa fa-trash'></button></td>

               </tr>
               </tbody>
               <tbody>
                <tr>
    <td style={this.getButtonTDDivStyle()} >record</td>
    <td style={this.getButtonTDDivStyle()} >stop</td>
    <td style={this.getButtonTDDivStyle()} >play</td>
    <td style={this.getButtonTDDivStyle()} >pause</td>
    <td style={this.getButtonTDDivStyle()}>clear</td>
                </tr>
                </tbody>
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
                       accept='audio/mpeg' multiple='false'
                       beforeUploadHandler={(e)=>{this.beforeUpload(e)}}
                       fileSelectedHandler={(e)=>{this.uploadAudioFile(e)}}>
           Upload mp3 Audio Recording
       </FileChooserForm>

         <h2 style={this.getRecordingH2Style()}  onClick={this.recordNow.bind(this)}   >Record Now</h2>

         <div style={this.getConvertLinkStyle()}><a  href="https://online-audio-converter.com" target = "_blank">convert audio file to mp3 file</a></div>

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
            Upload Cover Image
          </FileChooserForm>

          <button type="button" style={this.GalleryButtonStyle()}  onClick={this.RandomGallery.bind(this)} className="btn btn-success">Select Default Image</button>

          </div>
            <div  style={this.getUploadRightInfoDivStyle()} >
             <label className="control-label col-sm-2" >Poem:</label><br/>
             <div>
               {/* <input type="email" className="form-control"  placeholder="Enter Title" ref={(input)=>{this.poemField = input}} ></input> */}
               <Select.Creatable
                id="state-select"
                options={this.state.titles}
                simpleValue
                clearable={true}
                name="selected-state"
                placeholder="Enter Title"
                disabled={false}
                searchable={true}
                value={this.state.title}
                onInputChange={this.onInputChangeToUpperCase}
                onChange={this.updateValueTitle}
              />
              {/* <IsUserFirst title={this.state.title} originalTitles={this.state.originalTitles}  /> */}
              <div style={{display: 'inline'}}>
              <input defaultChecked="true" id="fullwork" type="checkbox" className="form-control" name="fullWork" value={this.state.fullWork}  onChange={this.handleInputChange} ></input>
               <label >Is this a Complete Work?{this.state.title}</label>
               </div>
               {this.state.fullWork === false &&
                  <input id="fullworkName" className="form-control" type="text" placeholder="Name of Completed Work" name="nameOfCompleteWork" value={this.state.nameOfCompleteWork} onChange={this.handleInputChange}></input>
                }
             </div>
             <div>
             <input  type="checkbox" className="form-control" name="translation" value={this.state.translation} onChange={this.handleInputChange} ></input>
               <label>Is this a Translation?</label>
               </div>
               {this.state.translation === true &&
                  <input className="form-control" type="text" placeholder="Name of Translator" name="translator" value={this.state.translator} onChange={this.handleInputChange}></input>
                }


             <label className="control-label col-sm-2" >Poet:</label><br/>
             <div >
               {/* <input type="email" className="form-control"  placeholder="Enter Author" ref={(input)=>{this.poetField = input}}  ></input> */}
               <Select.Creatable
                id="state-select2"
                options={this.state.authors}
                simpleValue
                placeholder="Enter Author"
                clearable={true}
                name="selected-state"
                disabled={false}
                searchable={true}
                value={this.state.author}
                onInputChange={this.onInputChangeToUpperCase}
                onChange={this.updateValue}
              />
             </div>


             <label className="control-label col-sm-2" >Tags:</label><br/>
             <div >
               {/* <input type="email" className="form-control"  placeholder="Enter Tags" ref={(input)=>{this.genreField = input}} ></input> */}
               <Select.Creatable
                multi={this.state.multi}
                options={this.state.options}
                onChange={this.handleOnChange}
                value={this.state.multi ? this.state.multiValue : this.state.value}
              />
             </div>
              <label className="control-label col-sm-2" >Transcript:</label><br/>
             <div >
               <textarea rows="4" cols="50" className="form-control" id="email" placeholder="Enter Description & Poem Transcript" onChange={(event) => this.setState({transcript: event.target.value})}  value={this.state.transcript}  ></textarea>
             </div>

  <div className="checkbox">
  <p style={this.getPTagStyle()} >This is a recording of a work of poetry that is either in the
public domain (published before 1923) or I am its author and authorize its circulation as written and
recorded text on the Recited Verse archive</p>
  <label><input type="checkbox" name="remember" ref={(input)=>{this.copyRightField = input}} ></input> Yes, I agree.</label>

 <div  style={this.getSubmitDivStyle()}>
  <p style={this.getStatusLabelStyle()} ref={(p)=>{this.statusLabel = p}}></p>

  <button type="button" style={this.submitButtonStyle()} onClick={this.handleSubmit.bind(this)} className ="btn btn-success">Submit</button>
  </div>


</div>








             </div>




       </div>
       </div>
     )
   }



   beforeUpload = () => {


    confirmAlert({
      title: 'Reminders',
      message: '(1) Each recording must begin by stating the poem\'s title and author (even if you are its author): "Sonnet 29\' by William Shakespeare . . ."\n(2) Each poem must be either published before 1923 (open access in the public domain) or your own original poetry that you authorize to be circulated in the Recited Verse archive. ',
      buttons: [
        {
          label: 'I Understand',
          onClick: () => {


              document.getElementById("fromFileBtn").removeEventListener('click', this.func123, false);

          //  document.getElementById("fromFileBtn").removeEventListener("check", (event)=>this.showReminder(event));
          }
        },
        // {
        //   label: 'No',
        //   onClick: () => alert('Click No')
        // }
      ]
    })
  }

    submitForRecordNow = () => {

      if (navigator.userAgent.indexOf("Chrome") !== -1){
        confirmAlert({
          title: 'Reminders',
          message: '(1) Each recording must begin by stating the poem\'s title and author (even if you are its author): "Sonnet 29\' by William Shakespeare . . ."\n(2) Each poem must be either published before 1923 (open access in the public domain) or your own original poetry that you authorize to be circulated in the Recited Verse archive. ',
          buttons: [
            {
              label: 'I Understand',
              onClick: () => {
                this.setState({ isFileUpdate: false });
              }
            },
            // {
            //   label: 'No',
            //   onClick: () => alert('Click No')
            // }
          ]
        })

      } else {
        confirmAlert({
          title: 'Warning',
          message: 'Only Chrome browser supports Record Now function.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {

              }
            },

          ]
        })

      }


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


    }

    RandomGallery(){
          const randIndex = Math.floor( (Math.random() * GallerySize) + 1);
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
      this.submitForRecordNow()

      //this.setState({ isFileUpdate: false });
    }

    /**********************
    *                     *
    *    AUDIO RECORDER   *
    *                     *
    ***********************/



    handleRecord() {
        var statusLabel = this.statusLabel;
        if(!this.recordBtn.className.includes('fa-microphone-slash')) {
            this.audioStart = true;
            this.start = Date.now();
            console.log("startRecording");
            console.log(audioRec);

            audioRec.startRecording();
            console.log(audioRec);
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
        if(this.audioStart == true){
          this.end =  Date.now()
          this.audioStart  = false;
        }

        var duration = (this.end - this.start)/1000;
        statusLabel.innerHTML =  duration + ' seconds audio is recorded';
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
      var myRecording = audioRec.getRecordingFile();
       var formData = new FormData();
      formData.append("record", myRecording);



       fetch('http://127.0.0.1:8000/test.php', {
       method: 'POST',
      // headers: {'Content-Type':'multipart/form-data'},
       body: formData
     }).then((res) => {
alert(res)
       })
    .catch((err) => {console.log(err)})

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

        //upload tags
        this.state.multiValue.map((option) => {

          base.push('tags', {
            data: {option},
            then(err){
              if(!err){
                console.log('uploaded tag');
              }
            }
          });

        })

        let genre = '';
        this.state.multiValue.map((option) => {
          if(genre.length == 0){
            genre = option.value;
          }else{
              genre += " " + option.value;
          }
        })



        var finalRecording = audioRec.getRecording();

        const fireRef = firebase.database().ref();
        const storageRef = firebase.storage().ref();
        const store = this.props.rStore.getState();

        var poemName = this.state.title;
        var poemAuthor = this.state.author;
        var poemRecitedBy = this.recitedByField;
        var poemPublished = this.publishedField;

        var poemGenre = genre;
        var poemWrittenText = this.state.transcript;
        var poemDescription = this.descriptionField;



        // Select a random image if choseImage is false
        if(this.state.choseImage === false) {
          const randIndex = Math.floor( (Math.random() * GallerySize) + 1);
          //  1 ---  8 storage in firebase
          var url = 'https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2Frand' + randIndex +'.jpg?alt=media'


            this.poemImage.src = url;
        }

        if( (this.valueExists(this.state.audioObj) || finalRecording !== null)
        ) {

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
                "title":poemName,
                "author":poemAuthor,
                "genre": genre,
                "text": this.state.transcript,
                "Published":"unkown",
                "image":this.poemImage.src,
                "recited_by": store.currentUser.fullname,
                "plays":0,
                "likes":0,
                "favorites":0,
                "comments":[],
                "timestamp":Date.now(),
                "translator": this.state.translator,
                "nameOfCompleteWork": this.state.nameOfCompleteWork,
            };



            //audioRec.setOutputFileType("wav");
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
            missingInfo = "unknown error";
            if(!this.valueExists(this.state.audioObj) && finalRecording === null) {
               missingInfo = "You must upload or record a poem before submitting<br/>";
             }

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
