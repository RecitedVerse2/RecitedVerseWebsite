import React, { Component } from 'react';
import * as firebase from 'firebase';


class RecitationItem extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    

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



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
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
            </div>
        );
    }




    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

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
