import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../../public/res/brickBackground.jpg';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import PlaylistItem from '../components/ProfilePageComps/PlaylistItem';

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
            uploadPlaylist:null,
            likedPlaylist:null,
            favoritedPlaylist:null,
            playlistPlaylist:null,
            htmlElements:[<PlaylistItem key={0} show={true}></PlaylistItem>,
                        <PlaylistItem key={1} show={true}></PlaylistItem>,
                        <PlaylistItem key={2} show={true}></PlaylistItem>]
        }

        this.loadUploadPlaylist(props.rStore, () => {
            this.loadLikedPlaylist(props.rStore, () => {
                this.loadFavoritedPlaylist(props.rStore, () => {
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
            top:'0px'
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
    getDisplayAreaStyles() {
        return {
            position:'relative',
            top:'100px',
            width:'100%',
            margin:'auto',
            textAlign:'center',
            paddingLeft:'50px',
            paddingRight:'50px'
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

                <ProfileHeader></ProfileHeader>
                
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>


                <ProfileBanner rStore={this.props.rStore}></ProfileBanner>


                <div style={this.getDisplayAreaStyles()}>
                    {this.state.htmlElements}
                </div>
            </div>
        );
    }


    /**********************
    *                     *
    *       BUTTONS       *
    *                     *
    ***********************/



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
                                             rO.val().audio );
                playlist.add(recObj);
            });
            this.setState({
                uploadPlaylist: playlist,
                htmlElements:[this.state.htmlElements[1], this.state.htmlElements[2]]
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
                                                rO.val().audio );
                
                    playlist.add(recObj);
                    i++;
                    
                    this.setState({
                        likedPlaylist: playlist,
                        htmlElements:[this.state.htmlElements[2]]
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
                                                rO.val().audio );
                
                    playlist.add(recObj);
                    i++;

                    this.setState({
                        favoritedPlaylist: playlist,
                        htmlElements:[]
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
        var items = [<PlaylistItem key={0} show={false} playlist={this.state.uploadPlaylist}></PlaylistItem>,
                    <PlaylistItem key={1} show={false} playlist={this.state.likedPlaylist}></PlaylistItem>,
                    <PlaylistItem key={2} show={false} playlist={this.state.favoritedPlaylist}></PlaylistItem>];

        this.setState({
            htmlElements:items
        });
    }




}

export default Profile;
