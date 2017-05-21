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
            height:'400px'
        }
    }
    getImageStyle() {
        return {
            position:'relative',
            top:'10%',
            width:'50%',
            height:'80%',
            float:this.props.orientation || 'left'
        }
    }



    render() {
        return (
            <div style={this.getStyle()}>
                <img style={this.getImageStyle()} alt='pds' src='https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FTestImage.png?alt=media&token=3e748f83-7288-4fce-b892-9318e07a2329'></img>
            </div>
        );
    }

};

export default PointDescriptionSection;
