import React, { Component } from 'react';
import { Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as firebase from 'firebase';

import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';

import _ from '../css/Poem.css';


// The generic poem page for each recitation.
class Poem extends Component {
    constructor() {
        super();

        this.state = {
            id:'',
            uploaderID:'',
            image:'',
            title:'',
            author:'',
            recitedBy:'',
            published:'',
            genre:'',
            description:'',
            likes: 0,
            plays: 0,
            favorites: 0,
            text:'',
            recitation:null,
            audio:null
        };
    }

    componentDidMount() {
        this.reloadPoemDataFromFirebase(true, () => {
            const store = this.props.rStore.getState();

            // Play or pause the audio.
            if(store.audio !== null) {

                // If you look at a poem and it has the same id that was just loaded...
                if(store.id === this.state.id) {
                    if(store.audio.ended === false) {
                        this.playBtn.className = 'description_button fa fa-pause';
                    } else {
                        this.playBtn.className = 'description_button fa fa-play';
                    }
                } else {
                    // Otherwise, clear to make sure that the newest data is gathered.
                    this.props.rStore.dispatch({type:'CLEAR'});
                }
            }
        });
    }




    render() {
        const popoverBottom = (
            <Popover id="popover-positioned-bottom" title="Transcript">
                {this.state.text}
            </Popover>
        );

        return (
            <div>
                <ContentArea>
                    <ContentHeader height='350px'>

                        <div className="horizontal_info_section">
                            <div className="vertical_image_section">
                                <img id="poem_image" src={this.state.image} alt="im" width={200} height={200} />
                            </div>

                            <div className="vertical_info_section">
                                <h4 id="title_author_area">{this.state.title} by {this.state.author}</h4>
                                <br />
                                <p id="recBy_Pub_Gen">Recited By: {this.state.recitedBy} <br/> Published: {this.state.published} <br/> Genre: {this.state.genre}</p>
                                <p id="descr_area">{this.state.description}</p>
                                <div className="description_buttons_section">
                                    <OverlayTrigger delayShow={1000} placement="bottom" overlay={<Tooltip id="tooltip">Play</Tooltip>}>
                                        <button className="description_button fa fa-play" onClick={this.playRecitation.bind(this)} ref={(button)=>{this.playBtn = button}}/>
                                    </OverlayTrigger>
                                    <OverlayTrigger delayShow={1000} placement="bottom" overlay={<Tooltip id="tooltip">Like</Tooltip>}>
                                        <button className="description_button fa fa-thumbs-up" onClick={this.likeRecitation.bind(this)}/>
                                    </OverlayTrigger>
                                    <OverlayTrigger delayShow={1000} placement="bottom" overlay={<Tooltip id="Favorite">Favorite</Tooltip>}>
                                        <button className="description_button fa fa-heart" onClick={this.favoriteRecitation.bind(this)}/>
                                    </OverlayTrigger>
                                </div>
                            </div>

                            <div className="vertical_numbers_section">
                                <div style={{display: 'table', float: 'right'}}>
                                    <p style={{display: 'table-cell'}} id="poem_play_label" />{this.state.plays}&nbsp;<p style={{display: 'table-cell'}} className="fa fa-play" />
                                </div>
                                <br />
                                <div style={{display: 'table', float: 'right'}}>
                                    <p style={{display: 'table-cell'}} id="poem_like_label" />{this.state.likes}&nbsp;<p style={{display: 'table-cell'}} className="fa fa-thumbs-up" />
                                </div>
                                <br />
                                <div style={{display: 'table', float: 'right'}}>
                                    <p style={{display: 'table-cell'}} id="poem_favorite_label" />{this.state.favorites}&nbsp;<p style={{display: 'table-cell'}} className="fa fa-heart" />
                                </div>
                            </div>
                        </div>
                        <div style={{position: 'relative', backgroundColor: 'white', width: '100%', textAlign: 'center'}}>
                            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                                <button id="view_transcript_btn" data-toggle="popover" data-placement="bottom" title="Poem Transcript"> Click to view transcript </button>
                            </OverlayTrigger>
                        </div>

                    </ContentHeader>
                </ContentArea>
            </div>
        );
    }



    /**********************
    *                     *
    *    BUTTON CLICKS    *
    *                     *
    ***********************/

    playRecitation() {
        const store = this.props.rStore.getState();

        // First, check the symbol on the play/pause button.
        if(this.playBtn.className.includes('pause')) {
            // If it is a pause button, then you can assume that the rStore audio is not null.
            store.audio.pause();
            this.playBtn.className = 'description_button fa fa-play';
        } else {

            if(store.audio !== null) {
                store.audio.play();
                this.playBtn.className = 'description_button fa fa-pause';
            } else {
                // This else does NOT assume that there is an audio object.
                // Get the newest data.
                this.props.rStore.dispatch({
                    type:'SET',
                    id:this.state.id,
                    uploaderID:this.state.uploaderID,
                    image:this.state.image,
                    title:this.state.title,
                    author:this.state.author,
                    recitedBy:this.state.recitedBy,
                    published:this.state.published,
                    genre:this.state.genre,
                    description:this.state.description,
                    likes: this.state.likes,
                    plays: this.state.plays,
                    favorites: this.state.favorites,
                    text:this.state.text,
                    recitation:this.state.recitation,
                    audio:this.state.audio,
                    lastAudio:this.state.audio
                });
                store.audio.play();
                this.playBtn.className = 'description_button fa fa-pause';
            }
        }
    } // End of method.


    likeRecitation() {
        const fireRef = firebase.database().ref();
        const uid = window.localStorage.getItem('currentUID');
        const currentRec = JSON.parse(window.sessionStorage.getItem('recitation_to_look_at'));

        fireRef.child('Users').child(uid).once('value').then((snap)=>{
            var likes = snap.val().likes || [];

            if(!likes.includes(currentRec.id)) {
                // eslint-disable-next-line
                var dict = {
                    id:this.state.id,
                    uploaderID:this.state.uploaderID,
                    image: this.state.image,
                    title: this.state.title,
                    author: this.state.author,
                    recited_by: this.state.recitedBy,
                    published: this.state.published,
                    genre: this.state.genre,
                    description: this.state.description,
                    likes: this.state.likes + 1,
                    plays: this.state.plays,
                    favorites: this.state.favorites,
                    text: this.state.text,
                    audio: this.state.audio
                };

                likes.push(currentRec.id);
                fireRef.child('Users').child(uid).child('likes').set(likes);
                fireRef.child('Recitations').child(this.state.id).update(dict);
                this.reloadPoemDataFromFirebase(false);
                return;
            } else {
                // eslint-disable-next-line
                var dict = {
                    id:this.state.id,
                    uploaderID:this.state.uploaderID,
                    image: this.state.image,
                    title: this.state.title,
                    author: this.state.author,
                    recited_by: this.state.recitedBy,
                    published: this.state.published,
                    genre: this.state.genre,
                    description: this.state.description,
                    likes: this.state.likes - 1,
                    plays: this.state.plays,
                    favorites: this.state.favorites,
                    text: this.state.text,
                    audio: this.state.audio
                };

                this.remove(likes, currentRec.id);
                fireRef.child('Users').child(uid).child('likes').set(likes);
                fireRef.child('Recitations').child(this.state.id).update(dict);
                this.reloadPoemDataFromFirebase(false);
                return;
            }
        });
    }

    favoriteRecitation() {
        const fireRef = firebase.database().ref();
        const uid = window.localStorage.getItem('currentUID');
        const currentRec = JSON.parse(window.sessionStorage.getItem('recitation_to_look_at'));

        fireRef.child('Users').child(uid).once('value').then((snap)=>{
            var favorites = snap.val().favorites || [];

            if(!favorites.includes(currentRec.id)) {
                // eslint-disable-next-line
                var dict = {
                    id:this.state.id,
                    uploaderID:this.state.uploaderID,
                    image: this.state.image,
                    title: this.state.title,
                    author: this.state.author,
                    recited_by: this.state.recitedBy,
                    published: this.state.published,
                    genre: this.state.genre,
                    description: this.state.description,
                    likes: this.state.likes,
                    plays: this.state.plays,
                    favorites: this.state.favorites + 1,
                    text: this.state.text,
                    audio: this.state.audio
                };

                favorites.push(currentRec.id);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);
                fireRef.child('Recitations').child(this.state.id).update(dict);
                this.reloadPoemDataFromFirebase(false);
                return;
            } else {
                // eslint-disable-next-line
                var dict = {
                    id:this.state.id,
                    uploaderID:this.state.uploaderID,
                    image: this.state.image,
                    title: this.state.title,
                    author: this.state.author,
                    recited_by: this.state.recitedBy,
                    published: this.state.published,
                    genre: this.state.genre,
                    description: this.state.description,
                    likes: this.state.likes,
                    plays: this.state.plays,
                    favorites: this.state.favorites - 1,
                    text: this.state.text,
                    audio: this.state.audio
                };

                this.remove(favorites, currentRec.id);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);
                fireRef.child('Recitations').child(this.state.id).update(dict);
                this.reloadPoemDataFromFirebase(false);
                return;
            }
        });
    }


    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

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


    reloadPoemDataFromFirebase(loadAudio, callback) {
        const currentRec = JSON.parse(window.sessionStorage.getItem('recitation_to_look_at'));
        const fireRef = firebase.database().ref();
        const storageRef = firebase.storage().ref();

        fireRef.child('Recitations').child(currentRec.id).once('value').then((snapshot)=> {
            var rec = snapshot.val();

            if(loadAudio === true) {
                storageRef.child(currentRec.uploaderID).child(rec.id).getDownloadURL().then( (url) => {
                    var audio = new Audio(url);
                    audio.loop = false;

                    this.setState({
                        id:rec.id,
                        uploaderID:rec.uploaderID,
                        image: rec.image,
                        title: rec.title,
                        author: rec.author,
                        recitedBy: rec.recited_by,
                        published: rec.published,
                        genre: rec.genre,
                        description: rec.description,
                        likes: rec.likes,
                        plays: rec.plays,
                        favorites: rec.favorites,
                        text: rec.text,
                        recitation:rec,
                        audio:audio
                    });

                    if(callback !== undefined && callback !== null) {
                        callback();
                    }
                });
            } else {
                this.setState({
                    key:rec.key,

                    uploaderID:rec.uploaderID,
                    image: rec.image,
                    title: rec.title,
                    author: rec.author,
                    recitedBy: rec.recited_by,
                    published: rec.published,
                    genre: rec.genre,
                    description: rec.description,
                    likes: rec.likes,
                    plays: rec.plays,
                    favorites: rec.favorites,
                    text: rec.text,
                    recitation:rec,
                    audio:this.state.audio || null
                });
                if(callback !== undefined && callback !== null) {
                    callback();
                }
            }
        });
    }
}

export default Poem;
