import React, { Component } from 'react';

import RVLogo from '../../../public/res/RV-Final-Icon.png';
import _ from '../../css/fonts.css';

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
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: this.state.backgroundColor,
            WebkitTransitionDuration: '0.3s'
        }
    }
    getLogoStyle() {
        return {
            position:'relative',
            left:'20px',
            top:'-20px',
            width:'80px',
            height:'90%',
            cursor:'pointer',
            display:'table-cell'
        }
    }
    getButtonsSectionStyle() {
        return {
            position:'relative',
            display:'table-cell',
            top:'35%',
            textAlign:'right'
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
            <div style={this.getHeaderStyle()}>
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
        if(document.body.scrollTop >= 30) {
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
