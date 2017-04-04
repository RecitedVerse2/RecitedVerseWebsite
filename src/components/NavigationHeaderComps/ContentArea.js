import React, { Component } from 'react';

// For each page, this is where the actual content will be rendered
class ContentArea extends Component {

    getContentAreaStyle() {
        return {
            position: 'absolute',
            top: '45px',
            left: '6%',
            width: '94%',
            height: '100%',
            backgroundColor: this.props.backgroundColor
        };
    }


    render() {
        return (
            <div style={this.getContentAreaStyle()}>
                {this.props.children}
            </div>
        );
    }

}

export default ContentArea;
