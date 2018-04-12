import React, { Component } from 'react';
import * as firebase from 'firebase';

// eslint-disable-next-line
import _ from '../../css/fonts.css';

import backgroundImage from '../../res/BlankBanner.png';

import Recitation from '../../objects/Recitation';

class ROTDArea extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            recitation:null,
            audio:null
        }

        this.loadROTD();
    }

    componentDidMount() {
        
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'relative',
            top:'300px',
            width:'100%',
            marginTop: '50px',
            height:'400px',
            background: 'blue',
        }
    }
    getBackgroundStyles() {
        return {
            position:'relative',
            width:'100%',
            height:'100%'
        }
    }
    getROTDImageStyles() {
        return {
            position:'relative',
            marginTop:'-110px',
            width:'200px',
            height:'200px',
            cursor:'pointer',
            display:'inline-block'
        }
    }
    getTextStyles() {
        return {
            position:'relative',
            marginTop:'-30px',
            cursor:'pointer'
        }
    }
    getROTDStyles() {
        return {
            position:'relative',
            paddingLeft:'30px',
            color:'white',
            fontFamily:'Monthoers',
            display:'inline-block'
        }
    }




    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={{display: 'block', marginTop: '50px'}}>
            <h1>test</h1>
             </div>
        );
    }



    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    /** Takes you to the poem page about the recitation of the day. */
    goToPage() {
        window.sessionStorage.setItem('CurrentRecitation', JSON.stringify(this.state.recitation));
        this.props.nav.goTo('poem');
    }


    /** Loads a random recitation to use as the Recitation of the Day */
    loadROTD() {
        const fireRef = firebase.database().ref();
        const storageRef = firebase.storage().ref();


        fireRef.child('ROTD').once('value', (snap) => {
            var id = snap.val();

            fireRef.child('Recitations').child(id).once('value', (rO) => {
                
                storageRef.child('Recitations').child(id).getDownloadURL().then( (url) => {
                    var audio = new Audio(url);
                    audio.loop = false;

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
                                                audio,
                                                rO.val().timestamp,
                                                null );

                    this.setState({
                        recitation: recObj,
                        audio: audio
                    });
                });
            });
        });
    }

}

export default ROTDArea;