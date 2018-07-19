import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import './supporting.css';
import PageFooter from '../components/PageFooter';

export default class Privacy extends Component {
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
            <div className="rcsupport" style={{ padding: '10px', color: 'black', textAlign: 'left', marginLeft: '25%', marginRight: '25%'}}>
            
                <h3 style={{paddingBottom: '20px', paddingTop: '20px'}}>Privacy</h3>
                <p>As a Recited Verse user, you share certain personal information with other users, including your name, personal photo, location, and occupation. We do not share your personal information with any other organizational entities, including businesses or other third parties.</p>
                <p>When you interact with our services, we collect the information that you choose to share with us. We may use information that we collect about you to perform research and analysis about your use of, or interest in, Recited Verse. We will also communicate with you by email about any updates to our services.</p>
                <p>If you have any questions about this Privacy Policy, please contact us by email <a href="mailto:hello@recitedverse.com"> hello@recitedverse.com</a></p>               

            </div>
            </div>
            <PageFooter bottom="-300px" />
            </div>

        )
    }
}