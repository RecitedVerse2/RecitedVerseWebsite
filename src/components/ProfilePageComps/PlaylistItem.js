import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

// eslint-disable-next-line
import _ from '../../css/PlaylistItem.css';
// eslint-disable-next-line
import __ from '../../css/fonts.css';

import Clock from '../../components/Clock';

class PlaylistItem extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor(props) {
        super(props);
        
        this.state = {
            image:'',
            name:'....',

            time:0,
            touching:false,
            visible:'hidden',
            opacity:'0.0'
        }
    }

    componentDidMount() {
        if(!this.props.showLoadingIndicator) {
            this.loadingIndicator.style.visibility = "hidden";
        }

        if(this.props.playlist !== null && this.props.playlist !== undefined) {
            if(this.props.playlist.first() !== null && this.props.playlist.first() !== undefined) {
                this.setState({
                    image: this.props.playlist.first().image,
                    name: this.props.playlist.getName()
                })
            }
        }
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getImageStyles() {
        return {
            position:'relative',
            width:'100%',
            height:'90%',
            cursor: 'pointer'
        }
    }
    getTextStyles() {
        return {
            color:'white',
            fontSize:'40px',
            fontFamily:'Monthoers',
            textAlign:'center',
            cursor: 'pointer'
        }
    }
    deletePlaylistButtonStyles() {
       return {
           position:'absolute',
           top:'-5px',
           right:'0px',
           width:'30px',
           height:'30px',
           opacity:this.state.opacity,
           visibility:this.state.visible,
           borderRadius:'25px',
           color:'white',
           backgroundColor:'red',
           WebkitTransitionDuration:'0.3s'
       }
   }


    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div className='item' onMouseOver={this.mouseEnter.bind(this)} onMouseLeave={this.mouseExit.bind(this)}>
                {/* Indicates that the content is being loaded. */}
                <div ref={(div)=>{this.loadingIndicator = div}} className="loader"></div>

                {/* The actual content. */}
                <img onClick={this.goTo.bind(this)} style={this.getImageStyles()} src={this.state.image} alt="thmb"/>
                <p onClick={this.goTo.bind(this)} style={this.getTextStyles()}>{this.state.name}</p>
            

                <button onClick={this.deletePlaylist.bind(this)} style={this.deletePlaylistButtonStyles()}>
                    <span className='fa fa-trash'></span>
                </button>

                <Clock onupdate={this.update.bind(this)}></Clock>
            </div>
        );
    }

    

    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    goTo() {
        var cache = [];
        var playlist = JSON.stringify(this.props.playlist, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        
        window.sessionStorage.setItem('CurrentPlaylist', playlist);
        document.body.scrollTop = 0;
        this.props.nav.goTo('playlist');
    }


    update() {
        if(this.state.touching) {
            this.setState({
                time: this.state.time + 1
            });
        } else {
            this.setState({
                time: 0
            })
        }

        // Change the visibility of the playlist button.
        if(this.state.time >= 20) {
            this.setState({
                visible:'visible',
                opacity:'0.8'
            })
        } else {
            this.setState({
                visible:'hidden',
                opacity:'0.0'
            })
        }
    }


    mouseEnter() {
        this.setState({
            touching: true
        })
    }
    mouseExit() {
        this.setState({
            touching:false
        })
    }

    deletePlaylist() {
        const store = this.props.rStore.getState();
        const cUser = store.currentUser;

        if(cUser === null || cUser === undefined) {
            Alertify.alert("You must be logged in to delete a playlist.");
            return;
        }


        Alertify.confirm("Are you sure you want to delete this playlist?", () => {
            firebase.database().ref().child('Users')
                                    .child(cUser.userID)
                                    .child('Playlists')
                                    .child(this.props.playlist.name)
                                    .remove((err) => {
                                        if(err) {
                                            Alertify.error("There was a problem deleting the playlist.");
                                        } else {
                                            Alertify.success("Deleted " + this.props.playlist.name);
                                        }
                                    })
            window.location.reload(false);
        }, () => {
            // Cancel
        });
    }
}

export default PlaylistItem;