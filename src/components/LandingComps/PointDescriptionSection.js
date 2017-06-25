import React, { Component } from 'react';

import background from '../../res/BlankBanner.png';

class PointDescriptionSection extends Component {

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyle() {
        return {
            position:'relative',
            width:'100%',
            height:'400px'
        }
    }
    getImageStyle() {
        return {
            position:'relative',
            top:'10%',
            width:'400px',
            height:'400px',
            borderRadius:'100%',
            marginLeft: this.props.orientation === 'left' ? '50px' : '0px',
            marginRight: this.props.orientation === 'right' ? '50px' : '0px',
            float:this.props.orientation || 'left'
        }
    }



    render() {
        return (
            <div style={this.getStyle()}>
                <img style={this.getImageStyle()} alt='pds' src={background}></img>
            </div>
        );
    }

};

export default PointDescriptionSection;
