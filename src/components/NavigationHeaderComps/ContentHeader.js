import React, { Component } from 'react';



class ContentHeader extends Component {

    getCHStyles() {
        return {
            position:'relative',
            top: this.props.top || '20px',
            left:'1%',
            width:'98%',
            height:this.props.height || '400px',
            backgroundColor: 'white'
        };
    }


    render() {
        return (
            <div style={this.getCHStyles()}>
                {this.props.children}
            </div>
        );
    }

}


export default ContentHeader;
