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
          recComponents:[]
        }

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
      var recObj = {'type':'follow','time': "10h", 'photoURL':'http://www.99sns.com/man.jpg', 'userID':'JdojbbrAmifYlR3LhoNKpw45p1j2', 'userName':'Adeola Uthman', 'timestamp':'1499784218435'}
      var notificationsItem =                 <NotificationsItem
                                                  notification={recObj}
                                                  nav={this.props.nav}
                                                  rStore={this.props.rStore}></NotificationsItem>;

    var recObj2 = {'type':'like','time':"12h", 'uploaderName':'Looking For Delights', 'recordID':"-LBx4DeRxhuX6C_DgnKR" , 'photoURL':'http://www.99sns.com/man.jpg', 'userID':'JdojbbrAmifYlR3LhoNKpw45p1j2', 'userName':'Adeola Uthman', 'timestamp':'1499784218435'}
    var notificationsItem2 = <NotificationsItem notification={recObj2}
                                            nav={this.props.nav}
                                            rStore={this.props.rStore}></NotificationsItem>;

  var recObj3 = {'type':'comment','time': "3d", 'uploaderName':'When I Was One and Twenty', 'recordID':"-Kp147Fest1erZpQPQ7f" , 'photoURL':'http://www.99sns.com/man.jpg', 'userID':'JdojbbrAmifYlR3LhoNKpw45p1j2', 'userName':'Adeola Uthman', 'timestamp':'1499784218435'}
  var notificationsItem3 = <NotificationsItem notification={recObj3}
                              nav={this.props.nav}
                                rStore={this.props.rStore}></NotificationsItem>;

var recObj4 = {'type':'like','time':"1w", 'uploaderName':'Looking For Delights', 'recordID':"-LBx4DeRxhuX6C_DgnKR" , 'photoURL':'https://graph.facebook.com/10155293182842064/picture', 'userID':'PluIC3hvrZVtNOr2ryvxZMEzXkj2', 'userName':'Yousong Zhang', 'timestamp':'1499784218435'}
                                var notificationsItem4 = <NotificationsItem notification={recObj4}
                                                            nav={this.props.nav}
                                                              rStore={this.props.rStore}></NotificationsItem>;







        return (
            <div style={this.getStyles()}>

            <HomeHeader nav={this.props.nav} rStore={this.props.rStore} callbackParent={this.onChildChanged} ></HomeHeader>
            <div style={this.getOverlay()}></div>





            {/* The are for displaying results. */}
            <div className='resultsSection'>
                <div className='recitationResults'>

                    {this.state.recComponents}
                </div>
                {notificationsItem}
                {notificationsItem2}
                {notificationsItem3}
                {notificationsItem4}
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


    // Loads the results of the current search and updates the state.
    LoadNotification(callback) {
        firebase.database().ref().child('Notifications').child('title').startAt(this.state.search).once('value', (snap) => {
            var recs = [];
            var comps = [];

            // For each search match create a recitation item.
            snap.forEach((element) => {
                var match = element.val();

                // If the beginnings do not match, just forget this one and keep going.
                if(!match.title.startsWith(this.state.search)) {
                    return;
                }

                var recObj = new Recitation(match.id,
                                            match.uploaderID,
                                            match.uploaderName,
                                            match.image,
                                            match.title,
                                            match.author,
                                            match.recited_by,
                                            match.published,
                                            match.genre,
                                            match.description,
                                            match.likes,
                                            match.plays,
                                            match.favorites,
                                            match.text,
                                            match.audio,
                                            match.timestamp,
                                            null)
                recs.push(recObj);
                this.setState({
                    matchingRecitations: recs
                });

                var item = <RecitationItem2 key={match.timestamp}
                                            recitation={recObj}
                                            nav={this.props.nav}
                                            rStore={this.props.rStore}></RecitationItem2>
                comps.push(item);
                this.setState({
                    recComponents: comps
                });
            });
            //if(callback) { callback(); }
        });

       // fake data


       var comps = [];
       var recObj = {'type':'follow','photoURL':'https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FcircleProfilePic.png?alt=media&token=7725c514-2e32-4feb-a4ff-de2b8be2e865', 'userID':'JdojbbrAmifYlR3LhoNKpw45p1j2', 'userName':'Adeola Uthman', 'timestamp':'1499784218435'}
       var item = <NotificationsItem
                                   notification={recObj}
                                   nav={this.props.nav}
                                   rStore={this.props.rStore}></NotificationsItem>
       comps.push(item);
       this.setState({
           recComponents: comps
       });


    }







}


export default Notifications;
