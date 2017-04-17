import React, { Component } from 'react';


class HorizontalView extends Component {

    hvStyles() {
        return {
            width: this.props.width || '100%',
            height: this.props.height || '100%',
            overflow: 'hidden',
            position: 'relative',
            display: 'table'
        };
    }


    render() {
        return (
            <div style={this.hvStyles()}>
                {this.props.children}
            </div>
        );
    }



}

export default HorizontalView;
