import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../../public/res/brickBackground.jpg';

import _ from '../css/Profile.css';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import PlaylistItem from '../components/ProfilePageComps/PlaylistItem';
import RecitationItem from '../components/ProfilePageComps/RecitationItem';

import Recitation from '../objects/Recitation';
import Playlist from '../objects/Playlist';

// Here is where users will view their own profiles.
class Profile extends Component {
    
    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor(props) {
        super(props);
        
        this.state = {
            name:'User',

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
                        <PlaylistItem showLoadingIndicator={true} key={2}></PlaylistItem>]
        }
    }

    componentDidMount() {
        this.allButton.style.textDecoration = 'underline';
        this.setState({
            name: this.props.rStore.getState().currentUser != null ? this.props.rStore.getState().currentUser.fullname.split(" ")[0] : 'User'
        });

        this.loadUploadPlaylist(this.props.rStore, () => {
            this.loadLikedPlaylist(this.props.rStore, () => {
                this.loadFavoritedPlaylist(this.props.rStore, () => {
                    this.pushOntoPage();
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
            height:'1500px'
        };
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
            zIndex:'-1',
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

                <ProfileHeader nav={this.props.nav}></ProfileHeader>
                
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>

                <ProfileBanner rStore={this.props.rStore}>
                    <h1 style={{fontFamily:'Monthoers', fontSize:'70px', paddingBottom:'10px'}}>{this.state.name}'s</h1>
                    <h1 style={{fontFamily:'Monthoers', fontSize:'90px'}}>Recordings</h1>
                </ProfileBanner>

                <div className='buttonsArea'>
                    <button ref={(button)=>{this.uploadButton = button}}
                            className='changeRecitationsButton'
                            onClick={this.goToUploadPage.bind(this)}>Upload</button>
                    <div>
                        <button ref={(button)=>{this.allButton = button}} 
                                onClick={this.changeRecitations.bind(this)} 
                                id='all' className='changeRecitationsButton'>All</button>
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

                {this.props.children}
            </div>
        );
    }


    /**********************
    *                     *
    *       BUTTONS       *
    *                     *
    ***********************/

    /** Changes the recitations that are being looked at based on which button is clicked. */
    changeRecitations(e) {
        var sender = e.target.id;

        if(sender === 'all') {
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


    goToUploadPage() {
        this.props.nav.goTo('upload');
    }



    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    /** Loads all of the recitations that the user has uploaded into a playlist. */
    loadUploadPlaylist(rStore, callback) {
        const fireRef = firebase.database().ref();
        //const storageRef = firebase.storage().ref();
        const store = rStore.getState();

        // The final playlist
        var playlist = new Playlist("Uploads");

        fireRef.child('Recitations').orderByChild('uploaderID').equalTo(store.currentUser.userID).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((rO) => {
                var recObj = new Recitation( rO.val().id,
                                             rO.val().uploaderID,
                                             rO.val().uploadername,
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
        fireRef.child('Users').child(store.currentUser.userID).once('value', (snap) => {
            var likes = snap.val().likes;

            likes.forEach( (e) => {
                fireRef.child('Recitations').child(e).once('value', (rO) => {
                    var recObj = new Recitation( rO.val().id,
                                                rO.val().uploaderID,
                                                rO.val().uploadername,
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
        fireRef.child('Users').child(store.currentUser.userID).once('value', (snap) => {
            var favorites = snap.val().favorites;

            favorites.forEach( (e) => {
                fireRef.child('Recitations').child(e).once('value', (rO) => {
                    var recObj = new Recitation( rO.val().id,
                                                rO.val().uploaderID,
                                                rO.val().uploadername,
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
        });
    }


    /** Takes the playlists (once they are loaded) and pushes new html elements onto the page. */
    pushOntoPage() {
        // Clear all of the recitations.
        var items = [];
        this.setState({ recitations: [] });

        if(this.state.showUploads === true) {
            if(this.state.uploadPlaylist.length() == 0) { return; }

            // Create the array of recitation items.
            this.state.uploadPlaylist.forEach( (rec) => {
                var recItem = <RecitationItem margin='30px'
                                              key={rec.id} 
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                items.push(recItem);
            }, () => {
                // Update the state.
                this.setState({
                    recitations: items
                });
            });
        }
        else if(this.state.showPopular === true) {
            if(this.state.uploadPlaylist.length() == 0) { return; }

            // Create the array of recitation items.
            this.state.uploadPlaylist.forEach( (rec) => {
                var recItem = <RecitationItem margin='30px'
                                              key={rec.id} 
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                items.push(recItem);
                
            }, () => {
                
                items.sort( (a, b) => {
                    return a.likes - b.likes;
                });
                // Update the state.
                this.setState({
                    recitations: items
                });
            });
        }
        else if(this.state.showLikes === true) {
            if(this.state.likedPlaylist.length() == 0) { return; }

            // Create the array of recitation items.
            this.state.likedPlaylist.forEach( (rec) => {
                var recItem = <RecitationItem margin='30px'
                                              key={rec.id} 
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                items.push(recItem);

            }, () => {
                
                items.sort( (a, b) => {
                    return a.likes - b.likes;
                });
                // Update the state.
                this.setState({
                    recitations: items
                });
            });
        }
        else if(this.state.showFavorties === true) {
            if(this.state.favoritedPlaylist.length() == 0) { return; }

            // Create the array of recitation items.
            this.state.favoritedPlaylist.forEach( (rec) => {
                var recItem = <RecitationItem margin='30px'
                                              key={rec.id} 
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                items.push(recItem);

            }, () => {
                items.sort( (a, b) => {
                    return a.favorites - b.favorites;
                });
                // Update the state.
                this.setState({
                    recitations: items
                });
            });
        }
        else if(this.state.showPlaylists === true) {
            if(this.state.favoritedPlaylist.length() == 0) { return; }

            // Create the array of recitation items.
            this.state.favoritedPlaylist.forEach( (rec) => {
                var recItem = <RecitationItem margin='30px'
                                              key={rec.id} 
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                items.push(recItem);
            }, () => {
                // Update the state.
                this.setState({
                    recitations: items
                });
            });
        }

        // var items = [<PlaylistItem key={0} showLoadingIndicator={false} playlist={this.state.uploadPlaylist}></PlaylistItem>,
        //             <PlaylistItem key={1} showLoadingIndicator={false} playlist={this.state.likedPlaylist}></PlaylistItem>,
        //             <PlaylistItem key={2} showLoadingIndicator={false} playlist={this.state.favoritedPlaylist}></PlaylistItem>,
        //             <PlaylistItem key={3} showLoadingIndicator={false} playlist={this.state.favoritedPlaylist}></PlaylistItem>];

        // this.setState({
        //     htmlElements:items
        // });
    }




}

export default Profile;
