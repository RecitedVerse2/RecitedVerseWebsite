import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
        }
    }

    componentWillMount(){
        
    }

    render(){
        return (
            <div>
                <h2>Comments:</h2>
            </div>
        )
    }
}