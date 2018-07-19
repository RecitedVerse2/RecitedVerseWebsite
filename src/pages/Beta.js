import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import PageFooter from '../components/PageFooter';
import './supporting.css';

export default class Beta extends Component {
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
            <div className="rcsupport"  style={{ padding: '10px', color: 'black', textAlign: 'left', marginLeft: '25%', marginRight: '25%'}}>
            
                <h3 style={{paddingBottom: '20px', paddingTop: '20px'}}>Beta Testing</h3>
                <p style={{fontSize: '16px'}} >Recited Verse is currently undergoing BETA site testing. We kindly ask that, as a beta site user, you:</p>

<ul style={{listStyleType: 'circle'}} >
    <li style={{listStyleType: 'circle' }}>Contribute as many recordings of your favorite poems as you can to help us expand our preliminary archive. </li>
    <li style={{listStyleType: 'circle'}}>Provide us with any positive or constructive feedback to help us continue improving the site.</li>
    <li style={{listStyleType: 'circle'}}>Recommend to us other users who would be interested in participating in this BETA site test-run. Email us their information to <a href="mailto:hello@recitedverse.com"> hello@recitedverse.com</a>. Include their name, email address, and a brief explanation as to why they would be optimal contributors during this trial-run period. Use the subject line: “Beta User Recommendation.”</li>
</ul>                

            </div>
            </div>
            <PageFooter bottom='-300px'>
                </PageFooter>
            </div>

        )
    }
}