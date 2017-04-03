import React, { Component } from 'react';


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

                <h1>
                    {this.props.headerTitle}
                </h1>

            </div>
        );
    }

}

export default ContentArea;
