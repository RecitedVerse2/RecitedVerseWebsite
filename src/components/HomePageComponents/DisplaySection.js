import React, { Component } from 'react';
import * as firebase from 'firebase';

// eslint-disable-next-line
import _ from '../../css/fonts.css';

import Playlist from '../../objects/Playlist';
import Recitation from '../../objects/Recitation';
import RecitationItem from '../../components/ProfilePageComps/RecitationItem';

class DisplaySection extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor(props) {
        super(props);

        this.state = {
            popularPlaylist:null,
            recentPlaylist:null,
            recitations: []
        }

        // Load the appropriate playlist.
        const fireRef = firebase.database().ref();

        // Load recitations based on this display's name.
        if(this.props.name === 'Trending') {
            this.loadMostPopular(fireRef, (playlist) => {
                this.createRecitationItems(playlist)
            });
        } else if(this.props.name === 'Recent') {
            this.loadMostRecent(fireRef, (playlist) => {
                this.createRecitationItems(playlist)
            });
        }
    }

    /** Creates an array of components that display the recitations. */
    createRecitationItems(playlist) {
        // Get all of the recitations from the playlist.
        var itms = [];
        playlist.forEach( (rec) => {
            var recItm = <RecitationItem key={rec.timestamp}
                                        recitation={rec}
                                        nav={this.props.nav}
                                        rStore={this.props.rStore}></RecitationItem>
            itms.push(recItm);
            this.setState({
                recitations: itms
            });
        });
    }



    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getGridStyles() {
        return {
            position:'relative',
            top:this.props.top,
            width:'100%',
            left:'0px',
            bottom:'50px'
        }
    }
    getTitleStyles() {
        return {
            color:'black',
            fontFamily:'Arimo',
            fontSize:'50px',
            marginLeft: '5%',
        }
    }
    getDisplaySectionStyles() {
        return {
            position:'relative',
            top:'20px',
            width:'100%',
            margin:'auto',
            textAlign:'center'
        }
    }
    getSliderButtonStylesLeft() {
        return {
            position:'absolute',
            top:'100px',
            left:'5px',
            color:'black',
            fontSize:'70px',
            border:'none',
            outline:'none',
            background:'none',
            textDecoration:'none'
        }
    }
    getSliderButtonStylesRight() {
        return {
            position:'absolute',
            top:'100px',
            right:'5px',
            color:'black',
            fontSize:'70px',
            border:'none',
            outline:'none',
            background:'none',
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
            <div style={this.getGridStyles()}>

                <div style={this.getTitleStyles()}>
                    {this.props.title}
                </div>

                {/* Displays the recitations in a slider type area. */}
                <div style={this.getDisplaySectionStyles()}>
                    <button onClick={this.slideRight.bind(this)}
                            style={this.getSliderButtonStylesLeft()}
                            className='fa fa-caret-left'></button>

                    {this.state.recitations[0]}
                    {this.state.recitations[1]}
                    {this.state.recitations[2]}
                    {this.state.recitations[3]}
                    {this.state.recitations[4]}
    

                    <button onClick={this.slideLeft.bind(this)}
                            style={this.getSliderButtonStylesRight()}
                            className='fa fa-caret-right'></button>
                </div>
                <br/>
            </div>
        );
    }


    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    // Loads the 8 most popular recitations.
    loadMostPopular(fireRef, callback) {
        var playlist = new Playlist("Popular");

        fireRef.child('Recitations').orderByChild('plays').limitToFirst(8).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((rO) => {
                // Make a recitation object and add it to the playlist.
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
                                             playlist );
                playlist.add(recObj);

                playlist.recitations.sort( (a, b) => {
                    return b.plays - a.plays;
                });
            });
            this.setState({
                popularPlaylist: playlist
            });
            callback(playlist);
        });
    }


    // Loads the 8 most recently uploaded recitations.
    loadMostRecent(fireRef, callback) {
        var playlist = new Playlist("Recently Uploaded");
        var nowMS = Date.now();
        fireRef.child('Recitations').orderByChild('timestamp').endAt(nowMS).limitToFirst(8).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((rO) => {

                // Make a recitation object and add it to the playlist.
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
                                             playlist );
                playlist.add(recObj);

                playlist.recitations.sort( (a, b) => {
                    return b.timestamp - a.timestamp;
                });
            });
            this.setState({
                recentPlaylist: playlist
            });
            callback(playlist);
        });
    }


    // Changes the order of the recitations in the array to give the allusion of a slider
    slideLeft() {
        var first = this.state.recitations[0];
        var temp = this.state.recitations;

        for(var i = 0; i < this.state.recitations.length - 1; i++) {
            temp[i] = temp[i+1];
        }

        temp[this.state.recitations.length - 1] = first;

        this.setState({
            recitations: temp
        });
    }

    // Changes the order of the recitations in the array to give the allusion of a slider
    slideRight() {
        var last = this.state.recitations[this.state.recitations.length - 1];
        var temp = this.state.recitations;

        for(var i = this.state.recitations.length - 1; i > 0; i--) {
            temp[i] = temp[i - 1];
        }

        temp[0] = last;

        this.setState({
            recitations: temp
        });
    }
};

export default DisplaySection;
