import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../res/brickBackground.jpg';

// eslint-disable-next-line
import _ from '../css/Profile.css';

import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import PlaylistItem from '../components/ProfilePageComps/PlaylistItem';
import RecitationItem2 from '../components/ProfilePageComps/RecitationItem2';
import UserItem from '../components/ProfilePageComps/UserItem';
import RecitationItem from '../components/ProfilePageComps/RecitationItem';
import PageFooter from '../components/PageFooter';

import Recitation from '../objects/Recitation';
import Userlist from '../objects/Userlist';
import User from '../objects/User';
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
            followersPlayList:null,

            showUploads:true,
            showPopular:false,
            showLikes:false,
            showFavorties:false,
            showFollower:false,
            showPlaylists:false,
            showFolloers:false,
            following:0,
            followers:0,

            // Temporary recitation when the page first loads, just to let the user know
            // that something is loading.
            recitations:[]
        }
    }


    updateFollowCount(uid) {

      firebase.database().ref().child('Users').child(uid).once('value').then((snap)=>{
          var usr =  snap.val();
          var following = usr.follow || [];
          var followers = usr.followers || [];
          this.setState({following:following.length, followers:followers.length})
    });


    }
    componentDidMount() {
        this.allButton.style.textDecoration = 'underline';


        // Check for null objects.
        if(this.props.rStore.getState().currentUser == null) {
            var cUser = JSON.parse(window.localStorage.getItem('currentUser'));

            // If the window's current use is/isn't null...
            if(cUser === null || cUser === undefined) {
                this.props.nav.goTo('home');
                return;
            } else {
                this.props.rStore.dispatch({
                    type:'LOGIN',
                    currentUser: cUser
                });
            }


        }

         //console.log();
        this.updateFollowCount(this.props.rStore.getState().currentUser.userID);






        this.loadUploadPlaylist(this.props.rStore, () => {
            this.loadLikedPlaylist(this.props.rStore, () => {
                this.loadFavoritedPlaylist(this.props.rStore, () => {
                  this.loadFollowersPlaylist(this.props.rStore, () => {
                    this.loadPlaylists(this.props.rStore, () => {
                        this.pushOntoPage();
                    });
                  });
                });
            });
        });

       if(window.location.href.includes('following')){


       }else if(window.location.href.includes('follower')){

       }else{

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
            marginBottom:'200px'
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',

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

                <HomeHeader nav={this.props.nav} rStore={this.props.rStore}></HomeHeader>

                <div style={this.getOverlay()}></div>


                <ProfileBanner rStore={this.props.rStore}>
                    <h1 style={{fontFamily:'NEB', fontSize:'70px', paddingBottom:'10px'}}>{this.state.name}</h1>
                    <h1 style={{fontFamily:'Monthoers', fontSize:'90px'}}>Recordings</h1>
                </ProfileBanner>

                <div className='buttonsArea'>

                    <div>
                        <button ref={(button)=>{this.allButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='records' className='changeRecitationsButton'>Recordings</button>
                        <button ref={(button)=>{this.popularButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='popular' className='changeRecitationsButton'>Popular</button>
                        <button ref={(button)=>{this.likesButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='like' className='changeRecitationsButton'>Liked</button>
                        <button ref={(button)=>{this.favoritesButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='favorite' className='changeRecitationsButton'>Following {this.state.following}</button>
                        <button  ref={(button)=>{this.followersButton = button}}
                                onClick={this.changeRecitations.bind(this)}
                                id='followers' className='changeRecitationsButton'>Followers {this.state.followers}</button>
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

        if(sender === 'records') {
            this.setState({ showUploads: true, showPopular: false, showLikes: false, showFavorties: false, showFollowers:false, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'underline';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'none';
            this.followersButton.style.textDecoration = "none";
        } else if(sender === 'popular') {
            this.setState({ showUploads: false, showPopular: true, showLikes: false, showFavorties: false, showFollowers:false, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'underline';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'none';
            this.followersButton.style.textDecoration = "none";
        } else if(sender === 'like') {
            this.setState({ showUploads: false, showPopular: false, showLikes: true, showFavorties: false, showFollowers:false, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'underline';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'none';
            this.followersButton.style.textDecoration = "none";
        } else if(sender === 'favorite') {
            this.setState({ showUploads: false, showPopular: false, showLikes: false, showFavorties: true, showFollowers:false, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'underline';
            this.playlistButton.style.textDecoration = 'none';
            this.followersButton.style.textDecoration = "none";
        }else if(sender === 'followers') {
            this.setState({ showUploads: false, showPopular: false, showLikes: false, showFavorties: false, showFollowers:true, showPlaylists: false},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'none';
            this.followersButton.style.textDecoration = 'underline';
            this.playlistButton.style.textDecoration = 'none';

        }
        else if(sender === 'playlist') {
            this.setState({ showUploads: false, showPopular: false, showLikes: false, showFavorties: false, showFollowers:false, showPlaylists: true},
            () => { this.pushOntoPage(); });
            this.allButton.style.textDecoration = 'none';
            this.popularButton.style.textDecoration = 'none';
            this.likesButton.style.textDecoration = 'none';
            this.favoritesButton.style.textDecoration = 'none';
            this.playlistButton.style.textDecoration = 'underline';
            this.followersButton.style.textDecoration = "none";
        }
    }


    goToUploadPage() {
        document.body.scrollTop = 0;
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
        fireRef.child('Users').child(store.currentUser.userID).once('value', (snap) => {
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

    /** remove favorite  , replace with follow */

    loadFavoritedPlaylist(rStore, callback) {
        const fireRef = firebase.database().ref();
        //const storageRef = firebase.storage().ref();
        const store = rStore.getState();

        // The final playlist
        var playlist = new Userlist("Following");
        var i = 0;



        // Get all the like ids.
        fireRef.child('Users').child(store.currentUser.userID).once('value', (snap) => {
            var follows = snap.val().follow;


            if(follows) {
                follows.forEach( (e) => {
                    fireRef.child('Users').child(e).once('value', (rO) => {
                        var recObj = new User( rO.val().userID,
                                                    rO.val().photoURL,
                                                    rO.val().fullname,
                                                  );


                        playlist.add(recObj);

                        i++;



                        if(i === follows.length) {
                          this.setState({
                              favoritedPlaylist: playlist
                          });

                            callback();
                        }
                    });
                });



            } else {
                callback();
            }
        });
    }


    loadFollowersPlaylist(rStore, callback) {
        const fireRef = firebase.database().ref();
        //const storageRef = firebase.storage().ref();
        const store = rStore.getState();

        // The final playlist
        var playlist = new Userlist("Followers");
        var i = 0;



        // Get all the like ids.
        fireRef.child('Users').child(store.currentUser.userID).once('value', (snap) => {
            var followers = snap.val().followers;

            if(followers) {
                followers.forEach( (e) => {
                    fireRef.child('Users').child(e).once('value', (rO) => {
                        var recObj = new User( rO.val().userID,
                                                    rO.val().photoURL,
                                                    rO.val().fullname,
                                                  );


                        playlist.add(recObj);

                        i++;



                        if(i === followers.length) {

                          this.setState({
                              followersPlayList: playlist
                          });

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


        fireRef.child('Users').child(store.currentUser.userID).child('Playlists').once('value').then((snapshot)=> {
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
        else if(this.state.showFollowers=== true) {

            if(this.state.followersPlayList) {
                if(this.state.followersPlayList.length() === 0) { return; }
            } else { return; }


            // Create the array of recitation items.
            this.state.followersPlayList.forEach( (rec) => {
                recs.push(rec);
            }, () => {
                recs.sort((a,b)=>{
                    return b.favorites - a.favorites
                });

                recs.forEach((rec)=>{
                    var recItem = <UserItem margin='30px'
                                              key={rec.id}
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></UserItem>
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
                    var recItem = <UserItem margin='30px'
                                              key={rec.id}
                                              recitation={rec}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></UserItem>
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

export default Profile;
