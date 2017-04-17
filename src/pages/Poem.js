import React, { Component } from 'react';
import { Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as firebase from 'firebase';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';

import _ from '../css/Poem.css';


// The generic poem page for each recitation.
class Poem extends Component {
    constructor() {
        super();

        this.state = {
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
        this.reloadPoemDataFromFirebase(true);
    }




    render() {
        const popoverBottom = (
            <Popover id="popover-positioned-bottom" title="Transcript">
                {this.state.text}
            </Popover>
        );

        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>


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

    likeRecitation() {
        const fireRef = firebase.database().ref();
        const uid = window.localStorage.getItem('currentUID');
        const currentRec = JSON.parse(window.sessionStorage.getItem('recitation_to_look_at'));

        fireRef.child('Users').child(uid).once('value').then((snap)=>{
            var likes = snap.val().likes || [];

            if(!likes.includes(this.state.title+'-'+currentRec.uploaderID)) {
                // eslint-disable-next-line
                var dict = {
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

                likes.push(this.state.title+'-'+currentRec.uploaderID);
                fireRef.child('Users').child(uid).child('likes').set(likes);
                fireRef.child('Recitations').child(uid).child(this.state.title).update(dict);
                this.reloadPoemDataFromFirebase(false);
                return;
            } else {
                // eslint-disable-next-line
                var dict = {
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

                this.remove(likes, this.state.title+'-'+currentRec.uploaderID);
                fireRef.child('Users').child(uid).child('likes').set(likes);
                fireRef.child('Recitations').child(uid).child(this.state.title).update(dict);
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

            if(!favorites.includes(this.state.title+'-'+currentRec.uploaderID)) {
                // eslint-disable-next-line
                var dict = {
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

                favorites.push(this.state.title+'-'+currentRec.uploaderID);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);
                fireRef.child('Recitations').child(uid).child(this.state.title).update(dict);
                this.reloadPoemDataFromFirebase(false);
                return;
            } else {
                // eslint-disable-next-line
                var dict = {
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

                this.remove(favorites, this.state.title+'-'+currentRec.uploaderID);
                fireRef.child('Users').child(uid).child('favorites').set(favorites);
                fireRef.child('Recitations').child(uid).child(this.state.title).update(dict);
                this.reloadPoemDataFromFirebase(false);
                return;
            }
        });
    }

    playRecitation() {
        this.props.audioPlayer.setAP(this.state.audio);

        if(!this.playBtn.className.includes('pause')) {
            this.props.ap.handlePlay(this.state.audio);
        }
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

    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }


    reloadPoemDataFromFirebase(loadAudio) {
        const currentRec = JSON.parse(window.sessionStorage.getItem('recitation_to_look_at'));
        const fireRef = firebase.database().ref();
        const storageRef = firebase.storage().ref();

        fireRef.child('Recitations').child(currentRec.uploaderID).child(currentRec.title).once('value').then((snapshot)=> {
            var rec = snapshot.val();

            if(loadAudio === true) {
                storageRef.child(currentRec.uploaderID).child(rec.title).getDownloadURL().then( (url) => {
                    var audio = new Audio(url);
                    audio.loop = false;

                    this.setState({
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

                });
            } else {
                this.setState({
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
            }
        });
    }
}

export default Poem;
