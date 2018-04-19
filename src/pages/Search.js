import React, { Component } from 'react';
import * as firebase from 'firebase';

// eslint-disable-next-line
import _ from '../css/Search.css';
// eslint-disable-next-line
import ___ from '../css/Header.css';

import backgroundImage from '../res/brickBackground.jpg';

import RecitationItem2 from '../components/SearchPageComps/RecitationItem2';
import Clock from '../components/Clock';
import Header from '../components/SearchPageComps/SearchHeader';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';
import Recitation from '../objects/Recitation';

// This is the search results page.
class Search extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            search: window.sessionStorage.getItem('LastSearch') || "",
            matchingRecitations: [],
            matchingUsers:[],

            recComponents:[],
            userComponents:[]
        }

        this.onChildChanged = this.onChildChanged.bind(this)
    }

    componentDidMount() {
        this.handleSearch(() => {
            this.loadUsers();
        });
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
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




    /**********************
    *                     *
    *       RENDER        *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                {/* All header, background, and banner stuff. */}
                <Header nav={this.props.nav} rStore={this.props.rStore} callbackParent={this.onChildChanged} ></Header>
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>




                {/* The are for displaying results. */}
                <div className='resultsSection'>
                    <div className='recitationResults'>
                        <h1>Result</h1>
                        {this.state.recComponents}
                    </div>
                </div>



                <Clock onupdate={this.update.bind(this)}></Clock>
                {this.props.children}
            </div>
        );
    }



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    goToHomePage() {
        this.props.nav.goTo('home');
    }

    onChildChanged(keyword) {
        window.sessionStorage.setItem('LastSearch', keyword);
        this.reSearch(keyword)
    }

    goToAccountSettings() {
        this.props.nav.goTo('accountsettings');
    }
    goToPRofile() {
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



    // Handles when the user wants to make a new search and is already on the search page.
    reSearch(e) {

        //if(e.key === 'Enter') {


            this.setState({
                search: window.sessionStorage.getItem('LastSearch') || "",
                matchingRecitations: [],
                matchingUsers: [],
                recComponents: [],
                userComponents: []
            }, () => {
                this.handleSearch(() => {
                    this.loadUsers();
                });
            })
        //}
    }


    // Loads the results of the current search and updates the state.
    handleSearch(callback) {
        firebase.database().ref().child('Recitations').orderByChild('title').startAt(this.state.search).once('value', (snap) => {
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
    }


    // Handles loading users
    loadUsers() {
        var users = [];
        var comps = [];

        for(var i = 0; i < this.state.matchingRecitations.length; i++) {
            var rec = this.state.matchingRecitations[i];

            firebase.database().ref().child('Users').child(rec.uploaderID).once('value', (snap) => {
                var usr = snap.val();
                users.push(usr);

                this.setState({
                    matchingUsers: users
                })


                var item =
                    <div key={Date.now()} style={{color:'white'}}>
                        <img src="" alt="usr" width='200px' height='200px'/>
                        <h1>{usr.fullname}</h1>
                    </div>

                comps.push(item);
                this.setState({
                    userComponents: comps
                });
            });
        }
    }






}


export default Search;
