import React, { Component } from 'react';

import Background from '../../../public/res/BlankBanner.png';

class ProfileBanner extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            name:'User'
        }
    }

    componentDidMount() {
        const store = this.props.rStore.getState();

        if(store.currentUser != null) {
            this.setState({
                name:store.currentUser.fullname.substring(0,store.currentUser.fullname.indexOf(' '))
            })
        }
    }

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'relative',
            top:'70px',
            width:'100%',
            height: this.props.height || '300px'
        }
    }
    getImageStyle() {
        return {
            width:'100%',
            height:'100%'
        }
    }
    getWelcomeStyles() {
        return {
            position:'absolute',
            top:'40px',
            width:'100%',
            color:'white',
            margin:'auto',
            textAlign:'center'
        }
    }
    getSBStyles() {
        return {
            position:'relative',
            width:'60%',
            height:'50px',
            margin:'auto',            
            backgroundColor:'rgba(255,255,255,0.5)'
        }
    }
    getSearchBarStyle() {
        return {
            position:'relative',
            top:'-10px',
            left:'10px',
            float:'left',
            display:'inline-block',
            textAlign:'left',
            fontFamily:'NEB',
            fontSize:'30px',
        }
    }
    getInputStyles() {
        return {
            position:'relative',
            margin:'auto',
            float:'left',
            left:'20px',
            width:'70%',
            height:'100%',
            display:'inline-block',
            border:'none',
            fontSize:'30px',
            background:'none',
            textDecoration:'none',
            WebkitBoxShadow: 'none',
            boxShadow: 'none',
            outline: '0'
        }
    }


    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                <img alt='bckg' style={this.getImageStyle()} src={Background}/>

                    <div style={this.getWelcomeStyles()}>
                        {this.props.children}
                    </div>
            </div>
        );
    }

}

export default ProfileBanner;