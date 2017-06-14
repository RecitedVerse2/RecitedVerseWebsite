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
        if(!this.props.showLoadingIndicator) {
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

    getImageStyles() {
        return {
            position:'relative',
            width:'100%',
            height:'90%',
            cursor: 'pointer'
        }
    }
    getTextStyles() {
        return {
            color:'white',
            fontSize:'40px',
            fontFamily:'Monthoers',
            textAlign:'center',
            cursor: 'pointer'
        }
    }


    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div className='item'>
                {/* Indicates that the content is being loaded. */}
                <div ref={(div)=>{this.loadingIndicator = div}} className="loader"></div>

                {/* The actual content. */}
                <img onClick={this.goTo.bind(this)} style={this.getImageStyles()} src={this.state.image} alt="thmb"/>
                <p onClick={this.goTo.bind(this)} style={this.getTextStyles()}>{this.state.name}</p>
            </div>
        );
    }

    

    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    goTo() {
        this.props.playlist.forEach( (e) => {
            console.log(e);
        });
    }



}

export default PlaylistItem;