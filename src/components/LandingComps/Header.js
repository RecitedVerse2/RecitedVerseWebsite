import React, { Component } from 'react';

import RVLogo from '../../res/RV-Final-Icon.png';
// eslint-disable-next-line
import _ from '../../css/fonts.css';
// eslint-disable-next-line
import __ from '../../css/Header.css';
import TextLogo from '../../res/recitedverselogo.png';

import Clock from '../Clock';


class Header extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            backgroundColor: 'rgba(0,0,0, 0.75)'
        }
    }




    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getHeaderStyle() {
        return {
            position: 'fixed',
            top:'0px',
            left:'0xp',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: 'white',
        }
    }
    getLogoStyle() {
        return {
            position:'absolute',
            top:'0px',
            left:'20px',
            width:'254px',
            height:'90%',
            cursor:'pointer',
            marginTop:'5px',
            display:'table-cell',
        }
    }
    getButtonsSectionStyle() {
        return {
            position:'absolute',
            top:'0px',
            right:'0px',
            textAlign:'right',
            marginTop:'20px',
            display:'table-cell',
        }
    }
    getButtonsStyle() {
        return {
            textDecoration:'none',
            border:'none',
            background:'none',
            color:'black',
            fontFamily:'HelveticaNeue',
            fontSize:'18px',
            padding:'0px 40px 0px 10px',
            outline:'none',
            fontWeight: 'bold'
        }
    }

     getWhiteSpanStyle() {
       return {
         color:'white'
       }
    }


    render() {
        return (
            <div className='header' style={this.getHeaderStyle()}>
                &nbsp;&nbsp;
                <img onClick={this.goToHome.bind(this)} alt='logo' style={this.getLogoStyle()} src={TextLogo}></img>

                <div style={this.getButtonsSectionStyle()}>
                <span style={this.getWhiteSpanStyle()} className="glyphicon glyphicon-log-in" ></span>
                    <button style={this.getButtonsStyle()} onClick={this.goToLogin.bind(this)}>Sign In</button>

                    &nbsp;&nbsp;&nbsp;&nbsp;

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

                <Clock onupdate={this.update.bind(this)}></Clock>
            </div>
        );
    }

    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    goToLogin() {
      window.location = 'login';
    }
    goToSignup() {
        window.location = 'signup';
    }

    goToHome() {
        window.location = '/home';
    }

    update() {
        if(document.body.scrollTop >= 30 || window.scrollY >= 30) {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0.85)'
            })
        } else {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0)'
            })
        }
    }

};

export default Header;
