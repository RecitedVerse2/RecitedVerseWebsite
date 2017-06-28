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
            backgroundColor: this.state.backgroundColor
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
            fontFamily:'NEB',
            fontSize:'17px',
            outline:'none'
        }
    }


    render() {
        return (
            <div className='header' style={this.getHeaderStyle()}>
                &nbsp;&nbsp;
                <img onClick={this.goToHomePage.bind(this)} alt='logo' style={this.getLogoStyle()} src={RVLogo}></img>

                <div style={this.getButtonsSectionStyle()}>
                    <button style={this.getButtonsStyle()} onClick={this.goToAccountSettings.bind(this)}>Account Settings</button>
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <button style={this.getButtonsStyle()} onClick={this.goToPRofile.bind(this)}>Profile</button>
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

    goToAccountSettings() {
        const store = this.props.rStore.getState();
        document.body.scrollTop = 0;

        if(store.currentUser !== null) {
            this.props.nav.goTo('accountsettings');
        } else {
            this.props.nav.goTo('login');
        }
    }
    
    goToPRofile() {
        const store = this.props.rStore.getState();
        document.body.scrollTop = 0;

        if(store.currentUser !== null) {
            this.props.nav.goTo('profile');
        } else {
            this.props.nav.goTo('login');
        }
    }

    goToHomePage() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('/');
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
