import React, { Component } from 'react';

import Background from '../../res/profile.png';
import * as firebase from 'firebase';

class ProfileBanner extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();
        this.state = {
            follow:'Following',
        }

    }

    componentDidMount() {


        if(this.props.userInfo.following == true){
          this.setState({follow:'Followed'});
        }
        //var user = firebase.database().ref("User/"+this.props.userID)
        //console.log(user);


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

    getFollowStyles() {
        return {
            position:'absolute',
            color:'white',
            margin:'auto',
            left: '70px',
            top: '190px',
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
            left:'50px',
            top:'20px',
            width:'150px',
            height:'150px',

        }
    }

    getMobileAvatorStyles() {
        return {
            position:'absolute',
            borderRadius: '50%',
            paddingTop:'10px',
            left:'30px',
            top:'30px',
            width:'150px',
            height:'150px',

        }
    }


    getMobileNameStyles() {
      return {
        position: 'absolute',
        top: this.props.top || '60px',
        color: 'white',
        margin: 'auto',
        top: '200px',
        left: '40px',
        fontSize: '20px',
        textAlign: 'center',
        padding: '5px 20px 5px 20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }
    }



    getMobileFollowStyles() {
        return {
            position:'absolute',
            color:'white',
            margin:'auto',
            left: '200px',
            top: '90px',
            fontSize: '20px',
            textAlign:'center',
            padding:'5px 20px 5px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }

    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        const isMobile = window.innerWidth <= 800;
        if(isMobile){
          return (
              <div style={this.getStyles()}>
                  <img alt='bckg' style={this.getImageStyle()} src={this.props.userInfo.backgroundImage}/>
                   <img src={this.props.userInfo.photoURL}  style={this.getMobileAvatorStyles()} />
                      <div style={this.getMobileNameStyles()}>
                          {this.props.userInfo.fullname}
                      </div>
                      <div  >
                          <a style={this.getMobileFollowStyles()} onClick={this.goToFolllowing.bind(this)}>{this.props.userInfo.follow}</a>
                     </div>


              </div>
          );

        }else{
          return (
              <div style={this.getStyles()}>
                  <img alt='bckg' style={this.getImageStyle()} src={this.props.userInfo.backgroundImage}/>
                   <img src={this.props.userInfo.photoURL}  style={this.getAvatorStyles()} />
                      <div style={this.getNameStyles()}>
                          {this.props.userInfo.fullname}
                      </div>
                      <div style={this.getFollowStyles()}>
                          <a style={this.getFollowAStyles()} onClick={this.goToFolllowing.bind(this)}>{this.props.userInfo.follow}</a>

                      </div>

                      <div >
                        <p style={this.getBioStyles()}>{this.props.userInfo.bio}</p>
                    </div>


              </div>
          );


        }

    }


    // button callbck method
    goToFolllowing(){
        this.props.changeFollowStatus()
    }

}





export default ProfileBanner;
