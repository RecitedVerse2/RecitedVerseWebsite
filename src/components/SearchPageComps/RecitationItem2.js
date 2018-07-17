import React, { Component } from 'react';
import * as firebase from 'firebase';


class RecitationItem2 extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor(){
      super()
    }



    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

   getStyles() {
       return {
           position:'relative',
           width: '600px',
           height: '200px',
           marginTop: this.props.margin || '20px',
           marginLeft: this.props.margin || 'auto',
           marginRight: this.props.margin || 'auto',
           marginBottom:'20px',
       }
   }

   getImageDivStyles(){
     return {
       float: 'left',
       width: '250px',
       paddingLeft: '50px'
     }
   }

   getImageRightDivStyles(){
     return {
       float: 'left',
       width: '300px',
       height: '200px',
       paddingLeft: '50px',
       paddingTop:'20px'
     }
   }

   getImageStyles() {
       return {
         width: '200px',
         height: '200px',
         cursor: 'pointer',
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

   getDescULStyle(){
     return {
       listStyle: 'none'
     }
   }


   getDescLiStyle(){
     return {
       margin: '0',
       padding: '0',
       textAlign: 'left',
       fontSize:'18px',
     }
   }

   getDescDetailLiStyle(){
     return {
       margin: '0',
       padding: '0',
       textAlign: 'left',
        color: 'blue',
       cursor: 'pointer',
     }
   }





    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {


      var d = new Date(this.props.recitation.timestamp);
      var createTime = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

        return (
            <div style={this.getStyles()}>
                <div  style={this.getImageDivStyles()}>
                <img onClick={this.goToPoemPage.bind(this)}
                    src={this.props.recitation.image}
                    style={this.getImageStyles()}
                    width='100%'
                    height='100%'
                    alt='recim'/>
                    </div>
                   <div style={this.getImageRightDivStyles()} >
                    <ul style={this.getDescULStyle()}>

                                <li style={this.getDescLiStyle()}> <strong> {this.props.recitation.title}</strong></li>
                                <li style={this.getDescLiStyle()} >By:&nbsp;<strong> &nbsp;{this.props.recitation.author}</strong></li>
                                <li style={this.getDescLiStyle()} >Recorded By:&nbsp;{this.props.recitation.recited_by} </li>
                                <li style={this.getDescLiStyle()} >Date:&nbsp;  {createTime}</li>
                                <li style={this.getDescLiStyle()}  >Like:&nbsp; {this.props.recitation.likes} </li>
                                <li style={this.getDescLiStyle()}  >Tags: &nbsp;{this.props.recitation.genre}</li>




                </ul>
                 </div>
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

export default RecitationItem2;
