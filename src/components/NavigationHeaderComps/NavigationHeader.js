import React, { Component } from 'react';

import RectButton from '../RectButton';

// The header that appears on every page. This is the sidebar menu and the search bar at the top.
class NavigationHeader extends Component {
    constructor() {
        super();
        this.state = {
            isOpen:false,
            left: '6%',
            searchWidth:'94%',
            menuWidth:'6%',
            homeName:'',
            profileName:'',
            signInName:'',
            registerName:'',
            textColor:'rgba(0,0,0,0)'
        };
    }

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    // Attemps to hide the navigation header
    hide() {
        this.nh.style.opacity = '0';
    }

    // Unhides the navigation header.
    unhide() {
        this.nh.style.opacity = '1';
    }

    getSearchDivStyles() {
        return {
            position: 'absolute',
            top: '0px',
            left: this.state.left,
            width: '94%',
            height: '45px'
        };
    }
    getSearchBarStyles() {
        return {
            position: 'fixed',
            left: this.state.left,
            width: this.state.searchWidth,
            height: '45px',
            border: 'none',
            zIndex: '90',
            fontSize: '17px',
            backgroundColor: 'white',
      	    transition: 'all 0.3s ease',
            backgroundImage: 'none',
            outline: '0',
            WebkitBoxShadow: 'none',
            boxShadow: 'none'
        };
    }
    getMenuBarStyle() {
        return {
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: this.state.menuWidth,
            height: '200%',
            backgroundColor: 'rgb(90,106,122)',
          	transition: 'all 0.3s ease',
            zIndex: '90'
        };
    }
    getMenuItemStyles() {
        return {
            fontSize:'12px',
            color: this.state.textColor,
            WebkitTransitionDuration: '0.5s'
        }
    }



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div ref={(NavigationHeader)=>{this.nh = NavigationHeader}}>
                <div  id='rv_searchBar' style={this.getSearchDivStyles()}>
                    <input ref={(input)=>{this.searchinput = input}} style={this.getSearchBarStyles()} type="search" placeholder=" Search..." onKeyPress={this.handleSearch.bind(this)}/>
                </div>

                <div id='rv_menuBar' style={this.getMenuBarStyle()}>
                    <RectButton width='100%' height='45px' backgroundColor='rgb(84,92,166)' hoverColor='darkslateblue' clickFunction={this.toggleMenu.bind(this)}>
                        <h6 style={{fontSize:'15px',paddingTop:'10px'}} className='fa fa-bars'></h6>
                    </RectButton>
                    <RectButton width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.goTo('home')}}>
                        <h6 style={{fontSize:'15px'}} className='fa fa-home'>
                            <p style={this.getMenuItemStyles()}>{this.state.homeName}</p>
                        </h6>
                    </RectButton>
                    <RectButton width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.handleGoToProfile()}}>
                        <h6 style={{fontSize:'15px'}} className='fa fa-user'>
                            <p style={this.getMenuItemStyles()}>{this.state.profileName}</p>
                        </h6>
                    </RectButton>
                    <RectButton width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.goTo('login')}}>
                        <h6 style={{fontSize:'15px'}} className='fa fa-sign-in'>
                            <p style={this.getMenuItemStyles()}>{this.state.signInName}</p>
                        </h6>
                    </RectButton>
                    <RectButton width='100%' height='45px' backgroundColor='rgb(98,119,140)' hoverColor='rgb(90,100,150)' clickFunction={()=>{this.goTo('signup')}}>
                        <h6 style={{fontSize:'15px'}} className='fa fa-user-plus'>
                            <p style={this.getMenuItemStyles()}>{this.state.registerName}</p>
                        </h6>
                    </RectButton>
                </div>
            </div>
        );
    }



    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    toggleMenu() {
        this.setState({
            isOpen: this.state.isOpen === false ? true : false,
            left: this.state.left === '6%' ? '12%' : '6%',
            searchWidth: this.state.searchWidth === '94%' ? '94%' : '88%',
            menuWidth: this.state.menuWidth === '6%' ? '12%' : '6%',
            textColor: this.state.textColor === 'rgba(0,0,0,0)' ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0)',
            homeName: this.state.homeName === '' ? 'Home' : '',
            profileName: this.state.profileName === '' ? 'Profile' : '',
            signInName: this.state.signInName === '' ? 'Sign In' : '',
            registerName: this.state.registerName === '' ? 'Register' : ''
        });
    }

    handleSearch(e) {
        if(e.key === 'Enter') {
            this.goTo('search');
            window.sessionStorage.setItem('Last_Search', this.searchinput.value);
        }
    }

    goTo(page) {
        if(this.state.isOpen === true) {
            this.toggleMenu();
        }
        if(page === 'home') {
            this.props.history.push('home');
        } else if(page === 'profile') {
            this.props.history.push('profile');
        } else if(page === 'login') {
            this.props.history.push('login');
        } else if(page === 'signup') {
            this.props.history.push('signup');
        } else if(page === 'editprofile') {
            this.props.history.push('editprofile');
        } else if(page === 'search') {
            this.props.history.push('search');
        } else if(page === 'poem') {
            this.props.history.push('poem');
        }
    }
    handleGoToProfile() {
        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            this.goTo('profile')
        } else {
            this.goTo('login');
        }
    }
}

export default NavigationHeader;
