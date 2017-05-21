import React, { Component } from 'react';

import _ from '../../css/RecitationItem.css';


class RecitationItem extends Component {

    render() {
        return (
            <li className='recitation_item' style={{fontSize:'15px'}}>
                <img onClick={this.playRecitation.bind(this)} className='general_rec_image' src={this.props.recitation.image} style={{width:'120px',height:'120px'}} alt='recim'/>
                <button onClick={this.goToPoemPage.bind(this)} className='goToBtn' style={{color:'black'}}>{this.props.recitation.title}</button>
            </li>
        );
    }



    goToPoemPage() {
        if (typeof(Storage) !== "undefined") {
            window.sessionStorage.setItem("recitation_to_look_at", JSON.stringify(this.props.recitation));
            this.props.navHeader.goTo('poem');
        }
    }

    playRecitation() {

    }
}

export default RecitationItem;
