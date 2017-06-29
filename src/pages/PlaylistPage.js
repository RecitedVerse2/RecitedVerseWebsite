import React, { Component } from 'react';

import backgroundImage from '../res/brickBackground.jpg';
import RVLogo from '../res/RV-Final-Icon.png';

// eslint-disable-next-line
import _ from '../css/Playlist.css';

import PageFooter from '../components/PageFooter';
import RecitationItem from '../components/ProfilePageComps/RecitationItem';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import Clock from '../components/Clock';

import Playlist from '../objects/Playlist';
import Recitation from '../objects/Recitation';

class PlaylistPage extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            playlist: null,
            recitations: []
        }
    }

    componentDidMount() {
        var loadedPlaylist = JSON.parse(window.sessionStorage.getItem('CurrentPlaylist'));
        var playlist = new Playlist(loadedPlaylist.name);
        var recs = [];

        if(loadedPlaylist !== null) {
            loadedPlaylist.recitations.forEach( (rec) => {
                var rO = new Recitation(rec.id, rec.uploaderID, rec.uploaderName, rec.image, rec.title, rec.author, rec.recitedBy, rec.published, rec.genre, rec.description, 
                                        rec.likes, rec.plays, rec.favorites, rec.text, rec.audio, rec.timestamp, playlist);
                playlist.add(rO);
                
                var recItem = <RecitationItem margin='30px'
                                              key={rec.id} 
                                              recitation={rO}
                                              nav={this.props.nav}
                                              rStore={this.props.rStore}></RecitationItem>
                recs.push(recItem);


                // Set the state.
                this.setState({
                    playlist: playlist,
                    recitations: recs
                });
            });
        }
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'absolute',
            left:'0px',
            top:'0px',
            width:'100%'
        }
    }
    getHeaderStyle() {
        return {
            position: 'fixed',
            top:'0px',
            left:'0xp',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: this.state.backgroundColor
        }
    }
    getLogoStyle() {
        return {
            position:'absolute',
            top:'0px',
            left:'20px',
            width:'80px',
            height:'90%',
            cursor:'pointer',
            marginTop:'5px',
            display:'table-cell'
        }
    }
    getButtonsSectionStyle() {
        return {
            position:'absolute',
            top:'0px',
            right:'0px',
            textAlign:'right',
            marginTop:'20px',
            display:'table-cell',
        }
    }
    getButtonsStyle() {
        return {
            textDecoration:'none',
            border:'none',
            background:'none',
            color:'white',
            fontFamily:'NEB',
            fontSize:'17px',
            outline:'none'
        }
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }
    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1'
        }
    }




    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                {/* The header area */}
                <div className='header' style={this.getHeaderStyle()}>
                    &nbsp;&nbsp;
                    <img onClick={this.goToHomePage.bind(this)} alt='logo' style={this.getLogoStyle()} src={RVLogo}></img>
                    <div style={this.getButtonsSectionStyle()}>
                        <button style={this.getButtonsStyle()} onClick={this.goToPRofile.bind(this)}>Profile</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>

                {/* The background image */}
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>





                {/* The banner with the sign in text */}
                <ProfileBanner rStore={this.props.rStore}>
                    <h1 className='playlistName'>{this.state.playlist !== null ? this.state.playlist.name : "Playlist"} Playlist</h1>    
                </ProfileBanner>

                <div className='profileDisplayArea'>
                    {this.state.recitations}
                </div>


                <PageFooter bottom='-250px'>
                </PageFooter>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>

                <Clock onupdate={this.update.bind(this)}></Clock>
                {this.props.children}
            </div>
        );
    }



    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    goToHomePage() {
        document.body.scrollTop = 0
        this.props.nav.goTo('home');
    }

    goToPRofile() {
        document.body.scrollTop = 0
        this.props.nav.goTo('profile');
    }


    update() {
        if(document.body.scrollTop >= 30 || window.scrollY >= 30) {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0.85)'
            })
        } else {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0)'
            })
        }
    }


}

export default PlaylistPage;