import React, { Component } from 'react';

import _ from '../../css/fonts.css';

import backgroundImage from '../../../public/res/footerBackground.png';

class HomeFooter extends Component {


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'relative',
            top:'300px',
            width:'100%',
            height:'250px'
        }
    }
    getBackgroundStyles() {
        return {
            position:'relative',
            width:'100%',
            height:'100%'
        }
    }
    getROTDImageStyles() {
        return {
            width:'200px',
            height:'200px',
            display:'table-cell'
        }
    }
    getTextStyles() {
        return {
            position:'relative',
            marginTop:'-30px'
        }
    }




    render() {
        return (
            <div style={this.getStyles()}>
                <img alt='abc' src={backgroundImage} style={this.getBackgroundStyles()} />

                
                <div style={{position:'relative',marginTop:'-220px',marginLeft:'auto',marginRight:'auto',display:'table'}}>
                    <img alt='ROTD' src='' style={this.getROTDImageStyles()} />

                    <div style={{position:'relative',paddingLeft:'30px',top:'-130px',color:'white',display:'table-cell'}}>
                        <h1 style={{fontFamily:'Monthoers',fontSize:'40px'}}>Recitation of the day</h1>
                        <p style={{fontFamily:'NEB',fontSize:'20px'}}>Description of ROTD</p>
                    </div>
                </div>
            </div>
        );
    }


}

export default HomeFooter;