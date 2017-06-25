import React, { Component } from 'react';

import _ from '../../css/fonts.css';

import Background from '../../res/BlankBanner.png';


class LandingPageCarousel extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            name:'User'
        }
    }

    componentDidMount() {
        const store = this.props.rStore.getState();

        // Check for null objects.
        if(this.props.rStore.getState().currentUser == null) {
            var cUser = JSON.parse(window.localStorage.getItem('currentUser'));
            
            // If the window's current use is/isn't null...
            if(cUser === null || cUser === undefined) {
                this.props.nav.goTo('home');
                return;
            } else {
                this.props.rStore.dispatch({
                    type:'LOGIN',
                    currentUser: cUser
                });              
            }
        }

        if(store.currentUser != null) {
            this.setState({
                name:store.currentUser.fullname.substring(0,store.currentUser.fullname.indexOf(' '))
            })
        }
    }



    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'relative',
            top:'70px',
            width:'100%'
        }
    }
    getImageStyle() {
        return {
            width:'100%',
            height:'100%'
        }
    }
    getWelcomeStyles() {
        return {
            position:'absolute',
            top:'80px',
            width:'100%',
            color:'white',
            margin:'auto',
            textAlign:'center'
        }
    }
    getSBStyles() {
        return {
            position:'relative',
            width:'60%',
            height:'50px',
            margin:'auto',   
            display:'table',
            borderRadius:'25px',       
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSearchBarStyle() {
        return {
            position:'absolute',
            marginTop:'0px',
            width:'12%',
            height:'100%',
            float:'left',
            fontSize:'25px',
            fontFamily:'NEB',
            WebkitPaddingBefore: '10px',
            display:'table-cell',
        }
    }
    getInputStyles() {
        return {
            position:'absolute',
            left:'12%',
            width: '88%',
            height:'100%',
            border:'none',
            color:'white',
            outline:'none',
            background:'none',
            textDecoration:'none',
            fontFamily:'NEB',
            fontSize:'30px',
            MozPaddingBefore:'-10px',
            paddingLeft:'10px',
            display:'table-cell'
        }
    }




    render() {
        return (
            <div style={this.getStyles()}>
                <img alt='bckg' style={this.getImageStyle()} src={Background}/>

                    <div style={this.getWelcomeStyles()}>
                        <h1 style={{fontFamily:'NEB', fontSize:'35px', paddingBottom:'10px'}}>Welcome</h1>
                        <h1 style={{fontFamily:'Monthoers', fontSize:'90px'}}>{this.state.name}</h1>
                    
                        <div ref={(div)=>{this.searchBarArea = div}} style={this.getSBStyles()}>
                            <h1 style={this.getSearchBarStyle()}>Search:</h1>
        
                            <input onKeyPress={this.handleSearch.bind(this)} 
                                    ref={(input)=>{this.searchBar = input}} 
                                    style={this.getInputStyles()} type='text' />
                            
                        </div>
                    </div>
            </div>
        );
    }



    handleSearch(e) {
        if(e.key === 'Enter') {
            window.sessionStorage.setItem('LastSearch', this.searchBar.value);
            this.props.nav.goTo('search');
        }
    }




};

export default LandingPageCarousel;
