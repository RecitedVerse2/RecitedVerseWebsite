import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

// eslint-disable-next-line
import _ from '../css/Poem.css';
// eslint-disable-next-line
import __ from '../css/Header.css';

import RVLogo from '../res/RV-Final-Icon.png';

import HomeHeader from '../components/HomePageComponents/HomeHeader';
import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import Clock from '../components/Clock';
import ProfileBanner from '../components/User/ProfileBanner';

import Recitation from '../objects/Recitation';

import RecitationItem2 from '../components/ProfilePageComps/RecitationItem2';
import RecitationItem from '../components/ProfilePageComps/RecitationItem';
import PlaylistItem from '../components/ProfilePageComps/PlaylistItem';
import Playlist from '../objects/Playlist';
import Userlist from '../objects/Userlist';
import UserObject from '../objects/User';
import UserItem from '../components/ProfilePageComps/UserItem';
import PageFooter from '../components/PageFooter';

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
            uid:'',
            my_uid:'',

            // Temporary recitation when the page first loads, just to let the user know
            // that something is loading.
            recitations:[]
        }


    }

    componentDidMount() {
      //this.props.match.params.id
        const store = this.props.rStore.getState();
        var recitation = JSON.parse(window.sessionStorage.getItem('CurrentRecitation'));





   //    var user = firebase.database().ref("User/"+recitation.uploaderID).child()



      var url = window.location.href;
      var n = url.indexOf("user");
      var uid = url.substring(n+5);
      this.state.uid = uid;

      var cUser = JSON.parse(window.localStorage.getItem('currentUser'));





       firebase.database().ref().child('Users').child(uid).once('value', (snap) => {
           var user = snap.val();

         firebase.database().ref().child('Users').child(cUser.userID).once('value').then((snap2)=>{
               var usr =  snap2.val();
               var follow = usr.follow || [];

               if(!follow.includes(uid)) {
                 user.follow = "Follow"
               }else{
                 user.follow = "Followed"
               }
               this.setState({userInfo:user});
             });


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
            backgroundColor: 'white',
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
                <div style={this.getOverlay()}></div>

                {/* The banner with the sign in text */}
                <ProfileBanner changeFollowStatus={(e)=>{this.changeFollowStatus(e)}}  userInfo={this.state.userInfo} rStore={this.props.rStore}>
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
                                id='favorite' className='changeRecitationsButton'>Following</button>
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
    *       METHODS       *
    *                     *
    ***********************/

    changeFollowStatus(){
      var user = this.state.userInfo;

      if(this.state.userInfo.follow == "Follow"){
        user.follow = "Followed";
        this.setState({userInfo:user});
        this.NotificationAddFollow(user)

      }else{
        user.follow = "Follow";
        this.setState({userInfo:user});

      }

       this.changeFirebaseFollow(this.state.userInfo.userID);

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


    NotificationAddFollow(user){

      const store = this.props.rStore.getState();
      const follower = store.currentUser;
      var userID = user.userID;
      console.log(follower);


      var key = "follow_" + follower.userID;
      console.log(userID);
      console.log(key);

      firebase.database().ref().child('Notifications').child(userID).child(key).once('value', (snap) => {
        var record = snap.val();
        if(!record){
            var data = {'type': 'follow',
                         'photoURL': follower.photoURL,
                         'userID': follower.userID,
                         'userName': follower.fullname,
                         'timestamp': Date.now(),
                         'timestampDESC': -Date.now()
                       };

            firebase.database().ref().child('Notifications').child(userID).child(key).set(data);
            this.userNotificationIncease(userID);


        }

      });
    }

    userNotificationIncease(uid){
      firebase.database().ref().child('Users').child(uid).once('value').then((snap)=>{
          var user = snap.val()
          var notifications = 1;
          if(user.notifications){
             notifications = user.notifications + 1;
          }

          firebase.database().ref().child('Users').child(uid).update({
              'notifications': notifications
          });

      });
    }


    changeFirebaseFollow(his_uid) {
      const fireRef = firebase.database().ref();
      const store = this.props.rStore.getState();
      const uid = store.currentUser.userID;


      fireRef.child('Users').child(uid).once('value').then((snap)=>{
          var usr =  snap.val();
          var follow = usr.follow || [];

          if(!follow.includes(his_uid)) {
              follow.push(his_uid);
              fireRef.child('Users').child(uid).child('follow').set(follow);

          } else {
              this.remove(follow, his_uid);
              fireRef.child('Users').child(uid).child('follow').set(follow);

          }

          usr.follow = follow;
          window.localStorage.setItem('currentUser',JSON.stringify(usr));
      });
    }

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

        fireRef.child('Recitations').orderByChild('uploaderID').equalTo(this.state.uid).once('value').then((snapshot)=> {
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
        fireRef.child('Users').child(this.state.uid).once('value', (snap) => {
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
        var playlist = new Userlist("Following");
        var i = 0;

        // Get all the like ids.
        fireRef.child('Users').child(this.state.uid).once('value', (snap) => {
            var follows = snap.val().follow;
            if(follows) {
                follows.forEach( (e) => {
                    fireRef.child('Users').child(e).once('value', (rO) => {
                      console.log(e);
                        var recObj = new UserObject( rO.val().userID,
                                                    rO.val().photoURL,
                                                    rO.val().fullname,
                                                  );


                        playlist.add(recObj);
                        console.log(playlist);

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

    /** Loads all of the user's playlists. */
    loadPlaylists(rStore, callback) {
        const fireRef = firebase.database().ref();
        const store = rStore.getState();

        let playlists = [];


        fireRef.child('Users').child(this.state.uid).child('Playlists').once('value').then((snapshot)=> {
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




export default User;
