import React, { Component } from 'react';
import * as firebase from 'firebase';

import Recitation from '../../objects/Recitation';

class NotificationsItem extends Component {

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
           height: '100px',
          // marginTop: this.props.margin || '20px',
           marginLeft: this.props.margin || 'auto',
           marginRight: this.props.margin || 'auto',
           marginBottom:'20px',
           boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2)'
       }
   }

   getImageDivStyles(){
     return {
       float: 'left',
       width: '100px',
       paddingTop:'20px',
       paddingLeft: '10px',
     }
   }

   getImageRightDivStyles(){
     return {
       float: 'left',
       width: '500px',
       height: '100px',
       paddingLeft: '10px',
       paddingTop:'20px'
     }
   }

   getImageStyles() {
       return {
         width: '60px',
         height: '60px',
         borderRadius: '60px',
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


   getDivFloatLeftStyles(){
     return {
       paddingTop:'15px',
       float:'left',
       marginLeft: '20px',
     }
   }

   getDivFloatRightStyles(){
     return {
       float:'right',
       marginRight: '20px',
       paddingTop:'20px',
     }
   }

getPoelinkStyle(){
  return{
    fontSize: '14px',
    color:'black',
    cursor:'pointer'
  }
}


   getFollowHtml(){
     return(
      <div style={this.getDivFloatLeftStyles()}>
       <strong>{this.props.notification.userName} </strong>followed you
       </div>
     )
     }

     getLikeHtml(){
       return(
        <div style={this.getDivFloatLeftStyles()}>
         <strong>{this.props.notification.userName} </strong> Liked <a style={this.getPoelinkStyle()}  onClick={this.goToPoemPage.bind(this)} > <strong>{this.props.notification.uploaderName}</strong></a>
         </div>
       )
    }


    getCommentHtml(){
      return(
       <div style={this.getDivFloatLeftStyles()}>
        <strong>{this.props.notification.userName} </strong>commented  <a style={this.getPoelinkStyle()}  onClick={this.goToPoemPage.bind(this)} > <strong>{this.props.notification.uploaderName}</strong></a>
        </div>
      )
   }



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {


      var d = new Date(this.props.notification.timestamp);
      var createTime = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

      var text = "";
      if(this.props.notification.type == "follow"){
          text = this.getFollowHtml();
      }

      if(this.props.notification.type == "like"){
          text = this.getLikeHtml();
      }


    if(this.props.notification.type == "comment"){
                text = this.getCommentHtml();
      }


        return (
            <div style={this.getStyles()}>
                <div  style={this.getImageDivStyles()}>
                <img onClick={this.goToUserPage.bind(this)}
                    src={this.props.notification.photoURL}
                    style={this.getImageStyles()}
                    width='100%'
                    height='100%'
                    alt='recim'/>
                    </div>
                   <div style={this.getImageRightDivStyles()} >
                    {text}
                    <div style={this.getDivFloatRightStyles()}>{this.props.notification.time}</div>

                 </div>
            </div>
        );
    }




    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    goToUserPage() {

          window.location = '/user?' + this.props.notification.userID;


    }




  goToPoemPage() {

            var recordID = this.props.notification.recordID;

            const fireRef = firebase.database().ref();


            fireRef.child('Recitations').child(recordID).once('value', (snap) => {

              var record = snap.val();

              var recObj = new Recitation( record.id,
                                          record.uploaderID,
                                          record.uploaderName,
                                          record.image,
                                          record.title,
                                          record.author,
                                          record.recited_by,
                                          record.published,
                                          record.genre,
                                          record.description,
                                          record.likes,
                                          record.plays,
                                          record.favorites,
                                          record.text,
                                          record.audio,
                                          record.timestamp  );



          var recStr = JSON.stringify(recObj)

          window.sessionStorage.setItem('CurrentRecitation', recStr);
          document.body.scrollTop = 0;
          this.props.nav.goTo('poem');
        });
      }


}

export default NotificationsItem;
