import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

// eslint-disable-next-line
import _ from '../css/Poem.css';
// eslint-disable-next-line
import __ from '../css/Header.css';

import RVLogo from '../res/RV-Final-Icon.png';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import HomeHeader from '../components/HomePageComponents/HomeHeader';

import Clock from '../components/Clock';

import Recitation from '../objects/Recitation';

import Comments from '../components/PoemPageComps/Comments';
import { Grid, Row, Col } from 'react-bootstrap';

class Poem extends Component {

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
        }


    }

    componentDidMount() {
        const store = this.props.rStore.getState();
        var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        this.reloadData();
        this.loadRecitationAudio();



        // Button for deleting recitations
        if(store.currentUser !== null) {
            if(store.currentUser.userID === recitation.uploaderID) {
               var btn = <button className='deleteButton' onClick={this.handleDeleteRecitation.bind(this)}>
                                Delete Recitation
                        </button>

                this.setState({
                    deleteButton: btn
                });
            } else {
                this.setState({
                    deleteButton: <div></div>
                });
            }
        }




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
        })




   //    var user = firebase.database().ref("User/"+recitation.uploaderID).child()

       firebase.database().ref().child('Users').child(recitation.uploaderID).once('value', (snap) => {
           var user = snap.val();
           console.log(user);
           this.setState({userInfo:user});
});


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
        width:'50px',
        height:'30px',

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



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                {/* The header area */}
                <HomeHeader nav={this.props.nav} rStore={this.props.rStore}></HomeHeader>

                {/* The background image */}

                <div style={this.getOverlay()}>


                {/* The div that shows the image. */}
                <div className='contentArea' >

                    <div className='verticalTextArea' style={this.getTextAreaStyle()}>
                        <h1 className='headerText'>Recited by {this.state.recitedBy}{this.userID}</h1>
                        <h1 className='headerText'>Published: {this.state.published}</h1>
                        <h1 className='headerText'>Genre: {this.state.genre}</h1>
                        <h1 className='headerText'>Uploaded By:<a style={this.getUserAlinkStyle()} href={'/user/' + this.state.userInfo.userID}  > {this.state.uploaderName}</a></h1>

                        <div style={{marginLeft:'10px'}}>
                            <button style={this.getPlayButtonSize()} className='interactButton fa fa-play'
                            ref={(button)=>{this.playBtn = button}}
                            onClick={this.playRecitation.bind(this)}>
                            &nbsp;&nbsp;
                            </button>  <span style={this.getPlayFont()}> {this.state.plays}  </span>

                          <button className='interactButton fa fa-thumbs-up' style={this.getPlayButtonSize()}
                                    ref={(button)=>{this.likeBtn = button}}
                                    onClick={this.likeRecitation.bind(this)}>

                                    </button>           <span style={this.getPlayFont()}> {this.state.likes} </span>
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
                            <Comments />
                            </Col>
                        </Row>
                        </Grid>
                        {this.state.deleteButton}
                    </div>
                </div>


                <Clock onupdate={this.update.bind(this)}></Clock>
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


    handleDeleteRecitation() {
        var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        Alertify.confirm("Are you sure you want to delete this recitation?", (e) => {
            if (e) {
                // Remove the recitations from all users' likes,favorites,playlists.
                this.removeFromAllUsers(recitation.id);


                // Delete the recitation.
                firebase.database().ref().child('Recitations').child(recitation.id).remove( (err) => {


                    if(!err) {
                        firebase.storage().ref().child('Recitations').child(recitation.id).delete().then( () => {

                            this.props.nav.goTo('home');

                        }).catch( (err) => {
                            console.log(err);
                        });
                    }
                    else {
                        console.log(err);
                    }
                });
            } else {
                // user clicked "cancel"
            }
        });
    }


    removeFromAllUsers(removeID) {
        firebase.database().ref().child('Users').once('value', (allUsers) => {
            // Go through each user.
            allUsers.forEach( (snap) => {
                var user = snap.val();

                // Remove from favorites
                if(user.favorites) {
                    if( user.favorites.includes(removeID) ) {
                        // Get the old favorites, remove the rec id.
                        var newFavorites = user.favorites;
                        this.remove(newFavorites, removeID);

                        // Set the new favorites.
                        firebase.database().ref().child('Users').child(user.userID).child('favorites').set(newFavorites);
                    }
                }

                // Do the same for likes
                if(user.likes) {
                    if( user.likes.includes(removeID) ) {
                        var newLikes = user.likes;
                        this.remove(newLikes, removeID);

                        firebase.database().ref().child('Users').child(user.userID).child('likes').set(newLikes);
                    }
                }

                // Do the same for likes
                firebase.database().ref().child('Users').child(user.userID).child('Playlists').once('value', (playlists) => {
                    playlists.forEach( (playlist) => {
                        var newPlaylist = [];
                        playlist.forEach( (rec) => {
                            if(rec.val() !== removeID) {
                                newPlaylist.push(rec.val());
                            }
                        });

                        firebase.database().ref().child('Users').child(user.userID).child('Playlists').child(playlist.key).set(newPlaylist);
                    });
                });
            });
        });
    }




    update() {
        const store = this.props.rStore.getState();
        const recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        // Change to play/pause button when audio is/isn't playing.
        if(store.audio !== null) {
            if(store.id === recitation.id) {
                if(store.audio.paused === true || store.audio.ended === true) {
                    this.playBtn.className = 'interactButton fa fa-play';
                } else {
                    this.playBtn.className = 'interactButton fa fa-pause';
                }

                if(store.audio.ended === true) {
                    if(store.shouldUpdatePlayCount === true) {
                        this.handleUpdatePlayCount();
                        this.props.rStore.dispatch({
                            type:'UPDATE_PLAYCOUNT',
                            shouldUpdatePlayCount: false
                        });
                    }
                }
            }
        }

        if(document.body.scrollTop >= 30 || window.scrollY >= 30) {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0.85)'
            })
        } else {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0)'
            })
        }
    }


    // Adds 1 to the play count everytime the audio is finished playing.
    handleUpdatePlayCount() {
        const recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        recitation.plays += 1;
        window.sessionStorage.setItem('CurrentRecitation', JSON.stringify(recitation));

        firebase.database().ref().child('Recitations').child(recitation.id).update({
            plays: recitation.plays
        }, this.reloadData(() => {
            this.props.rStore.dispatch({
                type:'UPDATE_PLAYCOUNT',
                shouldUpdatePlayCount: false
            });
        }));
        return;
    }


    // Removes an item from an array.
    remove(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            // eslint-disable-next-line
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
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

    likeRecitation() {
        const store = this.props.rStore.getState();
        if(store.currentUser === null || store.currentUser === undefined) { alert('You must be signed in to like a recitation.'); return; }

        const fireRef = firebase.database().ref();
        const uid = store.currentUser.userID;
        var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        fireRef.child('Users').child(uid).once('value').then((snap)=>{
            var likes = snap.val().likes || [];

            if(!likes.includes(recitation.id)) {
                // Set the user's likes array.
                likes.push(recitation.id);
                fireRef.child('Users').child(uid).child('likes').set(likes);

                // Change the recitation's like number
                recitation.likes += 1;
                window.sessionStorage.setItem('CurrentRecitation', JSON.stringify(recitation));
                fireRef.child('Recitations').child(recitation.id).update({
                    likes: recitation.likes
                }, this.reloadData());
                return;
            } else {
                // Set the user's likes array.
                this.remove(likes, recitation.id);
                fireRef.child('Users').child(uid).child('likes').set(likes);

                // Change the recitation's like number
                recitation.likes -= 1;
                fireRef.child('Recitations').child(recitation.id).update({
                    likes: recitation.likes
                }, this.reloadData());
                return;
            }
        });
    }

    favoriteRecitation() {
        const store = this.props.rStore.getState();
        if(store.currentUser === null) { alert('You must be signed in to favorite a recitation.'); return; }

        const fireRef = firebase.database().ref();
        const uid = store.currentUser.userID;
        const recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        fireRef.child('Users').child(uid).once('value').then((snap)=>{
            var favorites = snap.val().favorites || [];

            if(!favorites.includes(recitation.id)) {
                // Set the user's favorite array.
                favorites.push(recitation.id);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);

                // Change the recitation's favorite number
                recitation.favorites += 1;
                window.sessionStorage.setItem('CurrentRecitation', JSON.stringify(recitation));
                fireRef.child('Recitations').child(recitation.id).update({
                    favorites: recitation.favorites
                }, this.reloadData());
                return;
            } else {
                // Set the user's favorite array.
                this.remove(favorites, recitation.id);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);

                // Change the recitation's favorite number
                recitation.favorites -= 1;
                window.sessionStorage.setItem('CurrentRecitation', JSON.stringify(recitation));
                fireRef.child('Recitations').child(recitation.id).update({
                    favorites: recitation.favorites
                }, this.reloadData());
                return;
            }
        });
    }


    reloadData(callback) {
        const recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));
        const fireRef = firebase.database().ref();

        fireRef.child('Recitations').child(recitation.id).once('value').then((rO)=> {
            var recObj = new Recitation( rO.val().id,
                                        rO.val().uploaderID,
                                        rO.val().uploaderName,
                                        rO.val().image,
                                        rO.val().title,
                                        rO.val().author,
                                        rO.val().recited_by,
                                        rO.val().published,
                                        rO.val().genre,
                                        rO.val().description,
                                        rO.val().likes,
                                        rO.val().plays,
                                        rO.val().favorites,
                                        rO.val().text,
                                        rO.val().audio,
                                        rO.val().timestamp,
                                        null );

            window.sessionStorage.setItem('CurrentRecitation', this.stringify(recObj));
            this.setState({
                plays: recObj.plays,
                likes: recObj.likes,
                favorites: recObj.favorites
            });
        });
    }


}

export default Poem;
