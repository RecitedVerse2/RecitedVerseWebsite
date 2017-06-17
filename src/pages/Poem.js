import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../../public/res/brickBackground.jpg';
import background from '../../public/res/BlankBanner.png';
import RVLogo from '../../public/res/RV-Final-Icon.png';

import Clock from '../components/Clock';

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
            poemImage:'',
            poemTranscript:'',
            audio:null,

            backgroundColor:'rgba(0,0,0,0)'
        }
    }

    componentDidMount() {
        var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));
        this.loadRecitationAudio();

        this.setState({
            poemName: recitation.title,
            poemAuthor: recitation.author,
            recitedBy: recitation.recitedBy,
            published: recitation.published,
            genre: recitation.genre,
            poemImage: recitation.image,
            poemTranscript: recitation.text,
        })
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
            paddingBottom:'500px'
        };
    }
    getHeaderStyle() {
        return {
            position: 'fixed',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: this.state.backgroundColor,
            WebkitTransitionDuration: '0.2s'
        }
    }
    getLogoStyle() {
        return {
            position:'relative',
            left:'20px',
            top:'-15px',
            width:'80px',
            height:'90%',
            cursor:'pointer',
            display:'table-cell'
        }
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
            zIndex:'-1'
        }
    }
    getBannerStyle() {
        return {
            position:'relative',
            top:'100px',
            width:'100%',
            height:'150px'
        }
    }
    getBannerTextStyles() {
        return {
            position:'relative',
            top:'-95%',
            color:'white',
            textAlign:'center',
            fontSize:'70px',
            fontFamily:'Monthoers'
        }
    }
    getBannerTextStyles2() {
        return {
            position:'relative',
            top:'-110%',
            color:'white',
            textAlign:'center',
            fontSize:'30px',
            fontFamily:'Monthoers'
        }
    }
    getInfoAreaStyles() {
        return {
            position:'relative',
            top:'130px',
            height:'300px',
            color: 'white',
        }
    }
    getInfoTextStyles() {
        return {
            position:'relative',
            right:'0px',
            verticalAlign:'top',
            color: 'white',
            fontSize:'30px',
            fontFamily:'NEB',
            margin:'auto',
            display:'inline-block',
        }
    }
    getPoemImageStyles() {
        return {
            position:'relative',
            verticalAlign:'top',
            lineHeight:'250px',
            width:'250px',
            height:'250px',
            color: 'white',
            marginLeft:'60px',
            marginRight:'30px',
            display:'inline-block'
        }
    }
    getSocialButtonStyles() {
        return {
            width:'75px',
            height:'75px',
            outline:'none',
            border:'none',
            background:'none',
            color:'white',
            margin:'10px',
            fontSize:'60px',
            textDecoration:'none'
        }
    }
    getTranscriptButton() {
        return {
            outline:'none',
            border:'none',
            background:'none',
            color:'white',
            fontSize:'60px',
            marginTop:'20px',
            marginLeft:'65px',
            fontFamily:'Monthoers',
            textDecoration:'none'
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
                <div style={this.getHeaderStyle()}>
                    &nbsp;&nbsp;
                    <img onClick={this.goToHomePage.bind(this)} alt='logo' style={this.getLogoStyle()} src={RVLogo}></img>
                </div>

                {/* The background image */}
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>

                {/* The banner with the sign in text */}
                <div style={this.getBannerStyle()}>
                    <img style={{width:'100%',height:'150px'}} src={background} alt="bg2"/>
                    <h1 style={this.getBannerTextStyles()}>{this.state.poemName}</h1>
                    <h1 style={this.getBannerTextStyles2()}>By {this.state.poemAuthor}</h1>
                </div>


                {/* The div that shows the image. */}
                <div style={this.getInfoAreaStyles()}>
                    <img style={this.getPoemImageStyles()} src={this.state.poemImage} alt="poemimg" />

                    <div style={this.getInfoTextStyles()}>
                        <h1>Recited by {this.state.recitedBy}</h1>
                        <h1>Published: {this.state.published}</h1>
                        <h1>Genre: {this.state.genre}</h1>

                        <div style={{marginLeft:'70px'}}>
                            <button style={this.getSocialButtonStyles()} className='fa fa-play'
                                    ref={(button)=>{this.playBtn = button}}
                                    onClick={this.playRecitation.bind(this)}></button>
                            <button style={this.getSocialButtonStyles()} className='fa fa-thumbs-up' 
                                    ref={(button)=>{this.likeBtn = button}}
                                    onClick={this.likeRecitation.bind(this)}></button>
                            <button style={this.getSocialButtonStyles()} className='fa fa-heart'
                                    ref={(button)=>{this.favoriteBtn = button}}
                                    onClick={this.favoriteRecitation.bind(this)}></button>
                        </div>

                        <button style={this.getTranscriptButton()}>See Transcript</button>
                    </div>
                </div>


                <Clock onupdate={this.update.bind(this)}></Clock>
                {this.props.children}
            </div>
        );
    }


    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    goToHomePage() {
        this.props.nav.goTo('home');
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

    update() {
        const store = this.props.rStore.getState();
        const recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        // Change to play/pause button when audio is/isn't playing.
        if(store.audio !== null) {
            if(store.id === recitation.id) {
                if(store.audio.paused === true || store.audio.ended === true) {
                    this.playBtn.className = 'fa fa-play';
                } else {
                    this.playBtn.className = 'fa fa-pause';
                }
            }
        }

        if(document.body.scrollTop >= 30) {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0.85)'
            })
        } else {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0)'
            })
        }
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

        // If the button has a pause symbol, then just pause the store's audio object.
        if(this.playBtn.className.includes('pause')) {

            store.audio.pause();
            this.playBtn.className = 'fa fa-play';

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
                this.playBtn.className = 'fa fa-pause';
            }
            // Otherwise, if there is already an audio object.
            else {

                // If the recitation that you are looking at has the same src as the one in the store...
                if(store.audio.src === this.state.audio.src) {
                    store.audio.play();
                    this.playBtn.className = 'fa fa-pause';
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
                    this.playBtn.className = 'fa fa-pause';
                }

            }
        }
    } // End of method.

    likeRecitation() {
        const store = this.props.rStore.getState();
        if(store.currentUser === null) { alert('You must be signed in to like a recitation.'); return; }

        const fireRef = firebase.database().ref();
        const uid = store.currentUser.userID;
        var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));

        fireRef.child('Users').child(uid).once('value').then((snap)=>{
            var likes = snap.val().likes || [];

            if(!likes.includes(recitation.id)) {
                likes.push(recitation.id);
                fireRef.child('Users').child(uid).child('likes').set(likes);
                fireRef.child('Recitations').child(recitation.id).update({
                    likes: recitation.likes + 1
                });
                return;
            } else {
                this.remove(likes, recitation.id);
                fireRef.child('Users').child(uid).child('likes').set(likes);
                fireRef.child('Recitations').child(recitation.id).update({
                    likes: recitation.likes - 1
                });
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
                favorites.push(recitation.id);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);
                fireRef.child('Recitations').child(recitation.id).update({
                    favorites: recitation.favorites + 1
                });
                return;
            } else {
                this.remove(favorites, recitation.id);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);
                fireRef.child('Recitations').child(recitation.id).update({
                    favorites: recitation.favorites - 1
                });
                return;
            }
        });
    }

}

export default Poem;