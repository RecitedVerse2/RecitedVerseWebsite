import React, { Component } from 'react';


class Footer extends Component {

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'relative',
            width:'100%',
            height:'500px'
        };
    }
    getUpperStyles() {
        return {
            position:'relative',
            height:'250px'
        }
    }
    getImageStyle() {
        return {
            width:'100%',
            height:'250px'
        }
    }
    getLowerStyles() {
        return {
            position:'relative',
            height:'250px',
            display:'table'
        }
    }


    render() {
        return (
            <div style={this.getStyles()}>

                <div style={this.getUpperStyles()}>
                    <img style={this.getImageStyle()} src='https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FTestImage.png?alt=media&token=3e748f83-7288-4fce-b892-9318e07a2329'></img>
                </div>

                <div style={this.getLowerStyles()}>
                    &nbsp;&nbsp;

                    <div style={{display:'table-cell',width:'40%',color:'cornflowerblue'}}>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea los eatos commodo consequat</p>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <div style={{display:'table-cell',color:'white'}}>
                        <h3>Contact</h3>
                        <button style={{background:'none',border:'none'}}>Address</button>
                        <br/>
                        <button style={{background:'none',border:'none'}}>Phone</button>
                        <br/>
                        <button style={{background:'none',border:'none'}}>Email</button>
                    </div>
                </div>

            </div>
        );
    }


};

export default Footer;
