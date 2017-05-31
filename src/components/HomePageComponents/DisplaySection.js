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

    getStyles() {
        return {
            position:'relative',
            top:'100px',
            width:'100%'
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
            width:'100%',
            display:'table'
        }
    }





    render() {
        return (
            <div style={this.getStyles()}>
                
                <div style={this.getTitleStyles()}>
                    {this.props.title}
                </div>


                <div style={this.getDisplaySectionStyles()}>

                    <ul style={{display:'table'}}>  
                        {this.props.recitations}
                    </ul>

                </div>
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
