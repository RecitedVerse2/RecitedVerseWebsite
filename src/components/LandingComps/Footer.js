import React, { Component } from 'react';

import _ from '../../css/fonts.css';

import footerBackground from '../../../public/res/footerBackground.png';
import facebookBtn from '../../../public/res/FB-Icon.png';
import instagramBtn from '../../../public/res/IG-Icon.png';
import twitterBtn from '../../../public/res/TW-Icon.png';


class Footer extends Component {

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position: 'relative',
            width: '100%',
            height: '500px'
        };
    }
    getUpperStyles() {
        return {
            position: 'relative',
            top:'-15%',
            height: '250px',
            color: 'white'
        }
    }
    getImageStyle() {
        return {
            width: '100%',
            height: '250px',
            zIndex: 1
        }
    }
    getTextStyles() {
        return {
            position: 'relative',
            marginTop: '-20%',
            zIndex: 2,
            textAlign:'center'
        }
    }
    getLowerStyles() {
        return {
            position: 'relative',
            display: 'table',
            margin: 'auto',
            textAlign:'center'
        }
    }
    getButtonStyles() {
        return {
            width: '20%',
            height: '100px',
            color: 'black',
            border: 'none',
            background: 'none',
            display: 'table-cell'
        }
    }
    getIconStyle() {
        return {
            width:'60%'
        }
    }


    render() {
        return (
            <div style={this.getStyles()}>

                <div style={this.getUpperStyles()}>
                    <img style={this.getImageStyle()} alt='upper' src={footerBackground}></img>

                    <div style={this.getTextStyles()}>
                        <h1 style={{fontFamily:'Monthoers',fontSize:'80px'}}>about recited verse</h1>
                        <p style={{fontFamily:'NEBB', fontSize:'18px'}}>Recitation is interpretation! At RecitedVerse.com, we welcome your readings of your favorite poems. Our goal is to offer an unlimited number of readings for an unlimited number of poems throughout the ages and the world.</p>
                    </div>
                </div>


                <div style={{position:'relative',top:'-5%'}}>
                    <h1 style={{ fontFamily: 'Monthoers', fontSize: '80px', color: 'white', textAlign: 'center' }}>
                        Contact
                    </h1>

                    <div style={this.getLowerStyles()}>
                        <button style={this.getButtonStyles()}>
                            <img style={this.getIconStyle()} alt='contact' src={facebookBtn}></img>
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button style={this.getButtonStyles()}>
                            <img style={this.getIconStyle()} alt='contact' src={instagramBtn}></img>
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button style={this.getButtonStyles()}>
                            <img style={this.getIconStyle()} alt='contact' src={twitterBtn}></img>
                        </button>
                    </div>
                </div>
            </div>
        );
    }


};

export default Footer;
