import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import PageFooter from '../components/PageFooter';
import './supporting.css';

export default class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }


    getStyles() {
        return {
            position:'absolute',
            left:'0px',
            top:'0px',
            width:'100%'
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0', 
            backgroundColor: 'white'
        }
    }
    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1',
        }
    }
    getBannerTextStyles() {
        return {
            position:'relative',
            top:'20px',
            color:'white',
            textAlign:'center',
            fontSize:'100px',
            fontFamily:'Monthoers'
        }
    }

    getTitleStyles(){
      return{
        marginBottom:'50px'
      }
    }

    render() {
        return (

            <div style={this.getStyles()}>
            <HomeHeader nav={this.props.nav} rStore={this.props.rStore} callbackParent={this.onChildChanged} ></HomeHeader>
            <div style={this.getOverlay()}></div>
            <div className='resultsSection'>
            <div style={{ padding: '10px', color: 'black', textAlign: 'left', marginLeft: '25%', marginRight: '25%', fontFamily: 'Helvetica !important', fontSize: '14px !important'}}>
            
                <h3 style={{paddingBottom: '20px', fontFamily: 'Helvetica !important', fontSize: '14px !important'}}>Contact</h3>

                <p style={{color: '#424242', fontFamily: 'Helvetica', fontSize: '14px'}}>We’d love to hear from you. Please send any inquiries via email to <a href="mailto:hello@recitedverse.com">hello@recitedverse.com</a></p>
                <br/>
                
            </div>
            </div>
            <PageFooter bottom="-400px" />
            </div>

        )
    }
}