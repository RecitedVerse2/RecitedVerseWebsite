import React, { Component } from 'react';
import * as firebase from 'firebase';

import RecitationItem from './RecitationItem';


class RecitationsArea extends Component {

    constructor() {
        super();

        this.state = { recitations: [] }
    }

    componentDidMount() {
        const fireRef = firebase.database().ref();
        var recs = [];

        if(this.props.loadLiked === true) {
            this.loadLiked(fireRef, recs);
            return;
        } else if(this.props.loadFavorited === true) {
            this.loadFavorited(fireRef, recs);
            return;
        } else {
            this.loadUserRecs(fireRef, recs);
            return;
        }
    }



    render() {
        return (
            <div style={{position:'relative',width:'100%',marginTop:'100px'}}>
                <ul id="recitations_list">
                    {this.state.recitations}
                </ul>
            </div>
        );
    }







    // Load all of the user's recitations
    loadUserRecs(fireRef, recs) {
        fireRef.child('Recitations').orderByChild('uploaderID').equalTo(window.localStorage.getItem('currentUID')).once('value').then((snapshot)=> {
            /* Go through each recitation that the user has. If the array of recitations does not contain
            that recitation, then add it. */
            snapshot.forEach((recitationObject) => {
                // Make a new recitation component and push it onto the array
                var rec = <RecitationItem key={recitationObject.val().timestamp}
                                          recitation={recitationObject.val()}
                                          navHeader={this.props.navHeader}
                                          rStore={this.props.rStore}>
                          </RecitationItem>
                recs.push(rec);

                // Sort the array by key, which is the timestamp.
                if(this.props.sortBy === 'timestamp') {
                    recs.sort(function(a,b){ return b.key - a.key; });
                } else {
                    recs.sort(function(a,b){ return b.likes - a.likes; });
                }
                this.setState({recitations:recs});
            });

        });
    }


    // Load all of the recitations that the user has liked
    loadLiked(fireRef, recs) {
        var onUserDataChanged = (snapshot) => {
            if(snapshot != null) {
                var likes = snapshot.val()["likes"];

                if(likes !== undefined && likes !== null) {
                    likes.forEach((recID)=>{
                        firebase.database().ref().child("Recitations").child(recID).once('value').then( (snapshot) => {
                            var recitationObject = snapshot.val();
                            // Make a new recitation component and push it onto the array
                            var rec = <RecitationItem key={recitationObject.timestamp}
                                                      recitation={recitationObject}
                                                      navHeader={this.props.navHeader}
                                                      rStore={this.props.rStore}></RecitationItem>
                            recs.push(rec);

                            // Sort the array by likes
                            if(this.props.sortBy === 'timestamp') {
                                recs.sort(function(a,b){ return b.key - a.key; });
                            } else {
                                recs.sort(function(a,b){ return b.likes - a.likes; });
                            }
                            this.setState({recitations:recs});
                        })
                    })
                }
            }
        };

        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            firebase.database().ref().child("Users").child(window.localStorage.getItem('currentUID')).once('value').then(onUserDataChanged);
        }
    }


    // Load all of the recitations that the user has liked
    loadFavorited(fireRef, recs) {
        var onUserDataChanged = (snapshot) => {
            if(snapshot != null) {
                var favorites = snapshot.val()["favorites"];

                if(favorites !== undefined && favorites !== null) {
                    favorites.forEach((recID)=>{
                        firebase.database().ref().child("Recitations").child(recID).once('value').then( (snapshot) => {
                            var recitationObject = snapshot.val();
                            // Make a new recitation component and push it onto the array
                            var rec = <RecitationItem key={recitationObject.timestamp}
                                                        recitation={recitationObject}
                                                        navHeader={this.props.navHeader}
                                                        rStore={this.props.rStore}></RecitationItem>
                            recs.push(rec);

                            // Sort the array by favorites
                            if(this.props.sortBy === 'timestamp') {
                                recs.sort(function(a,b){ return b.key - a.key; });
                            } else {
                                recs.sort(function(a,b){ return b.favorites - a.favorites; });
                            }
                            this.setState({recitations:recs});
                        })
                    })
                }
            }
        };

        if(window.localStorage.getItem('currentUID') !== undefined && window.localStorage.getItem('currentUID') !== null) {
            firebase.database().ref().child("Users").child(window.localStorage.getItem('currentUID')).once('value').then(onUserDataChanged);
        }
    }
}

export default RecitationsArea;
