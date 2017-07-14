import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

import Clock from '../Clock';

class RecitationItem extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            time:0,
            touching:false,
            visible:'hidden',
            opacity:'0.0'
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
           width:'200px',
           height:'200px',
           marginTop: this.props.margin || '20px',
           marginLeft: this.props.margin || '20px',
           marginRight: this.props.margin || '20px',
           marginBottom:'80px',
           display:'inline-block',
       }
   }
   getImageStyles() {
       return {
           position:'relative',
           width:'100%',
           heigth:'100%'
       }
   }
   getTextStyles() {
       return {
           color:'white',
           border:'none',
           outline:'none',
           cursor:'pointer',
           fontFamily:'MyriadPro',
           fontSize:'20px',
           background:'none',
           paddingTop:'10px',
           textDecoration:'none'
       }
   }
   addToPlaylistButtonStyles() {
       return {
           position:'absolute',
           top:'-5px',
           right:'0px',
           width:'30px',
           height:'30px',
           opacity:this.state.opacity,
           visibility:this.state.visible,
           borderRadius:'25px',
           backgroundColor:'cyan',
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
            <div ref={(div)=>{this.theDiv = div}} style={this.getStyles()} onMouseOver={this.mouseEnter.bind(this)} onMouseLeave={this.mouseExit.bind(this)}>
                <img onClick={this.playRecitation.bind(this)} 
                    src={this.props.recitation.image}
                    style={this.getImageStyles()}
                    width='100%'
                    height='100%'
                    alt='recim'/>

                <button onClick={this.goToPoemPage.bind(this)} 
                        style={this.getTextStyles()}>
                    {this.props.recitation.title}
                    <br/>
                    by {this.props.recitation.uploaderName}
                </button>


                <button onClick={this.addToPlaylist.bind(this)} style={this.addToPlaylistButtonStyles()}>
                    <span className='fa fa-plus'></span>
                </button>

                <Clock onupdate={this.update.bind(this)}></Clock>
                {this.props.children}
            </div>
        );
    }




    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

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


    // Prompts for adding something to a playlist.
    addToPlaylist() {
        const store = this.props.rStore.getState();
        const cUser = store.currentUser;

        if(cUser === null || cUser === undefined) {
            Alertify.alert("You must be logged in to add a recitation to a playlist.");
            return;
        }

        Alertify.defaultValue("Playlist Name").prompt("Which playlist would you like to add \"" + this.props.recitation.title + "\" to? If the playlist does not exist it will be created for you.", 
        
            (val, ev) => {
                // The click event is in the event variable, so you can use it here.
                ev.preventDefault();

                if(val !== "" && val !== " " && val !== null && val !== undefined) {
                    // The value entered is availble in the val variable.
                    Alertify.success("Added to the playlist " + val);

                    this.add(val);

                } else {
                    Alertify.error("A valid playlist name must be entered.");
                }

            }, function(ev) {
                // The click event is in the event variable, so you can use it here.
                ev.preventDefault();
            });
    }


    // Handles actually adding to a playlist.
    add(name) {
        const store = this.props.rStore.getState();
        const cUser = store.currentUser;

        firebase.database().ref()
                        .child('Users')
                        .child(cUser.userID)
                        .child('Playlists')
                        .child(name)
                        .push()
                        .set(this.props.recitation.id);
    }



    goToPoemPage() {
        // Stringify the recitation for this item so it can be passed around pages.
        var cache = [];
        var rec = JSON.stringify(this.props.recitation, (key, value) => {
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
        
        window.sessionStorage.setItem('CurrentRecitation', rec);
        document.body.scrollTop = 0;
        this.props.nav.goTo('poem');
    }

    playRecitation() {
        const store = this.props.rStore.getState();
        const rec = this.props.recitation;
        const storageRef = firebase.storage().ref();
        this.props.rStore.dispatch({
            type:'UPDATE_PLAYCOUNT',
            shouldUpdatePlayCount: true
        });
        
        // First, clear whatever is there.
        if(store.audio !== null) { store.audio.pause(); }
        this.props.rStore.dispatch({
            type:'CLEAR'
        });

        // Get the new audio.
        storageRef.child('Recitations').child(rec.id).getDownloadURL().then( (url) => {
            var audio = new Audio(url);
            audio.loop = false;

            // First set the audio if it is null. Then play it.
            if(store.audio === null) {
                this.props.rStore.dispatch({
                    type:'SET',
                    id:rec.id,
                    uploaderID:rec.uploaderID,
                    uploaderName:rec.uploaderName,
                    image:rec.image,
                    title:rec.title,
                    author:rec.author,
                    recitedBy:rec.recitedBy,
                    published:rec.published,
                    genre:rec.genre,
                    description:rec.description,
                    likes:rec.likes,
                    plays:rec.plays,
                    favorites:rec.favorites,
                    text:rec.text,
                    recitation:rec,
                    audio:audio,
                    volume:store.volume,
                    loop:store.loop,
                });
                store.audio.play();
            }
        });
    }

}

export default RecitationItem;
