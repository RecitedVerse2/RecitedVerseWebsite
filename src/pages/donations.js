import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import './supporting.css';
import PageFooter from '../components/PageFooter';

export default class Donations extends Component {
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
            
                <h3 style={{paddingBottom: '20px'}}>Support and Donate to Recited Verse:</h3>

                <p>We are currently looking for donations to be able to expand our team of developers. If you are interested in donating to Recited Verse, please send a message to <a href="mailto:hello@recitedverse.com"> hello@recitedverse.com</a></p>

                
            </div>
            </div>
            <PageFooter bottom="-300px" />
            </div>

        )
    }
}