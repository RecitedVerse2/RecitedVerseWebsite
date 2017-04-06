import React, { Component, PropTypes } from 'react';



class CircleButton extends Component {
    constructor() {
        super();
        this.state = {hover:false};
    }

    static propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        border: PropTypes.string,
        textColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        hoverColor: PropTypes.string,
        clickFunction: PropTypes.func
    }

    static defaultProps = {
        width: '10px',
        height: '10px',
        border: 'none',
        textColor: 'black',
        backgroundColor: 'lightgray',
        hoverColor: 'gray',
        clickFunction: function(){}
    }




    getStyles() {
        return {
            width: this.props.width,
            height: this.props.height,
            border: this.props.border,
            borderRadius: '100%',
        	outline: 'none',
            textDecoration: 'none',
            color: this.props.textColor,
            backgroundColor: this.props.backgroundColor,
            WebkitTransitionDuration: '0.3s',
            cursor: 'pointer',
            paddingTop:'10px'
        }
    }
    getHoverStyles() {
        return {
            width: this.props.width,
            height: this.props.height,
            border: this.props.border,
            borderRadius: '100%',
        	outline: 'none',
            textDecoration: 'none',
            color: this.props.textColor,
            backgroundColor: this.props.backgroundColor,
            WebkitTransitionDuration: '0.3s',
            cursor: 'pointer',
            paddingTop:'10px'
        }
    }


    render() {
        const { width, height, border, textColor, backgroundColor, hoverColor, WebkitTransitionDuration, clickFunction, ...props } = this.props;

        if(this.state.hover) {
            return (
                <button {...props} style={this.getHoverStyles()} onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.handleClick.bind(this)}>
                    {this.props.children}
                </button>
            );
        } else {
            return (
                <button {...props} style={this.getStyles()} onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.handleClick.bind(this)}>
                    {this.props.children}
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


export default CircleButton;
