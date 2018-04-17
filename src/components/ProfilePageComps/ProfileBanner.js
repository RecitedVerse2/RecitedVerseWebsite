import React, { Component } from 'react';

import Background from '../../res/profile.png';

class ProfileBanner extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            name:'User',
            bio:""
        }

        var cUser = JSON.parse(window.localStorage.getItem('currentUser'));
        console.log(cUser)
        this.state.name = cUser.fullname;
        this.state.bio = cUser.bio;
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
            margin: '0px',

        }
    }
    getImageStyle() {
        return {
            width:'100%',
            height:'260px'
        }
    }
    getNameStyles() {
        return {
            position:'absolute',
            top: this.props.top || '60px',
            color:'white',
            margin:'auto',
            left: '300px',
            fontSize: '24px',
            textAlign:'center',
            padding:'5px 20px 5px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }
    getBioStyles() {
        return {
            position:'absolute',
            top: this.props.top || '120px',
            color:'white',
            margin:'auto',
            left: '300px',
            fontSize: '24px',
            textAlign:'center',
            padding:'5px 20px 5px 20px',
            width:'50%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'

        }
    }

    getSBStyles() {
        return {
            position:'relative',
            width:'60%',
            height:'50px',
            margin:'auto',

        }
    }


    getAvatorStyles() {
        return {
            position:'absolute',
            borderRadius: '50%',
            left:'20px',
            top:'20px',
            width:'150px',
            height:'150px',

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
                 <img src='http://www.99sns.com/default_avator.png'  style={this.getAvatorStyles()} />
                    <div style={this.getNameStyles()}>
                        {this.state.name}
                    </div>

                    <div >
                        <p style={this.getBioStyles()}>{this.state.bio}Do you need logging just to help debug / write your code or is this more of a permanent fixture</p>
                    </div>
            </div>
        );
    }

}

export default ProfileBanner;
