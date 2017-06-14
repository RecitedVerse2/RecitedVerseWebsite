import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../../public/res/brickBackground.jpg';

import RecitationItem from '../components/ProfilePageComps/RecitationItem';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import HomeCarousel from '../components/HomePageComponents/Carousel';
import DisplaySection from '../components/HomePageComponents/DisplaySection';
import HomeFooter from '../components/HomePageComponents/HomeFooter';

// This is the home page.
class Home extends Component {
    
    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            popular:[],
            recent:[]
        }
    }

    componentDidMount() {
        const fireRef = firebase.database().ref();

        this.loadMostPopular(fireRef);
        this.loadMostRecent(fireRef);
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
            top:'0px'
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
    





    render() {
        return (
            <div style={this.getStyles()}>
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>

                <HomeHeader rStore={this.props.rStore} nav={this.props.nav}></HomeHeader>
                <HomeCarousel rStore={this.props.rStore}></HomeCarousel>

                <DisplaySection title='Trending'
                                top='100px'
                                rStore={this.props.rStore}
                                recitations={this.state.popular}>
                </DisplaySection>

                <br/><br/><br/><br/><br/><br/><br/>

                <DisplaySection title='See what people are uploading right now'
                                top='200px'
                                rStore={this.props.rStore}
                                recitations={this.state.recent}>
                </DisplaySection>


                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                
                <HomeFooter></HomeFooter>


                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                {this.props.children}
            </div>
        );
    }




    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/
 
    // Loads the 8 most popular recitations.
    loadMostPopular(fireRef) {
        var recs = [];
        fireRef.child('Recitations').orderByChild('likes').limitToFirst(8).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                // Make a new recitation component and push it onto the array
                var rec = <RecitationItem key={recitationObject.val().timestamp}
                                            recitation={recitationObject.val()}
                                            navHeader={this.props.nav}
                                            rStore={this.props.rStore}></RecitationItem>
                recs.push(rec);

                // Sort the array by the number of likes.
                recs.sort(function(a,b){ return b.likes - a.likes; });
                this.setState({popular:recs});
            });

        });
    }


    // Loads the 8 most recently uploaded recitations.
    loadMostRecent(fireRef) {
        var recs = [];
        var nowMS = Date.now();
        fireRef.child('Recitations').orderByChild('timestamp').endAt(nowMS).limitToFirst(8).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                // Make a new recitation component and push it onto the array
                var rec = <RecitationItem key={recitationObject.val().timestamp}
                                            recitation={recitationObject.val()}
                                            navHeader={this.props.nav}
                                            rStore={this.props.rStore}></RecitationItem>
                recs.push(rec);

                // Sort the array by the number of likes.
                recs.sort(function(a,b){ return b.timestamp - a.timestamp; });
                this.setState({recent:recs});
            });

        });
    }
}

export default Home;
