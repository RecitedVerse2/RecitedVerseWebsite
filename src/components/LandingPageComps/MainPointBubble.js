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
                    <img src="https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FHeadphonesIcon.png?alt=media&token=70528209-3036-40c6-b5bd-d6b7a4110d2f" alt="img" width={165} height={165} />
                    <br />
                    <h3 style={{textAlign:'center'}}>{this.props.title}</h3>
                    <p style={{textAlign:'center'}}>{this.props.description}</p>
            </div>
        );
    }
}

export default MainPointsBubble;
