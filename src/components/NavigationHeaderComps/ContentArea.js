import React, { Component } from 'react';

// For each page, this is where the actual content will be rendered
class ContentArea extends Component {
    constructor() {
        super();
        this.state = {contentLeft:'6%',contentWidth:'94%'};
    }


    componentDidMount() {
        this.toggleMenu.bind(this);
    }


    getContentAreaStyle() {
        return {
            position: 'absolute',
            top: '45px',
            left: this.state.contentLeft,
            width: this.state.contentWidth,
            height: '100%',
            backgroundColor: this.props.backgroundColor || 'rgb(242,244,248)'
        };
    }


    render() {
        return (
            <div id='contentAr' style={this.getContentAreaStyle()}>
                {this.props.children}
            </div>
        );
    }


    toggleMenu() {
        var nav = document.getElementById('rv_menuBar');
        this.setState({
            contentLeft: nav.style.left === '6%' ? '12%' : '6%',
            contentWidth: nav.style.width === '94%' ? '88%' : '94%',
        });
    }
}

export default ContentArea;
