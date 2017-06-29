import React, { Component } from 'react';

// eslint-disable-next-line
import _ from '../../css/fonts.css';

class MainPointsBubble extends Component {

    getStyles() {
        return {
            position:'relative',
            display: 'table-cell',
            wordWrap: 'normal',
            verticalAlign: 'top',
            fontFamily:'HelveticaNeue',
            fontSize: '18px',
            color:'white'
        };
    }
    getImageStyles() {
        return {
            width:'60%'
        }
    }


    render() {
        return (
            <div style={this.getStyles()}>
                    <img style={this.getImageStyles()} src={this.props.src} alt="img"/>
                    <br /><br />
                    <p style={{textAlign:'center'}}>{this.props.description}</p>
            </div>
        );
    }
}

export default MainPointsBubble;
