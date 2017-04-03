import React, { Component } from 'react';

class PillButton extends Component {
    constructor() {
        super();
        this.state = {hover:false};
    }

    getStyles() {
        return {
            width: this.props.width,
            height: this.props.height,
            border: 'none',
            borderRadius: '25px',
            backgroundColor: this.props.btnColor || 'lightgray',
            WebkitTransitionDuration: '0.3s',
            cursor: 'pointer'
        }
    }
    getHoverStyles() {
        return {
            width: this.props.width,
            height: this.props.height,
            border: 'none',
            borderRadius: '25px',
            backgroundColor: this.props.hoverColor || 'gray',
            WebkitTransitionDuration: '0.3s',
            cursor: 'pointer'
        }
    }


    render() {
        if(this.state.hover) {
            return (
                <button style={this.getHoverStyles()} onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.handleClick.bind(this)}>
                    {this.props.title}
                </button>
            );
        } else {
            return (
                <button style={this.getStyles()} onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.handleClick.bind(this)}>
                    {this.props.title}
                </button>
            );
        }
    }


    mouseOver() {
        this.setState({hover:true});
    }
    mouseLeave() {
        this.setState({hover:false});
    }
    handleClick() {
        if(this.props.clickFunction) {
            this.props.clickFunction();
        }
    }
}


export default PillButton;
