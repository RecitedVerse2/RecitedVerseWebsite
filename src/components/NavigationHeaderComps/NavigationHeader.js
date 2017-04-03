import React, { Component } from 'react';

import RectButton from '../RectButton';

// The header that appears on every page. This is the sidebar menu and the search bar at the top.
class NavigationHeader extends Component {
    getSearchDivStyles() {
        return {
            position: 'absolute',
            top: '0px',
            left: '6%',
            width: '100%',
            height: '45px',
            backgroundColor: 'dodgerblue'
        };
    }
    getSearchBarStyles() {
        return {
            position: 'fixed',
            left: '6%',
            width: '94%',
            height: '45px',
            border: 'none',
            zIndex: '10',
            fontSize: '17px',
            backgroundColor: 'white',
      	    transition: 'all 0.3s ease'
        };
    }
    getMenuBarStyle() {
        return {
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: '6%',
            height: '200%',
            backgroundColor: 'rgb(90,106,122)',
          	transition: 'all 0.3s ease'
        };
    }


    render() {
        return (
            <div>
                <div style={this.getSearchDivStyles()}>
                    <input style={this.getSearchBarStyles()} type="search" placeholder=" Search..." />
                </div>

                <div style={this.getMenuBarStyle()}>
                    <RectButton title='|||' width='100%' height='45px' backgroundColor='rgb(84,92,166)' hoverColor='darkslateblue' clickFunction={this.toggleMenu()}></RectButton>
                    <RectButton title="Home" width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.goTo('home')}}></RectButton>
                    <RectButton title="My Account" width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.goTo('profile')}}></RectButton>
                    <RectButton title="Login" width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.goTo('login')}}></RectButton>
                    <RectButton title="Register" width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.goTo('signup')}}></RectButton>
                </div>
            </div>
        );
    }


    toggleMenu() {

    }
    goTo(page) {
        if(page === 'home') {
            this.props.goToHome();
        } else if(page === 'profile') {
            this.props.goToProfile();
        } else if(page === 'login') {
            this.props.goToLogin();
        } else if(page === 'signup') {
            this.props.goToSignUp();
        }
    }
}

export default NavigationHeader;
