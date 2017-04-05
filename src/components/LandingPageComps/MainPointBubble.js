import React, { Component } from 'react';

class MainPointsBubble extends Component {

    getStyles() {
        return {
            display: 'inline-block',
            wordWrap: 'normal',
            verticalAlign: 'top',
            fontSize: '15px',
            width: '20%',
            padding: '50px'
        };
    }


    render() {
        return (
            <div style={this.getStyles()}>
                    <img src={this.props.src} alt="img" width={165} height={165} />
                    <br />
                    <h3 style={{textAlign:'center'}}>{this.props.title}</h3>
                    <p style={{textAlign:'center'}}>{this.props.description}</p>
            </div>
        );
    }
}

export default MainPointsBubble;
