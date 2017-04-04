import React, { Component } from 'react';


class TabContent extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default TabContent;
