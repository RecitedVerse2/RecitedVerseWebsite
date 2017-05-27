import React, { Component } from 'react';

import _ from '../../css/fonts.css';

class MainPointsBubble extends Component {

    getStyles() {
        return {
            position:'relative',
            display: 'table-cell',
            wordWrap: 'normal',
            verticalAlign: 'top',
            fontFamily:'NEB',
            fontSize: '20px',
            width: '20%',
            color:'white',
            paddingLeft: '50px',
            paddingRight: '50px'
        };
    }


    render() {
        return (
            <div style={this.getStyles()}>
                    <img src={this.props.src} alt="img"/>
                    <br /><br />
                    <p style={{textAlign:'center'}}>{this.props.description}</p>
            </div>
        );
    }
}

export default MainPointsBubble;
