import React, { Component } from 'react';


import _ from '../../css/RecitationItem.css';


class RecitationItem extends Component {

    render() {
        return (
            <li className='recitation_item' style={{fontSize:'15px'}}>
                <img className='general_rec_image' src={this.props.recitation.image} style={{width:'120px',height:'120px'}} alt='recim'/>
                <button className='goToBtn' style={{color:'black'}}>{this.props.recitation.title}</button>
            </li>
        );
    }


}

export default RecitationItem;
