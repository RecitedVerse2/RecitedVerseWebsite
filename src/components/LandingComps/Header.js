import React, { Component } from 'react';


class Header extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/





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
        }
    }
    getLogoStyle() {
        return {
            position:'relative',
            left:'20px',
            top:'-20px',
            width:'60px',
            height:'90%',
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
            color:'white'
        }
    }


    render() {
        return (
            <div style={this.getHeaderStyle()}>
                &nbsp;&nbsp;
                <img alt='logo' style={this.getLogoStyle()} src='https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FRVLogo3.png?alt=media&token=bad950d5-b76f-44bf-b4a2-d738fee89249'></img>

                <div style={this.getButtonsSectionStyle()}>
                    <button style={this.getButtonsStyle()} onClick={this.goToLogin.bind(this)}>Login</button>
                    <button style={this.getButtonsStyle()} onClick={this.goToSignup.bind(this)}>Sign Up</button>
                </div>
            </div>
        );
    }

    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    goToLogin() {
        this.props.navHeader.goTo('login');
    }
    goToSignup() {
        this.props.navHeader.goTo('signup');
    }

};

export default Header;
