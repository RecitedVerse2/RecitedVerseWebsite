import React, { Component } from 'react';

import _ from '../../css/fonts.css';


class DisplaySection extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getGridStyles() {
        return {
            position:'relative',
            top:this.props.top,
            width:'100%',
            left:'0px',
            bottom:'50px'
        }
    }
    getTitleStyles() {
        return {
            color:'white',
            width:'100%',
            textAlign:'center',
            fontFamily:'NEB',
            fontSize:'30px'
        }
    }
    getDisplaySectionStyles() {
        return {
            position:'relative',
            top:'20px',
            width:'100%'
        }
    }





    render() {
        return (
            <div style={this.getGridStyles()}>
                
                <div style={this.getTitleStyles()}>
                    {this.props.title}
                </div>


                <br/>
                <div style={this.getDisplaySectionStyles()}>
                    {this.props.recitations}
                </div>
                <br/>
            </div>
        );
    }

    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    
};

export default DisplaySection;
