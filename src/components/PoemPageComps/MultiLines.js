import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class MultiLines extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
        }
    }

    componentWillMount(){

    }

    render(){
      var lines = this.props.content.split("\n");

      var LinesList = lines.map(function(line){
                      return <li>{line}</li>;
                    })
        return (
            <div>
            {LinesList}


            </div>
        )
    }
}
