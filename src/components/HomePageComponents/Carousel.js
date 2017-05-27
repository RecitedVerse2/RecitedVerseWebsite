import React, { Component } from 'react';

import _ from '../../css/fonts.css';

import Background from '../../../public/res/background.png';


class LandingPageCarousel extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            user:null
        }
    }

    componentDidMount() {
        const store = this.props.rStore.getState();

        this.setState({
            user: store.currentUser
        })
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
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSearchBarStyle() {
        return {
            position:'relative',
            top:'-10px',
            left:'10px',
            float:'left',
            display:'inline-block',
            textAlign:'left',
            fontFamily:'NEB',
            fontSize:'30px',
        }
    }
    getInputStyles() {
        return {
            position:'relative',
            margin:'auto',
            float:'left',
            left:'20px',
            width:'70%',
            height:'100%',
            display:'inline-block',
            border:'none',
            fontSize:'30px',
            background:'none',
            textDecoration:'none',
            WebkitBoxShadow: 'none',
            boxShadow: 'none',
            outline: '0'
        }
    }




    render() {
        return (
            <div style={this.getStyles()}>
                <img alt='bckg' style={this.getImageStyle()} src={Background}/>

                    <div style={this.getWelcomeStyles()}>
                        <h1 style={{fontFamily:'NEB', fontSize:'35px', paddingBottom:'10px'}}>Welcome</h1>
                        <h1 style={{fontFamily:'Monthoers', fontSize:'90px'}}>{this.state.user !== null ? this.state.user.fullname : "User"}</h1>
                    
                        <div style={this.getSBStyles()}>
                            <h1 style={this.getSearchBarStyle()}>Search:</h1>
                            <input style={this.getInputStyles()} type='text' />
                        </div>
                    </div>
            </div>
        );
    }


};

export default LandingPageCarousel;
