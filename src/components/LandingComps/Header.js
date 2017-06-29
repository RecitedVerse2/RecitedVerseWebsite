import React, { Component } from 'react';

import RVLogo from '../../res/RV-Final-Icon.png';
// eslint-disable-next-line
import _ from '../../css/fonts.css';
// eslint-disable-next-line
import __ from '../../css/Header.css';

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
            backgroundColor: 'rgba(0,0,0,0)'
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
            backgroundColor: this.state.backgroundColor,
        }
    }
    getLogoStyle() {
        return {
            position:'absolute',
            top:'0px',
            left:'20px',
            width:'80px',
            height:'90%',
            cursor:'pointer',
            marginTop:'5px',
            display:'table-cell'
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
            color:'white',
            fontFamily:'HelveticaNeue',
            fontSize:'14px',
            outline:'none'
        }
    }


    render() {
        return (
            <div className='header' style={this.getHeaderStyle()}>
                &nbsp;&nbsp;
                <img onClick={()=>{document.body.scrollTop = 0;this.props.nav.goTo('home')}} alt='logo' style={this.getLogoStyle()} src={RVLogo}></img>

                <div style={this.getButtonsSectionStyle()}>
                    <button style={this.getButtonsStyle()} onClick={this.goToLogin.bind(this)}>Login</button>
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <button style={this.getButtonsStyle()} onClick={this.goToSignup.bind(this)}>Sign Up</button>
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
        document.body.scrollTop = 0;
        this.props.nav.goTo('login');
    }
    goToSignup() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('signup');
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
