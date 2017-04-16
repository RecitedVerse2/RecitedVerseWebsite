import React, { Component } from 'react';
import * as firebase from 'firebase';

import RecitationItem from './RecitationItem';

import _ from '../../css/RecitationsArea.css';

class RecitationsArea extends Component {

    constructor() {
        super();

        this.state = { recitations: [] }
    }

    componentDidMount() {
        const fireRef = firebase.database().ref();
        var recs = [];

        fireRef.child('Recitations').child(window.localStorage.getItem('currentUID')).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                // Make a new recitation component and push it onto the array
                var rec = <RecitationItem key={recitationObject.val().timestamp} recitation={recitationObject.val()} goToPoemPage={this.handleGoToPoemPage.bind(this)}></RecitationItem>
                recs.push(rec);

                // Sort the array by key, which is the timestamp.
                recs.sort(function(a,b){ return b.key - a.key; });
                this.setState({recitations:recs});
            });

        });
    }



    render() {
        return (
            <div className="recitations_grid">
                <ul id="recitations_list">
                    {this.state.recitations}
                </ul>
            </div>
        );
    }



    handleGoToPoemPage() {
        this.props.goToPoemPage();
    }
}

export default RecitationsArea;
