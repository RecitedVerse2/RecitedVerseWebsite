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
                <p>comments</p>
            </div>
        )
    }
}