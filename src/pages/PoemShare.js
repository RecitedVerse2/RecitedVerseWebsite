import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

// eslint-disable-next-line
import _ from '../css/Poem.css';
// eslint-disable-next-line
import __ from '../css/Header.css';

import RVLogo from '../res/RV-Final-Icon.png';

import TwitterImage from '../res/twitter_share.png';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import Header from '../components/LandingComps/Header';


import Clock from '../components/Clock';

import Recitation from '../objects/Recitation';

import Comments from '../components/PoemPageComps/Comments';
import { Grid, Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { base } from '../objects/config';

class PoemShare extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            poemName:'...',
            poemAuthor:'...',
            recitedBy:'...',
            published:'----',
            genre:'...',
            uploaderName:'...',
            poemImage:'',
            poemTranscript:'',
            plays:0,
            likes:0,
            favorites:0,
            audio:null,
            deleteButton:<div></div>,
            show:false,
            backgroundColor:'rgba(0,0,0,0)',
            userInfo:'',
            comments: [],
            commentMessage: '',
        }


        const fireRef = firebase.database().ref();

        var url = window.location.href;
        var n = url.indexOf("share");
        var rid = url.substring(n+6);


        fireRef.child('Recitations').child(rid).once('value', (snap) => {

                        var record = snap.val();

                        var recObj = new Recitation( record.id,
                                                    record.uploaderID,
                                                    record.uploaderName,
                                                    record.image,
                                                    record.title,
                                                    record.author,
                                                    record.recited_by,
                                                    record.published,
                                                    record.genre,
                                                    record.description,
                                                    record.likes,
                                                    record.plays,
                                                    record.favorites,
                                                    record.text,
                                                    record.audio,
                                                    record.timestamp  );



                    var recStr = JSON.stringify(recObj)

                    window.sessionStorage.setItem('CurrentRecitation', recStr);

                    this.loadRecitationAudio();
                    var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

                    var d = new Date(recitation.timestamp);
                    var dateString = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();


                    this.setState({
                        poemName: recitation.title,
                        poemAuthor: recitation.author,
                        recitedBy: recitation.recitedBy,
                        published: recitation.published,
                        genre: recitation.genre,
                        uploaderName: recitation.uploaderName,
                        poemImage: recitation.image,
                        poemTranscript: recitation.text,
                        plays: recitation.plays,
                        likes: recitation.likes,
                        favorits: recitation.favorites,
                        date: dateString,
                        recitationId: recitation.id,
                    })


                   });

                   var cUser = JSON.parse(window.localStorage.getItem('currentUser'));
                   if(cUser){
                        window.location.href = '/poem';
                   }
    }

    componentDidMount() {



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
            height: '100%',
        };
    }
    getHeaderStyle() {
        return {
            position: 'fixed',
            top:'0px',
            left:'0xp',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: this.state.backgroundColor
        }
    }
    getLogoStyle() {
        return {
            position:'absolute',
            top:'0px',
            left:'20px',
            width:'80px',
            height:'90%',
            cursor:'pointer',
            marginTop:'5px',
            display:'table-cell'
        }
    }
    getButtonsSectionStyle() {
        return {
            position:'absolute',
            top:'0px',
            right:'0px',
            textAlign:'right',
            marginTop:'20px',
            display:'table-cell',
        }
    }
    getButtonsStyle() {
        return {
            textDecoration:'none',
            border:'none',
            background:'none',
            color:'white',
            fontFamily:'HelveticaNeue',
            fontSize:'14px',
            outline:'none'
        }
    }
    getOverlay() {
        return {
           backgroundImage: `url(${this.state.poemImage})`,
           height: '100%',
           zIndex: '999',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           backgroundSize: 'cover',
        }
    }

    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1'
        }
    }
    getBannerTextStyles() {
        return {
            position:'relative',
            top:'20px',
            color:'white',
            textAlign:'center',
            fontSize:'100px',
            fontFamily:'Monthoers'
        }
    }
    getBannerTextStyles2() {
        return {
            position:'relative',
            color:'white',
            textAlign:'center',
            fontSize:'70px',
            fontFamily:'Monthoers'
        }
    }
    getPlayLikeFavoriteInfo() {
        return {
            position:'relative',
            top:'50px',
            fontSize:'17px',
            fontFamily:'MyriadPro',
            display: 'inline-block'
        }
    }

    getPlayFont(){
      return {
        fontSize:'40px',
        paddingLeft:'5px',
        paddingRight:'30px',
      }
    }

    getPlayButtonSize(){
      return {
        marginTop:'0px',
        marginRight:'0px',
        width:'70px',

        height:'50px',

      }
    }

    getTextAreaStyle(){
      return{
        paddingTop:'30px',
      }
    }


    getUserAlinkStyle(){
      return{
        fontSize: '40px',
        color:'blue'
      }
    }

    getTranscriptStyles(){
        return {
            maxWidth: '300px',
            float: 'right',
        }
    }

    getTitleStyles(){
      return {
        padding:'10px, 10px, 10px, 10px',
        fontWeight:800

      }
    }




    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {

      var title = "Have you heard ‘" + this.state.poemName +"’ by " + this.state.poemAuthor + " @recitedverse   "
      var titleStr = encodeURIComponent(title);

      var share_url = 'https://twitter.com/intent/tweet?text='+ titleStr +'&url=https%3A%2F%2Frecitedverse.com/share?'+this.state.recitationId;


        return (
            <div style={this.getStyles()}>
                {/* The header area */}
                <Header nav={this.props.nav} rStore={this.props.rStore}></Header>

                {/* The background image */}

                <div style={this.getOverlay()}>


                {/* The div that shows the image. */}
                <div className='contentArea' >

                    <div className='verticalTextArea' style={this.getTextAreaStyle()}>
                       <h1 className='headerText'><strong>{this.state.poemName}</strong></h1>
                       <h1 className='headerText'>By <strong>{this.state.poemAuthor} </strong></h1>
                       <h1 className='headerText'>Genre: {this.state.genre}</h1>
                      <h1 className='headerText'>Date:  {this.state.date}</h1>
                  <a href={share_url} title="Twitter" > <img className="sharebutton" src={TwitterImage} alt="Snow"></img></a>

                        <h1 className='headerText'>Recited By:<a style={this.getUserAlinkStyle()} href="/login"  > {this.state.uploaderName}</a></h1>

                        <div style={{marginLeft:'10px'}}>
                            <button style={this.getPlayButtonSize()} className='interactButton fa fa-play'
                            ref={(button)=>{this.playBtn = button}}
                            onClick={this.playRecitation.bind(this)}>
                            &nbsp;&nbsp;
                            </button>  <span style={this.getPlayFont()}> {this.state.plays}  </span>

                          <button className='interactButton fa fa-heart' style={this.getPlayButtonSize()}
                                    ref={(button)=>{this.likeBtn = button}}
                                    onClick={this.likeRecitation.bind(this)}>

                                    </button>     <span style={this.getPlayFont()}> {this.state.likes} </span>
                          {/*  <button className='interactButton fa fa-heart'
                                    ref={(button)=>{this.favoriteBtn = button}}
                                    onClick={this.favoriteRecitation.bind(this)}></button>
                                    */}
                        </div>
                        <Grid>
                        <Row className="show-grid">
                            <Col md={8}>
                            <div style={{lineHeight: '2', fontWeight: '700' }}>
                            {this.state.poemTranscript}
                            </div>
                            </Col>
                            <Col md={4}>


                            </Col>
                        </Row>
                        </Grid>
                        {this.state.deleteButton}
                    </div>
                </div>


                {this.props.children}
                </div>
            </div>
        );
    }


    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    goToHomePage() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('home');
    }

    goToTranscript() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('transcript');
    }

    goToAccountSettings() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('accountsettings');
    }

    goToPRofile() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('profile');
    }

    stringify(element) {
        var cache = [];
        return JSON.stringify(element, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
    }


  likeRecitation(){

  }


favoriteRecitation() {
  alert("this is a test")
}








    /** Loads the audio that will be played. */
    loadRecitationAudio() {
        const rec = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        firebase.storage().ref().child('Recitations').child(rec.id).getDownloadURL().then( (url) => {
            var audio = new Audio(url);
            audio.loop = false;

            this.setState({
                audio: audio
            });
        });
    }


    /** RECITATION PLAYING/LIKING/FAVORITING */

    playRecitation() {

        const store = this.props.rStore.getState();
        const recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));
        this.setState({ plays: this.state.plays + 1 });

        this.props.rStore.dispatch({
            type:'UPDATE_PLAYCOUNT',
            shouldUpdatePlayCount: true
        });

        // If the button has a pause symbol, then just pause the store's audio object.
        if(this.playBtn.className.includes('pause')) {

            store.audio.pause();
            this.playBtn.className = 'interactButton fa fa-play';

        // If it does not have a pause sign...
        } else {

            // First set the audio if it is null. Then play it.
            if(store.audio === null) {
                this.props.rStore.dispatch({
                    type:'SET',
                    id: recitation.id,
                    uploaderID: recitation.uploaderID,
                    uploaderName: recitation.uploaderName,
                    image: recitation.image,
                    title: recitation.title,
                    author: recitation.author,
                    recitedBy: recitation.recitedBy,
                    published: recitation.published,
                    genre: recitation.genre,
                    description: recitation.description,
                    likes: recitation.likes,
                    plays: recitation.plays,
                    favorites: recitation.favorites,
                    text: recitation.text,
                    recitation: recitation.recitation,
                    audio: this.state.audio
                });
                store.audio.play();
                this.playBtn.className = 'interactButton fa fa-pause';
            }
            // Otherwise, if there is already an audio object.
            else {

                // If the recitation that you are looking at has the same src as the one in the store...
                if(store.audio.src === this.state.audio.src) {
                    store.audio.play();
                    this.playBtn.className = 'interactButton fa fa-pause';
                }
                // Otherwise, clear and play the new audio.
                else {
                    store.audio.pause();
                    this.props.rStore.dispatch({
                        type:'SET',
                        id: recitation.id,
                        uploaderID: recitation.uploaderID,
                        uploaderName: recitation.uploaderName,
                        image: recitation.image,
                        title: recitation.title,
                        author: recitation.author,
                        recitedBy: recitation.recitedBy,
                        published: recitation.published,
                        genre: recitation.genre,
                        description: recitation.description,
                        likes: recitation.likes,
                        plays: recitation.plays,
                        favorites: recitation.favorites,
                        text: recitation.text,
                        recitation: recitation.recitation,
                        audio: this.state.audio
                    });
                    store.audio.play();
                    this.playBtn.className = 'interactButton fa fa-pause';
                }

            }
        }
    }








}

export default PoemShare;
