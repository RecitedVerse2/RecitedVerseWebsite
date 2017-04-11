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

        fireRef.child('Recitations').child(window.localStorage.getItem('currentUID')).on('value', (snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                var rec = <RecitationItem key={recitationObject.val().timestamp} recitation={recitationObject.val()} ></RecitationItem>
                recs.push(rec);
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



    //
    //
    // /** Goes to the poem page with the id of the poem that was clicked on (really the id for the button that knows which
    // poem to go to). */
    // goToPoemPageWithRecitation(btnID) {
    //     if (typeof(Storage) !== "undefined") {
    //
    //         //console.log(btnID);
    //         var index = btnIDs.indexOf(btnID);
    //         var theRecitation = recitations[index];
    //         //console.log("INDEX: "+index);
    //         //console.log(theRecitation);
    //
    //         window.sessionStorage.setItem("recitation_to_look_at", JSON.stringify(theRecitation));
    //         document.location.href = "poem";
    //     }
    // };
    //
    //
    //
    // /** Plays the audio of the recitation when the image is clicked. This should interact with the audio player to
    // display information about what is playing. */
    // playRecitation(imgID) {
    //     if (typeof(Storage) !== "undefined") {
    //
    //         var index = imgIDs.indexOf(imgID);
    //         var theRecitation = recitations[index];
    //
    //
    //     }
    // };
}

export default RecitationsArea;
