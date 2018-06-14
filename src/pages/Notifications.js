import React, { Component } from 'react';
import * as firebase from 'firebase';

// eslint-disable-next-line
import _ from '../css/Search.css';
// eslint-disable-next-line
import ___ from '../css/Header.css';

import backgroundImage from '../res/brickBackground.jpg';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import RecitationItem2 from '../components/SearchPageComps/RecitationItem2';
import NotificationsItem from '../components/NotificationsPageComps/NotificationsItem';
import Clock from '../components/Clock';
import Header from '../components/SearchPageComps/SearchHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import Recitation from '../objects/Recitation';

// This is the search results page.
class Notifications extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();


        this.state = {
          recComponents:[],

        }


        var cUser = JSON.parse(window.localStorage.getItem('currentUser'));
        this.state.userID = cUser.userID;

    }

    componentDidMount() {

    }


    /**********************
    *                     *
    *       STYLES        *
    *                     *
    ***********************/

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



    /**********************
    *                     *
    *       RENDER        *
    *                     *
    ***********************/

    render() {

      this.LoadNotification();
      this.clearNotification();


        return (
            <div style={this.getStyles()}>

            <HomeHeader nav={this.props.nav} rStore={this.props.rStore} callbackParent={this.onChildChanged} ></HomeHeader>
            <div style={this.getOverlay()}></div>





            {/* The are for displaying results. */}
            <div className='resultsSection'>
                <div className='recitationResults'>

                    {this.state.recComponents}
                </div>
            </div>





            {this.props.children}

            </div>
        );
    }



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    LoadNotification(){
      var query = firebase.database().ref().child('Notifications').child(this.state.userID)
      .orderByChild('timestamp').limitToFirst(100).startAt(0).once('value',(snap) =>{

       var comps = [];
       snap.forEach((element) => {
           var notification = element.val();
           console.log(notification);

           var item = <NotificationsItem notification={notification}
                                       nav={this.props.nav}
                                       rStore={this.props.rStore}></NotificationsItem>
           comps.push(item);
         });
         comps.reverse();

         this.setState({
             recComponents: comps
         });

     });

    }

    clearNotification(){
      var cUser = JSON.parse(window.localStorage.getItem('currentUser'));
      var uid = cUser.userID;
      firebase.database().ref().child('Users').child(uid).update({
          'notifications': 0,
          'notificationsLastRead':Date.now()
      });
    }


}


export default Notifications;
