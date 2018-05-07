import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';
import Clock from '../Clock';

class UserItem extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            time:0,
            touching:false,
            visible:'hidden',
            opacity:'0.0'
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
           width:'200px',
           height: '200px',
           marginBottom:'80px',
           display:'inline-block',
           backgroundColor: 'blue',

       }
   }
   getImageStyles() {
       return {
           position:'relative',
           heigth:'100%',
           width: '100%',
           cursor : 'pointer'
       }
   }
   getTextStyles() {
       return {
           color:'black',
           border:'none',
           outline:'none',
           cursor:'pointer',
           fontFamily:'Roboto',
           fontSize:'20px',
           background:'none',
           paddingTop:'10px',
           textDecoration:'none',
           fontWeight: '700',
           textAlign: 'left',
           marginLeft: '5px',
           width: '90%',
           whiteSpace: 'nowrap',
           overflow:'hidden'

       }
   }
   getUploaderStyles() {
       return {
           color:'#595959',
           border:'none',
           outline:'none',
           cursor:'pointer',
           fontFamily:'Roboto',
           fontSize:'16px',
           background:'none',
           paddingTop:'10px',
           textDecoration:'none',
           fontWeight: '500',
           marginLeft: '5px',


       }
   }
   addToPlaylistButtonStyles() {
       return {
           position:'absolute',
           top:'-5px',
           right:'0px',
           width:'30px',
           height:'30px',
           opacity:this.state.opacity,
           visibility:this.state.visible,
           borderRadius:'25px',
           backgroundColor:'cyan',
           WebkitTransitionDuration:'0.3s'
       }
   }

   blockStyles(){
       return {
        marginTop:'20px',
        background: '#fff',
        display: 'inline-block',
        boxShadow: ' 0 1px 3px 0 rgba(0,0,0,0.20)',
        marginLeft: '15px',
        marginRight: '15px',
        borderRadius: '5px',
        textAlign: 'left',
        marginLeft: '5px',
        textAlign:'left'

       }
   }



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.blockStyles()}>
                <div ref={(div)=>{this.theDiv = div}} style={this.getStyles()} onMouseOver={this.mouseEnter.bind(this)} onMouseLeave={this.mouseExit.bind(this)}>
                    <img onClick={this.goToUserPage.bind(this)}
                        src={this.props.recitation.photoURL}
                        style={this.getImageStyles()}
                        width='100%'
                        height='100%'
                        alt='recim'/>
                <div>
                    <button onClick={this.goToUserPage.bind(this)}
                            style={this.getTextStyles()}>
                        {this.props.recitation.fullname}
                    </button>
                    <button style={this.getUploaderStyles()}>

                    </button>
                </div>



                    <Clock onupdate={this.update.bind(this)}></Clock>
                    {this.props.children}
                    </div>
            </div>

        );
    }




    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    mouseEnter() {
        this.setState({
            touching: true
        })
    }
    mouseExit() {
        this.setState({
            touching:false
        })
    }
    update() {
        if(this.state.touching) {
            this.setState({
                time: this.state.time + 1
            });
        } else {
            this.setState({
                time: 0
            })
        }

        // Change the visibility of the playlist button.
        if(this.state.time >= 20) {
            this.setState({
                visible:'visible',
                opacity:'0.8'
            })
        } else {
            this.setState({
                visible:'hidden',
                opacity:'0.0'
            })
        }
    }





    goToUserPage() {
        // Stringify the recitation for this item so it can be passed around pages.
        var url = '/user?' + this.props.recitation.id;
        window.location.href = url;
    }
  }



export default UserItem;
