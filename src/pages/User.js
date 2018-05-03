import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

// eslint-disable-next-line
import _ from '../css/Poem.css';
// eslint-disable-next-line
import __ from '../css/Header.css';

import RVLogo from '../res/RV-Final-Icon.png';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import Clock from '../components/Clock';
import ProfileBanner from '../components/User/ProfileBanner';

import Recitation from '../objects/Recitation';

import RecitationItem2 from '../components/ProfilePageComps/RecitationItem2';
import RecitationItem from '../components/ProfilePageComps/RecitationItem';
import PlaylistItem from '../components/ProfilePageComps/PlaylistItem';
import Playlist from '../objects/Playlist';

class User extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor(props) {
        super(props);

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
            uploadPlaylist:null,
            likedPlaylist:null,
            favoritedPlaylist:null,
            playlistPlaylist:null,

            showUploads:true,
            showPopular:false,
            showLikes:false,
            showFavorties:false,
            showPlaylists:false,

            // Temporary recitation when the page first loads, just to let the user know
            // that something is loading.
            recitations:[<PlaylistItem showLoadingIndicator={true} key={0}></PlaylistItem>,
                        <PlaylistItem showLoadingIndicator={true} key={1}></PlaylistItem>,
                        <PlaylistItem showLoadingIndicator={true} key={2}></PlaylistItem>,
                        <PlaylistItem showLoadingIndicator={true} key={3}></PlaylistItem>]
        }


    }

    componentDidMount() {
      //this.props.match.params.id
        const store = this.props.rStore.getState();
        var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));





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


       var uid = this.props.match.params.uid;




       firebase.database().ref().child('Users').child(uid).once('value', (snap) => {
           var user = snap.val();
           console.log(user);
           this.setState({userInfo:user});
      });

      this.loadUploadPlaylist(this.props.rStore, () => {
          this.loadLikedPlaylist(this.props.rStore, () => {
              this.loadFavoritedPlaylist(this.props.rStore, () => {
                  this.loadPlaylists(this.props.rStore, () => {
                      this.pushOntoPage();
                  });
              });
          });
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
            paddingBottom:'500px'
        };
    }



    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: '#000000',
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
                <ProfileHeader nav={this.props.nav} rStore={this.props.rStore}></ProfileHeader>

                {/* The background image */}
                <div style={this.getOverlay()}></div>

                {/* The banner with the sign in text */}
                <ProfileBanner  userInfo={this.state.userInfo} rStore={this.props.rStore}>
                  </ProfileBanner>


                {/* The div that shows the image. */}
                <div className='buttonsArea'>

                    <div>
                        <button ref={(button)=>{this.allButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='records' className='changeRecitationsButton'>Records</button>
                        <button ref={(button)=>{this.popularButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='popular' className='changeRecitationsButton'>Popular</button>
                        <button ref={(button)=>{this.likesButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='like' className='changeRecitationsButton'>Liked</button>
                        <button ref={(button)=>{this.favoritesButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='favorite' className='changeRecitationsButton'>Favorites</button>
                        <button ref={(button)=>{this.playlistButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='playlist' className='changeRecitationsButton'>Playlists</button>
                    </div>
                </div>
                <div className='profileDisplayArea'>
                    {this.state.recitations}
                </div>



            </div>
        );
    }


    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    /** Changes the recitations that are being looked at based on which button is clicked. */
    changeRecitations(e) {
        var sender = e.target.id;

        if(sender === 'records') {
            this.setState({ showUploads: true, showPopular: false, showLikes: false, showFavorties: false, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'underline';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'none';
        } else if(sender === 'popular') {
            this.setState({ showUploads: false, showPopular: true, showLikes: false, showFavorties: false, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'underline';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'none';
        } else if(sender === 'like') {
            this.setState({ showUploads: false, showPopular: false, showLikes: true, showFavorties: false, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'underline';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'none';
        } else if(sender === 'favorite') {
            this.setState({ showUploads: false, showPopular: false, showLikes: false, showFavorties: true, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'underline';
            this.playlistButton.style.textDecoration = 'none';
        } else if(sender === 'playlist') {
            this.setState({ showUploads: false, showPopular: false, showLikes: false, showFavorties: false, showPlaylists: true},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'underline';
        }
    }



    /** Loads all of the recitations that the user has uploaded into a playlist. */
    loadUploadPlaylist(rStore, callback) {
        const fireRef = firebase.database().ref();
        //const storageRef = firebase.storage().ref();
        const store = rStore.getState();

        // The final playlist
        var playlist = new Playlist("Uploads");

        fireRef.child('Recitations').orderByChild('uploaderID').equalTo(this.props.match.params.uid).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((rO) => {
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
                                             rO.val().timestamp );

                playlist.add(recObj);
            });
            this.setState({
                uploadPlaylist: playlist
            });
            callback();
        });
    }

    /** Loads all of the recitations that the user has liked into a playlist. */
    loadLikedPlaylist(rStore, callback) {
        const fireRef = firebase.database().ref();
        //const storageRef = firebase.storage().ref();
        const store = rStore.getState();

        // The final playlist
        var playlist = new Playlist("Liked");
        var i = 0;

        // Get all the like ids.
        fireRef.child('Users').child(this.props.match.params.uid).once('value', (snap) => {
            var likes = snap.val().likes;

            if(likes) {
                likes.forEach( (e) => {
                    fireRef.child('Recitations').child(e).once('value', (rO) => {
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
                                                    rO.val().timestamp  );

                        playlist.add(recObj);
                        i++;

                        this.setState({
                            likedPlaylist: playlist
                        });
                        if(i === likes.length) {
                            callback();
                        }
                    });
                });
            } else {
                callback();
            }
        });
    }

    /** Loads all of the recitations that the user has favorited into a playlist. */
    loadFavoritedPlaylist(rStore, callback) {
        const fireRef = firebase.database().ref();
        //const storageRef = firebase.storage().ref();
        const store = rStore.getState();

        // The final playlist
        var playlist = new Playlist("Favorited");
        var i = 0;

        // Get all the like ids.
        fireRef.child('Users').child(this.props.match.params.uid).once('value', (snap) => {
            var favorites = snap.val().favorites;

            if(favorites) {
                favorites.forEach( (e) => {
                    fireRef.child('Recitations').child(e).once('value', (rO) => {
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
                                                    rO.val().timestamp  );

                        playlist.add(recObj);
                        i++;

                        this.setState({
                            favoritedPlaylist: playlist
                        });
                        if(i === favorites.length) {
                            callback();
                        }
                    });
                });
            } else {
                callback();
            }
        });
    }

    /** Loads all of the user's playlists. */
    loadPlaylists(rStore, callback) {
        const fireRef = firebase.database().ref();
        const store = rStore.getState();

        let playlists = [];


        fireRef.child('Users').child(this.props.match.params.uid).child('Playlists').once('value').then((snapshot)=> {
            // Go through the playlist objects.
            snapshot.forEach((playlist) => {
                let actualPlaylist = new Playlist(playlist.key);

                // For each playlist, go through the recitation IDs.
                playlist.forEach( (itm) => {
                    var recID = itm.val();

                    // Load the recitation and add it to the array.
                    this.loadRecitationsForPlaylist(recID, (obj) => {
                        obj.setPlaylist(actualPlaylist);
                        actualPlaylist.add(obj);
                    });
                });

                playlists.push(actualPlaylist);

                this.setState({
                    playlistPlaylist: playlists
                });
                callback();
            });
        });
    }


    /** Takes the playlists (once they are loaded) and pushes new html elements onto the page. */
    pushOntoPage() {
        // Clear all of the recitations.
        var items = [];
        var recs = [];
        this.setState({ recitations: [] });

        if(this.state.showUploads === true) {
            if(this.state.uploadPlaylist) {
                if(this.state.uploadPlaylist.length() === 0) { return; }
            } else { return; }

            // Create the array of recitation items.
            this.state.uploadPlaylist.forEach( (rec) => {
                recs.push(rec);
            }, () => {
                recs.sort((a,b)=>{
                    return b.timestamp - a.timestamp
                });

                recs.forEach((rec)=>{
                    var recItem = <RecitationItem2 margin='30px'
                                              key={rec.id}
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem2>
                    items.push(recItem);

                    // Update the state.
                    this.setState({
                        recitations: items
                    });
                });

            });
        }
        else if(this.state.showPopular === true) {
            if(this.state.uploadPlaylist) {
                if(this.state.uploadPlaylist.length() === 0) { return; }
            } else { return; }

            // Create the array of recitation items.
            this.state.uploadPlaylist.forEach( (rec) => {
                recs.push(rec);
            }, () => {
                recs.sort((a,b)=>{
                    return b.plays - a.plays
                });

                recs.forEach((rec)=>{
                    var recItem = <RecitationItem margin='30px'
                                              key={rec.id}
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                    items.push(recItem);

                    // Update the state.
                    this.setState({
                        recitations: items
                    });
                });
            });
        }
        else if(this.state.showLikes === true) {
            if(this.state.likedPlaylist){
                if(this.state.likedPlaylist.length() === 0) { return; }
            } else { return; }

            // Create the array of recitation items.
            this.state.likedPlaylist.forEach( (rec) => {
                recs.push(rec);
            }, () => {
                recs.sort((a,b)=>{
                    return b.likes - a.likes
                });

                recs.forEach((rec)=>{
                    var recItem = <RecitationItem margin='30px'
                                              key={rec.id}
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                    items.push(recItem);

                    // Update the state.
                    this.setState({
                        recitations: items
                    });
                });
            });
        }
        else if(this.state.showFavorties === true) {
            if(this.state.favoritedPlaylist) {
                if(this.state.favoritedPlaylist.length() === 0) { return; }
            } else { return; }

            // Create the array of recitation items.
            this.state.favoritedPlaylist.forEach( (rec) => {
                recs.push(rec);
            }, () => {
                recs.sort((a,b)=>{
                    return b.favorites - a.favorites
                });

                recs.forEach((rec)=>{
                    var recItem = <RecitationItem margin='30px'
                                              key={rec.id}
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                    items.push(recItem);

                    // Update the state.
                    this.setState({
                        recitations: items
                    });
                });
            });
        }
        else if(this.state.showPlaylists === true) {
            if(this.state.playlistPlaylist) {
                if(this.state.playlistPlaylist.length === 0) { return; }
            } else { return; }

            // Create the array of recitation items.
            this.state.playlistPlaylist.forEach( (pl) => {
                var playItem = <PlaylistItem key={pl.name}
                                             playlist={pl}
                                             nav={this.props.nav}
                                             rStore={this.props.rStore}></PlaylistItem>
                items.push(playItem);
            })

            // Update the state.
            this.setState({
                recitations: items
            });
        }

    }




    // Loads a recitation with a given id.
    loadRecitationsForPlaylist(id, callback) {
        firebase.database().ref().child('Recitations').child(id).once('value', (rO) => {
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
                                        rO.val().timestamp );

            if(callback) {
                callback(recObj);
            }
        })
    }






  }




export default User;
