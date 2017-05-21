import React, { Component } from 'react';
import * as firebase from 'firebase';

import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import RecitationItem from '../components/ProfilePageComps/RecitationItem';

// This is the search results page.
class Search extends Component {
    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {recitations:[]}
    }

    componentDidMount() {
        this.props.navHeader.unhide();

        this.loadResults('recitations');
    }


    /**********************
    *                     *
    *       STYLES        *
    *                     *
    ***********************/

    optionsAreaStyles() {
        return {
            position:'absolute',
            top:'50px',
            left:'1%',
            width:'18%',
            height:'100px',
            paddingLeft:'10px',
            backgroundColor:'white'
        }
    }

    resultsAreaStyles() {
        return {
            position:'absolute',
            top:'50px',
            left:'20%',
            width:'79%',
            height:'500px',
            backgroundColor:'white'
        }
    }



    /**********************
    *                     *
    *       RENDER        *
    *                     *
    ***********************/

    render() {
        return (
            <div>
                <ContentArea>
                    <div className='options_area' style={this.optionsAreaStyles()}>

                    </div>

                    <div className='results_area' style={this.resultsAreaStyles()}>
                        <ul id="recitations_list" style={{padding:'10px'}}>
                            {this.state.recitations}
                        </ul>
                    </div>
                </ContentArea>
                {this.props.children}
            </div>
        );
    }



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    // Loads the data for the search
    loadResults() {
        var search = window.sessionStorage.getItem('Last_Search');
        var recs = [];
        var fireRef = firebase.database().ref();

        fireRef.child('Recitations').orderByChild('title').startAt(search).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                // Make a new recitation component and push it onto the array
                var rec = <RecitationItem key={recitationObject.val().timestamp} recitation={recitationObject.val()} navHeader={this.props.navHeader}></RecitationItem>
                recs.push(rec);

                // Sort the array by key, which is the timestamp.
                recs.sort(function(a,b){ return b.key - a.key; });
                this.setState({recitations:recs});
            });
        });
    }
}


export default Search;
