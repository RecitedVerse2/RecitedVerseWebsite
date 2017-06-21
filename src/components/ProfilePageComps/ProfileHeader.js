import React, { Component } from 'react';
import * as firebase from 'firebase';

import RVLogo from '../../../public/res/RV-Final-Icon.png';
import _ from '../../css/fonts.css';
import __ from '../../css/Header.css';

import Clock from '../Clock';

class ProfileHeader extends Component {

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
            fontFamily:'NEB',
            fontSize:'17px',
            outline:'none'
        }
    }


    render() {
        return (
            <div className='header' style={this.getHeaderStyle()}>
                &nbsp;&nbsp;
                <img alt='logo' onClick={this.goToHomePage.bind(this)} style={this.getLogoStyle()} src={RVLogo}></img>

                <div style={this.getButtonsSectionStyle()}>
                    <button style={this.getButtonsStyle()} onClick={this.goToSettings.bind(this)}>Account Settings</button>
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <button style={this.getButtonsStyle()} onClick={this.handleLogout.bind(this)}>Logout</button>
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

    goToHomePage() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('home');
    }
    goToSettings() {
        document.body.scrollTop = 0;
        this.props.nav.goTo('accountsettings');
    }
    handleLogout() {
        try {
            firebase.auth().signOut();
            window.localStorage.removeItem('currentUser');
            this.props.rStore.dispatch({
                type:'LOGOUT'
            });
        } catch(err) {
            console.log('Problem logging out. ' + err);
            return;
        }

        document.body.scrollTop = 0;
        this.props.nav.goTo('login');
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

export default ProfileHeader;
