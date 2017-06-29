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
            height:'250px'
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
            <div style={this.getStyles()}>
                <img alt='abc' src={backgroundImage} style={this.getBackgroundStyles()} />

                
                <div style={{position:'relative',marginTop:'-220px',marginLeft:'auto',marginRight:'auto',display:'table'}}>
                    <img onClick={this.goToPage.bind(this)} alt='ROTD' src={this.state.recitation != null ? this.state.recitation.image : ''} style={this.getROTDImageStyles()} />

                    <div style={this.getROTDStyles()}>
                        <h1 style={{fontSize:'40px'}}>Recording of the day</h1>
                        <p style={{fontFamily:'HelveticaNeue',fontSize:'16px'}} onClick={this.goToPage.bind(this)}>Title: {this.state.recitation != null ? this.state.recitation.title : ""}</p>
                        <p style={{fontFamily:'HelveticaNeue',fontSize:'16px'}} onClick={this.goToPage.bind(this)}>Genre: {this.state.recitation != null ? this.state.recitation.genre : ""}</p>
                        
                        <p style={{fontFamily:'HelveticaNeue',fontSize:'16px'}} ref={(p)=>{this.playButton = p}} onClick={this.goToPage.bind(this)}>
                            Recited By: {this.state.recitation != null ? this.state.recitation.recitedBy : ""}
                        </p>
                    </div>
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