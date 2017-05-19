import React, { Component } from 'react';
import * as firebase from 'firebase';

import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';
import RectButton from '../components/RectButton';
import HorizontalView from '../components/HomePageComponents/HorizontalView';
import RecitationItem from '../components/ProfilePageComps/RecitationItem';

// This is the home page.
class Home extends Component {
    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {popular:[],recent:[]}
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

    trendingHeaderStyles() {
        return {
            height: '200px'
        };
    }
    recentHeaderStyles() {
        return {
            top: '15px',
            height: '200px'
        };
    }
    textHeaderStyles() {
        return {
            textAlign:'center',
            color:'rgb(160,160,160)'
        };
    }
    ROTDProps() {
        return {
            top:'35px',
            width:'150px',
            height:'40px',
            fontSize:'15px',
            textColor:'rgb(9, 92, 124)',
            backgroundColor:'rgb(76, 182, 203)',
            hoverColor:'rgb(52, 153, 170)'
        };
    }
    SUProps() {
        return {
            top:'15px',
            width:'100px',
            height:'40px',
            fontSize:'15px',
            textColor:'rgb(9, 92, 124)',
            backgroundColor:'rgb(76, 182, 203)',
            hoverColor:'rgb(52, 153, 170)'
        };
    }
    horizontalScrollProps() {
        return {
            pageLock:false,
            reverseScroll:false,
            style:{},
            config:{stiffness:0,damping:1}
        };
    }





    render() {
        return (
            <div style={{textAlign:'center'}}>
                <ContentArea>
                    <br/><br/><br/>
                    <h4 style={this.textHeaderStyles()}>Check out what's trending on Recited Verse</h4>

                    {/* This is where all of the popular recitations go. */}
                    <ContentHeader {...this.trendingHeaderStyles()}>
                        <HorizontalView>
                            {this.state.popular}
                        </HorizontalView>
                    </ContentHeader>

                    <br/>
                    <RectButton {...this.ROTDProps()}>Recording of the Day</RectButton>


                    <br/><br/><br/><br/><br/><br/><br/>
                    <h4 style={this.textHeaderStyles()}>See what people are uploading right now!</h4>

                    {/* This is where all of the recent recitations go. */}
                    <ContentHeader {...this.recentHeaderStyles()}>
                        <HorizontalView>
                            {this.state.recent}
                        </HorizontalView>
                    </ContentHeader>

                    <br/><br/><br/><br/><br/><br/><br/>
                    <p style={this.textHeaderStyles()}>Don't have an account? Sign up here!</p>
                    <RectButton {...this.SUProps()} clickFunction={()=>{this.props.navHeader.goTo('/signup')}}>Sign Up</RectButton>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    {this.props.children}
                </ContentArea>
            </div>
        );
    }




    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    // Loads the 20 most popular recitations.
    loadMostPopular(fireRef) {
        var recs = [];
        fireRef.child('Recitations').orderByChild('likes').limitToFirst(20).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                // Make a new recitation component and push it onto the array
                var rec = <RecitationItem key={recitationObject.val().timestamp} recitation={recitationObject.val()} navHeader={this.props.navHeader}></RecitationItem>
                recs.push(rec);

                // Sort the array by the number of likes.
                recs.sort(function(a,b){ return b.likes - a.likes; });
                this.setState({popular:recs});
            });

        });
    }


    // Loads the 20 most recently uploaded recitations.
    loadMostRecent(fireRef) {
        var recs = [];
        var nowMS = Date.now();
        fireRef.child('Recitations').orderByChild('timestamp').endAt(nowMS).limitToFirst(20).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                // Make a new recitation component and push it onto the array
                var rec = <RecitationItem key={recitationObject.val().timestamp} recitation={recitationObject.val()} navHeader={this.props.navHeader}></RecitationItem>
                recs.push(rec);

                // Sort the array by the number of likes.
                recs.sort(function(a,b){ return b.timestamp - a.timestamp; });
                this.setState({recent:recs});
            });

        });
    }
}

export default Home;
