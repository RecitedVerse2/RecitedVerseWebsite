import React, { Component } from 'react';
import * as firebase from 'firebase';

import backgroundImage from '../res/brickBackground.jpg';

import HomeHeader from '../components/HomePageComponents/HomeHeader';
import ProfileHeader from '../components/ProfilePageComps/ProfileHeader';
import ProfileBanner from '../components/ProfilePageComps/ProfileBanner';

import FileChooserForm from '../components/FileChooserFormAndSave';
import PageFooter from '../components/PageFooter';

// eslint-disable-next-line
import _ from '../css/EditProfile.css';

class EditProfile extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/


    constructor() {
        super();

        this.state = {
            name:'',
            email:'',
            bio:'',
            backgroundImage: '',
            photoURL:'',
            password:'Enter your password',
            passwordConfirm:'Re-enter your password',
            social:['','','',''],
            userID:'',
        }


    }

    componentDidMount() {
        var cUser = this.getCurrentUser();



        this.setState({
            name: cUser.fullname,
            email: cUser.email,
            bio: cUser.bio,
            backgroundImage: cUser.backgroundImage,
            photoURL: cUser.photoURL,
            userID:cUser.userID,
            social: [
                cUser.social_media_links[0],
                cUser.social_media_links[1],
                cUser.social_media_links[2],
                cUser.social_media_links[3]
            ]
        });



    }




    getCurrentUser() {
        var cUser = this.props.rStore.getState().currentUser;
        if(cUser === null) {
            cUser = JSON.parse(window.localStorage.getItem('currentUser'));

            if(cUser === null || cUser === undefined) {
                this.props.nav.goTo('login');
                return null;
            }
        }
        return cUser;
    }


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'absolute',
            left:'0px',
            top:'0px',
            width:'100%',
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }
    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1',
        }
    }

    getSBStyles(width = 60) {
        return {
            position:'relative',
            width: width + '%' || '50%',
            height:'50px',
            margin:'auto',
            display:'table',
            color:'white',
        }
    }
    getSearchBarTitleStyle(width = 15, left = 0) {
        return {
            position:'absolute',
            left:left + 'px' || '0px',
            marginTop:'0px',
            width: width + '%' || '15%',
            height:'100%',
            float:'left',
            fontSize:'20px',
            fontFamily:'HelveticaNeue',
            paddingLeft: '20px',
            WebkitPaddingBefore: '10px',
            display:'table-cell',
        }
    }
    getInputStyles(left = 15) {
        return {
            position:'absolute',
            left: left + '%' || '15%',
            width: 100 - left + '%' || '85%',
            height:'80%',
            fontSize:'20px',
            paddingLeft:'10px',
            color:'white',

        }
    }

    getFormButtonStyle2() {
        return {
          position:'absolute',
          left: '60px',
          top: '-150px',
          width: '70px',
          height: '30px',
          margin: 'auto',
          textAlign: 'center',
          fontSize: '15px',
          borderRadius:'10px'
        };
    }

    getFormButtonStyle3() {
        return {
          position:'absolute',
          left: '50px',
          top: '-80px',
          width: '180px',
          height: '30px',
          margin: 'auto',
          textAlign: 'center',
          fontSize: '15px',
          borderRadius:'10px'
        };
    }


    /// new from profile Banner
    getStyles2() {
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


    getavatarStyles() {
        return {
            position:'absolute',
            borderRadius: '50%',
            left:'20px',
            top:'20px',
            width:'150px',
            height:'150px',

        }
    }

    getSaveButtonStyle(){
      return{
        backgroundColor: '#4CAF50', /* Green */
        marginTop:'50px',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',

        display: 'inline-block',
        fontSize: '16px'
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


                {/* Header and Banner stuff. */}
                <HomeHeader nav={this.props.nav} rStore={this.props.rStore}></HomeHeader>
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>


                // banner
                <div style={this.getStyles2()}>
                <p ref={(p)=>{this.statusLabel = p}}></p>
                    <img alt='bckg' style={this.getImageStyle()} ref={(img)=>{this.backgroundImage= img}} src={this.state.backgroundImage}/>
                     <img src={this.state.photoURL} ref={(img)=>{this.avatar= img}}  style={this.getavatarStyles()} />
                        <div style={this.getNameStyles()}>
                            {this.state.name}
                        </div>

                        <div >
                            <p style={this.getBioStyles()}>{this.state.bio}</p>
                        </div>
                </div>




                {/* Edit personal information. */}
                <div className='editingContainer'>
                    <h1 className='titleText'>Personal</h1>

                    {/* All of the input fields. */}
                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(10, -2)}>Name:</h1>
                        <input ref={(input)=>{this.nameField = input}} style={this.getInputStyles(25)} type='text' placeholder={this.state.name} />
                    </div>

                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(10, -2)}>Email:</h1>
                        <input ref={(input)=>{this.emailField = input}} style={this.getInputStyles(25)} type='text' placeholder={this.state.email} />
                    </div>

                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(15, 0)}>Password:</h1>
                        <input ref={(input)=>{this.passwordField = input}} style={this.getInputStyles(25)} type='text' placeholder={this.state.password} />
                    </div>

                    <div style={this.getSBStyles()}>
                        <h1 style={this.getSearchBarTitleStyle(15, 0)}>Password:</h1>
                        <input ref={(input)=>{this.passwordConfirmField = input}} style={this.getInputStyles(25)} type='text' placeholder={this.state.password} />
                    </div>

                    <br/>

                    <div>
                    <FileChooserForm formButtonStyle={this.getFormButtonStyle2()}
                                    ref={(FileChooserForm)=>{this.fromFileBtn = FileChooserForm}}
                                    formButtonId='fromFileBtn'
                                    path={"Avatar/"+this.state.userID}
                                    formButtonClass='pill_btn' name='fileRecitation'
                                    accept='image/x-png' multiple='false'
                                    startFileSelectedHandler={(e)=>{this.startUploadAavatarImage()}}
                                    fileSelectedHandler={(e)=>{this.uploadAavatarImage(e)}}>
                        Upload
                    </FileChooserForm>

                    <FileChooserForm formButtonStyle={this.getFormButtonStyle3()}
                                    ref={(FileChooserForm)=>{this.fromFileBtn = FileChooserForm}}
                                    formButtonId='fromFileBtn'
                                    path={"Avatar/"+this.state.userID}
                                    formButtonClass='pill_btn2' name='fileRecitation2'
                                    accept='image/x-png' multiple='false'
                                    startFileSelectedHandler={(e)=>{this.startUploadBackgrouandImage()}}
                                    fileSelectedHandler={(e)=>{this.uploadBackgrouandImage(e)}}>
                        Upload background
                    </FileChooserForm>
                    </div>


                    {/* Setting the bio. */}
                    <h1 className='titleText'>Profile</h1>
                    <h1 className='bioText'>Bio</h1>
                    <textarea className='bioField'
                              ref={(textarea)=>{this.bioField = textarea}}
                              rows={5} cols={45}
                              placeholder={this.state.bio}></textarea>




              <div>

                    <button className='titleText' style={this.getSaveButtonStyle()} onClick={this.handleSaveChanges.bind(this)}>Save Changes</button>
</div>
                </div>


                <PageFooter bottom='-240px'>
                </PageFooter>
                {this.props.children}
            </div>
        );
    }




    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/
    uploadAavatarImage(url) {
      this.statusLabel.innerHTML =  "";
      this.setState({photoURL:url})
    };

    startUploadAavatarImage() {
      this.statusLabel.style.visibility = 'visible';
      this.statusLabel.style.WebkitTransitionDuration = '0.5s';
      this.statusLabel.style.paddingLeft='60px';
      this.statusLabel.style.color = 'red';
      this.statusLabel.style.opacity = '1';
      this.statusLabel.innerHTML = "Uploading...";
    };

    uploadBackgrouandImage(url) {
        this.statusLabel.innerHTML =  "";
        this.setState({backgroundImage:url})
    };

    startUploadBackgrouandImage(){
      this.statusLabel.style.visibility = 'visible';
      this.statusLabel.style.WebkitTransitionDuration = '0.5s';
      this.statusLabel.style.paddingLeft='60px';
      this.statusLabel.style.color = 'red';
      this.statusLabel.style.opacity = '1';
      this.statusLabel.innerHTML = "Uploading...";
    }

    handleSaveChanges() {
        var cUser = this.getCurrentUser();
        var user = firebase.auth().currentUser;
        var changes = cUser;
        var canSaveChanges = true;

        var name = this.nameField.value;
        var email = this.emailField.value;
        var password = this.passwordField.value;
        var passwordConfirm = this.passwordConfirmField.value;
        var bio = this.bioField.value;
        //var facebook = this.facebookField.value;
        //var twitter = this.twitterField.value;
        //var linkedin = this.linkedinField.value;
        //var instagram = this.instagramField.value;




        // Set all the appropriate values.
        if(this.valueExists(name) && name !== cUser.fullname) {
            changes['fullname'] = name;
        }

        if(this.valueExists(email)) {
            user.updateEmail(email).then( () => {
                changes['email'] = email;
                firebase.database().ref().child("Users").child(cUser.userID).child('email').set(email);
            }, (error) => {
                alert('That email is already in use.' + error);
                return;
            });
        }

        if(this.valueExists(password) && this.valueExists(passwordConfirm)) {
            if(password === passwordConfirm) {
                user.updatePassword(password).then( () => {
                    return;
                }, (error) => {
                    alert('Error changing password.');
                    return;
                });
            } else {
                alert('Passwords must match.');
                canSaveChanges = false;
            }
        } else if(!this.valueExists(password) && !this.valueExists(passwordConfirm)) {
            // Don't do anything.
        } else {
            alert('Error changing password.');
            canSaveChanges = false;
        }

        if(this.valueExists(bio)) {
            changes['bio'] = bio;
        }

        // var social = [facebook || cUser.social_media_links[0],
        //              twitter || cUser.social_media_links[1],
        //              linkedin || cUser.social_media_links[2],
        //              instagram || cUser.social_media_links[3]];
        // changes["social_media_links"] = social;



        changes["photoURL"] = this.state.photoURL
        changes["backgroundImage"] = this.state.backgroundImage


        if(canSaveChanges === true) {
            this.saveToFirebase(changes);
        } else {
            return;
        }
    }


    saveToFirebase(changes) {
        var cUser = this.getCurrentUser();

        firebase.database().ref().child("Users").child(cUser.userID).update(changes);

        // Update the current user object.
        firebase.database().ref().child('Users').child(cUser.userID).once('value', (snap) => {
            var usr = snap.val();
            window.localStorage.setItem('currentUser',JSON.stringify(usr));

            this.props.rStore.dispatch({
                type:'LOGIN',
                currentUser: usr
            });
            document.body.scrollTop = 0;
        });


        firebase.database().ref().child('Users').child(cUser.userID).once('value', (snap) => {
            var usr = snap.val();
            var fullname = usr.fullname;
            usr.name = fullname.substring(0, fullname.indexOf(' '))
            window.localStorage.setItem('currentUser',JSON.stringify(usr));

            this.props.nav.goTo('profile');
          });



    }



    // Returns whether or not a value for a particular element exists.
    valueExists(element) {
        if(element !== undefined && element !== null && element !== '') {
            return true;
        } else {
            return false;
        }
    }

}

export default EditProfile;
