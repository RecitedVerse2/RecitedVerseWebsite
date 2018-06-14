import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import { base } from '../objects/config';

export default class MainPoem extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        var url = window.location.href;
        var n = url.indexOf("allrecordings");
        var poem = url.substring(n+14);
        String.prototype.replaceAll = function (find, replace) {
            var str = this;
            return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
        };
        // get final title
        var final = poem.replaceAll('+', ' ');
        final.replaceAll('%20', ' ');

        


    }

    render(){
        return (
            <div>
                <HomeHeader nav={this.props.nav} rStore={this.props.rStore}></HomeHeader>
                test
            </div>
        )
    }
}