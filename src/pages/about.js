import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';

export default class About extends Component {
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
            <div style={{ padding: '10px', color: 'black', textAlign: 'left', marginLeft: '20%', marginRight: '20%'}}>
            
                <h3>ABOUT:</h3>

                <p>Currently under BETA testing mode, Recited Verse is an online community dedicated to creating and sharing original audio recordings of poetry. The archive of spoken verse is entirely user-generated and brings together original audio recordings of poems of all ages and cultures. Recited Verse users can easily record and listen to poetry at home, on the road, or in the classroom.</p>
                <br/>
                <p>Once fully launched, Recited Verse users will be able to:</p>
                <ul>
                    <li>Create and/or upload an unlimited number of audio recordings of poems onto one’s personal profile </li>
                    <li>Share those audio recordings with the rest of the RV online community</li>
                    <li>Listen to other users’ audio recordings, make use of our “liking” feature, and generate lists of favorite recordings</li>
                    <li>Compile and share playlists of recordings arranged according to themes, moods, poets, literary periods, genres, or other creative tags</li>
                    <li>Enjoy and follow others’ playlists</li>
                    <li>Connect with other users through our comments feature</li>
                    <li>Follow specific RV users and receive notifications when they have submitted new recordings</li>
                    <li>Establish and expand one’s own set of followers and alert followers automatically when you have shared new recordings</li>
                    <li>Discover the work of new poets who choose to share their original poetry on Recited Verse</li>
                    <li>Learn about local events, including poetry readings, exhibits, socials, and more</li>
                    <li>Join online groups for poetry enthusiasts of common interests or location</li>
                </ul>

            </div>
            </div>
            </div>

        )
    }
}