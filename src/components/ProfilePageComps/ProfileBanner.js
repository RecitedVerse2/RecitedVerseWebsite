import React, { Component } from 'react';


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
            bio:"",
            avatar:"",
            backgroundImage:""
        }


        var cUser = JSON.parse(window.localStorage.getItem('currentUser'));

        this.state.name = cUser.fullname;
        this.state.bio = cUser.bio;
        this.state.avatar = cUser.photoURL
        this.state.backgroundImage = cUser.backgroundImage

    }

    componentDidMount() {
        const store = this.props.rStore.getState();

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
            height:'260px',
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

    getFollowStyles() {
        return {
            position:'absolute',
            color:'white',
            margin:'auto',
            left: '20px',
            top: '200px',
            fontSize: '24px',
            textAlign:'center',
            padding:'5px 20px 5px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }

    getFollowAStyles() {
        return {
            cursor: 'pointer',
            color:'white',
        }
    }

    getFollowARightStyles() {
        return {
            cursor: 'pointer',
            marginLeft:'20px',
            color:'white',
        }
    }

    getBioStyles() {
        return {
            position:'absolute',
            top: this.props.top || '120px',
            color:'white',
            left: '300px',
            fontSize: '24px',
            textAlign:'left',
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
            left:'50px',
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
                <img alt='bckg' style={this.getImageStyle()} src={this.state.backgroundImage}/>
                 <img src={this.state.avatar}  style={this.getAvatorStyles()} />
                    <div style={this.getNameStyles()}>
                        {this.state.name}
                    </div>
                    <div style={this.getFollowStyles()}>
                        <a style={this.getFollowAStyles()} onClick={this.goToFolllowing.bind(this)}><strong>25</strong> Following</a>

                    </div>

                    <div >
                        <p style={this.getBioStyles()}>{this.state.bio}</p>
                    </div>
            </div>
        );
    }


    // button callbck method
    goToFolllowing(){
      window.location.href = 'profile?type=following';
    }

    goToFolllower(){
      window.location.href = 'profile?type=follower';
    }


}



export default ProfileBanner;
