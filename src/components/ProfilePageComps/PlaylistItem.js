import React, { Component } from 'react';

import backgroundImage from '../../../public/res/brickBackground.jpg';

import _ from '../../css/PlaylistItem.css';
import __ from '../../css/fonts.css';

class PlaylistItem extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor(props) {
        super(props);
        
        this.state = {
            image:'',
            name:'....'
        }
    }

    componentDidMount() {
        if(!this.props.show) {
            this.loadingIndicator.style.visibility = "hidden";
        }

        if(this.props.playlist !== null && this.props.playlist !== undefined) {
            if(this.props.playlist.first() !== null && this.props.playlist.first() !== undefined) {
                this.setState({
                    image: this.props.playlist.first().image,
                    name: this.props.playlist.getName()
                })
            }
        }
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position: 'relative',
            width: '400px',
            height: '250px',
            float: 'left',
            padding: '30px'
        }
    }
    getImageStyles() {
        return {
            position:'relative',
            width:'100%',
            height:'90%'
        }
    }
    getTextStyles() {
        return {
            fontSize:'40px',
            fontFamily:'Monthoers',
            textAlign:'center'
        }
    }


    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                {/* Indicates that the content is being loaded. */}
                <div ref={(div)=>{this.loadingIndicator = div}} className="loader"></div>

                {/* The actual content. */}
                <img style={this.getImageStyles()} src={this.state.image} alt="thmb"/>
                <p style={this.getTextStyles()}>{this.state.name}</p>
            </div>
        );
    }

    

    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    goTo(page) {
        // this.props.playlist.forEach( (e) => {
        //     console.log(e);
        // });
    }



}

export default PlaylistItem;