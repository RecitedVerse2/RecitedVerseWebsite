import React, { Component } from 'react';


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
            height:'300px',
            backgroundColor:'black'
        }
    }



    render() {
        return (
            <div style={this.getStyle()}>

            </div>
        );
    }

};

export default PointDescriptionSection;
