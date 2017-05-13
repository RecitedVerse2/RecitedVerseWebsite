import React, { Component } from 'react';

import _ from '../../css/RecitationItem.css';

class SearchUserResult extends Component {

    render() {
        return (
            <li className='user_item' style={{fontSize:'15px'}}>
                <img className='prof_img' src={this.props.userObject.image} style={{width:'120px',height:'120px'}} alt='profim'/>
                <button onClick={this.goToProfilePage.bind(this)} className='goToBtn' style={{color:'black'}}>{this.props.userObject.fullname}</button>
            </li>
        );
    }


    goToProfilePage() {

    }
}

export default SearchUserResult;
