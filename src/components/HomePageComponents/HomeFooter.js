import React, { Component } from 'react';
import * as firebase from 'firebase';

import _ from '../../css/fonts.css';

import backgroundImage from '../../../public/res/BlankBanner.png';

class HomeFooter extends Component {

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
            width:'200px',
            height:'200px',
            cursor:'pointer',
            display:'table-cell'
        }
    }
    getTextStyles() {
        return {
            position:'relative',
            marginTop:'-30px',
            cursor:'pointer'
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

                    <div style={{position:'relative',paddingLeft:'30px',top:'-130px',color:'white',display:'table-cell'}}>
                        <h1 style={{position:'relative',top:'-20px',fontFamily:'Monthoers',fontSize:'40px'}}>Recitation of the day</h1>
                        <p onClick={this.goToPage.bind(this)} style={{cursor:'pointer',fontFamily:'Monthoers',fontSize:'25px'}}>{this.state.recitation != null ? this.state.recitation.title : ""}</p>
                        <p onClick={this.goToPage.bind(this)} style={{cursor:'pointer',fontFamily:'Monthoers',fontSize:'20px'}}>Genre: {this.state.recitation != null ? this.state.recitation.genre : ""}</p>
                        
                        <p style={{cursor:'pointer',fontFamily:'Monthoers',fontSize:'20px'}} ref={(p)=>{this.playButton = p}}  onClick={this.goToPage.bind(this)}>
                            Recited By: {this.state.recitation != null ? this.state.recitation.recited_by : ""}
                        </p>
                    </div>
                </div>
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
        window.sessionStorage.setItem('CurrentRecitation', JSON.stringify(this.props.recitation));
        this.props.nav.goTo('poem');
    }


    /** Loads a random recitation to use as the Recitation of the Day */
    loadROTD() {
        const fireRef = firebase.database().ref();
        const storageRef = firebase.storage().ref();


        fireRef.child('ROTD').once('value', (snap) => {
            var id = snap.val();

            fireRef.child('Recitations').child(id).once('value', (rec) => {
                var recitation = rec.val();

                storageRef.child(recitation.uploaderID).child(id).getDownloadURL().then( (url) => {
                    var audio = new Audio(url);
                    audio.loop = false;

                    recitation.audio = audio;
                    this.setState({
                        recitation: recitation,
                        audio: audio
                    });
                });
            });
        });
    }

}

export default HomeFooter;