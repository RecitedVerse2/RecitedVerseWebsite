import React, { Component } from 'react';

class navigation extends Component {



    render() {
        return(
            <div>
            </div>
        );
    }



    goTo(page) {
        this.props.history.push(page);
    }
}

export default navigation;