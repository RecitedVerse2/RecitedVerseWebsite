import React, { Component } from 'react';
import * as firebase from 'firebase';

import _ from '../../css/RecitationItem.css';


class RecitationItem extends Component {

    render() {
        return (
            <li className='recitation_item' style={{fontSize:'15px'}}>
                <img onClick={this.playRecitation.bind(this)} className='general_rec_image' src={this.props.recitation.image} style={{width:'120px',height:'120px'}} alt='recim'/>
                <button onClick={this.goToPoemPage.bind(this)} className='goToBtn' style={{color:'black'}}>{this.props.recitation.title}</button>
            </li>
        );
    }



    goToPoemPage() {
        if (typeof(Storage) !== "undefined") {
            window.sessionStorage.setItem("recitation_to_look_at", JSON.stringify(this.props.recitation));
            this.props.navHeader.goTo('poem');
        }
    }

    playRecitation() {
        const store = this.props.rStore.getState();
        const rec = this.props.recitation;
        const storageRef = firebase.storage().ref();

        // First, clear whatever is there.
        if(store.audio !== null) { store.audio.pause(); }
        this.props.rStore.dispatch({
            type:'CLEAR'
        });

        // Get the new audio.
        storageRef.child(rec.uploaderID).child(rec.id).getDownloadURL().then( (url) => {
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
                    recitation:rec.recitation,
                    audio:audio,
                    volume:store.volume,
                    loop:store.loop,
                });
                store.audio.play();
            }
        });
    } // End of method.
}

export default RecitationItem;
