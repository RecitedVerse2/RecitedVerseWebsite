import React, { Component } from 'react';

import * as firebase from 'firebase';
import {InstantSearch, SearchBox, Hits, Highlight} from 'react-instantsearch/dom';
import { createConnector } from "react-instantsearch";

import RVLogo from '../../res/RV-Final-Icon.png';
import TextLogo from '../../res/recitedverselogo.png';
// eslint-disable-next-line
import _ from '../../css/fonts.css';
// eslint-disable-next-line
import __ from '../../css/Header.css';

import Clock from '../Clock';
import { Link } from 'react-router-dom';
class Header extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    constructor() {
        super();

        this.state = {
            backgroundColor: 'rgba(0,0,0,0)',
            textColor: 'rgba(0,0,0,0)',
            showDownMenu:false,
            notifications:0,
        }


        var cUser = JSON.parse(window.localStorage.getItem('currentUser'));
        var fullname = cUser.fullname;
        this.state.name = fullname.substring(0, fullname.indexOf(' '))


        firebase.database().ref().child('Users').child(cUser.userID).once('value').then((snap)=>{
            var user = snap.val()
            var notifications = 0;
            if(user.notifications){
              notifications = user.notifications;
             }

             this.setState({'notifications' : notifications});
           });


        this.mouseOver = this.mouseOver.bind(this)
        this.mouseLeaves = this.mouseLeaves.bind(this)
    }




    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getHeaderStyle() {
        return {
            position: 'fixed',
            top:'0px',
            left:'0xp',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: 'white',
        }
    }

    getMobileHeaderStyle() {
        return {
            position: 'fixed',
            top:'0px',
            left:'0xp',
            width: '100%',
            height: '90px',
            display:'table',
            zIndex:'1000',
            backgroundColor: 'white',
        }
    }
    getLogoStyle() {
        return {
            position:'absolute',
            top:'0px',
            left:'20px',
            width:'254px',
            height:'50px',
            cursor:'pointer',
            marginTop:'5px',
            display:'table-cell',
        }
    }

    getMobileLogoStyle() {
        return {
            position:'absolute',
            top:'10px',
            left:'10px',
            width:'80px',
            height:'20px',
            cursor:'pointer',
            display:'table-cell',
        }
    }




    getSearchContainerStyle(){
      return {
          marginLeft: '500px',
          marginTop: '20px',
          width: '15%',
      }
    }

    getSearchInputStyle(){
      return {
        padding: '5px',
        marginTop: '5px',
        marginLeft: '250px',
        fontSize: '17px',
        width: '400px',
        border: '2px red',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.20)',
        borderRadius: '5px',
        fontFamily: 'Roboto-Regular',
        color: 'rgba(0,0,0,0.50)',
        textAlign: 'left',
      }
    }

    getSearchButtonStyle(){
      return {
        float: 'right',
        padding: '6px 10px',
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: '10px',
        marginRight: '16px',
        fontSize: '17px',
        border: 'none',
        cursor: 'pointer'
      }
    }


    getMobileButtonsSectionStyle() {
        return {
            position:'absolute',
            top:'20px',
            textAlign:'right',
            paddingRight:'50px',
            width: '365px',

            marginTop:'20px',
            display:'table-cell',
        }
    }

    getButtonsSectionStyle() {
        return {
            position:'absolute',
            top:'0px',
            right:'0px',
            textAlign:'right',
            paddingRight:'50px',
            width: '365px',
            marginTop:'20px',
            display:'table-cell',
        }
    }

    getUploadButtonsStyle() {
        return {
            textDecoration:'none',
            border:'none',
            background:'none',
            color: 'black',
            fontFamily:'HelveticaNeue',
            fontSize:'16px',
            outline:'none',
            marginLeft: '20px',

            float:'left',
            marginTop:'6px',
            fontWeight: 'bold'
        }
    }

    getMessagesButtonsStyle() {
        return {
            textDecoration:'none',
            border:'none',
            background:'none',
            color: 'black',
            fontFamily:'HelveticaNeue',
            fontSize:'16px',
            outline:'none',
            marginLeft: '20px',
            float:'left',
            marginTop:'6px',
            fontWeight: 'bold'
        }
    }

    getButtonsUserStyle() {
        return {
            textDecoration:'none',
            border:'none',
            background:'none',
            color: 'black',
            fontFamily:'HelveticaNeue',
            fontSize:'16px',
            marginRight: '20px',
            paddingRight: '0px',
            fontWeight: 'bold'
        }
    }

    getDownAreatyle(){
      return {
        marginRight: '50px',
        width: '50px',
        float:'right',
        paddingTop: '0px',
      }

    }

    getDownAreatyle(){
      return {
        width: '100px',
        float:'right',
        paddingTop: '0px'
      }

    }


    getDropdownMenu(){
      return {
        display: 'block',
        position: 'absolute',
        backgroundColor: '#f9f9f9',
        minWidth: '80px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: '1',
        marginLeft: "20px"
      }
    }

    getDropdownItem(){
      return {
        float: 'none',
        color: 'black',
        padding: '10px 5px 5px 15px',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'left',
        fontWeight: 'bold'

      }
    }
   getDownArrowStyle(){
     return {
       color: 'black',
       paddingTop:'10px',
       paddingLeft: '0px',
     }
   }

   getMessgesRedAlert(){
     return{
       marginLeft: '0px',
       float:'left',
       top: '-5px',
       left: '50%',
       height: '18px',
       minWidth: '18px',
       lineHeight: '14px',
       backgroundColor: '#ff2c33',
       borderRadius: '14px',
       zIndex: '1',
      fontSize: '12px',
      fontWeight: '400',
      textAlign: 'center',
      padding:'2px 4px'

     }
   }




    render() {
       var downMeue = "";
       let redNotifications = "";
       if(this.state.notifications){
         redNotifications = (<span style={this.getMessgesRedAlert()} >{this.state.notifications}</span>);
       }

       if(this.state.showDownMenu){
          downMeue = (
                <div  style={this.getDropdownMenu()}   >
                <a style={this.getDropdownItem()} href="profile">Profile</a>
                <a style={this.getDropdownItem()} href="accountsettings">Setting</a>
                <a style={this.getDropdownItem()} onClick={this.handleLogout.bind(this)} >Logout</a>
                </div>
          );
         }
         const ConditionalHits = createConnector({
            displayName: "ConditionalQuery",
            getProvidedProps(props, searchState, searchResults) {
              const { query, hits } = searchResults.results ? searchResults.results : {};
              return { query, hits };
            }
          })(({ query, hits }) => {
            const hs =
              hits && query
                ? hits.map(hit =>
                  <li>
                      <div style={{zIndex: '999', marginTop: '10px'}} className="inc-name">
                        {/* {hit.text.title} | <a href={'/user?' + hit.text.uploaderID}>{hit.text.uploaderName}</a> */}

                        {hit.recitation.title} | <a target="_blank" href={`/user?${hit.recitation.uploaderID}`}>{hit.recitation.uploaderName}</a>

                      </div>
                  </li>
                  )
                : null;
            return (
              <div id="hits">
                {hs}
              </div>
            );
          });



       const isMobile = window.innerWidth <= 800;
       if(isMobile){

                 return (

                     <div className='header' style={this.getMobileHeaderStyle()}>
                     <img onClick={this.goToHomePage.bind(this)} alt='logo' style={this.getMobileLogoStyle()} src={TextLogo}></img>


                         <div style={this.getSearchContainerStyle()} className="search-container">
                             {/* <input type="text" style={this.getSearchInputStyle()} onKeyPress={this.handleSearch.bind(this)} ref={(input)=>{this.searchBar = input}}  placeholder="Search.." name="search" /> */}
                             {/* <button type="submit" style={this.getSearchButtonStyle()} onClick={this.handleSearchButton.bind(this)}  ><i className="fa fa-search"></i></button> */}
                             <InstantSearch
                             appId="I5KQF3O5KB"
                             apiKey="8199ff4474cffdde931f62cc2bfe4d53"
                             indexName="recitedverse"
                         >
                             {/* Use widgets here */}
                             <SearchBox />
                             <ul className="suggestions" id="sugg">
                             <ConditionalHits />
                             </ul>
                         </InstantSearch>
                          </div>

                         <div style={this.getMobileButtonsSectionStyle()}>


                             <button style={this.getUploadButtonsStyle()} onClick={this.goToUploadPage.bind(this)}>Upload</button>
                               <button style={this.getMessagesButtonsStyle()} onClick={this.goToMessagesPage.bind(this)}>Notifications</button>
                               {redNotifications}



                             <div className="dropdown"   onMouseEnter={this.mouseOver} onMouseLeave={this.mouseLeaves} style={this.getDownAreatyle()}  >
                               <button  style={this.getButtonsUserStyle()}  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               {this.state.name} <i className="fa fa-caret-down"  style={this.getDownArrowStyle()} ></i>
                               </button>
                              {downMeue}
                             </div>

                         </div>


                         <Clock onupdate={this.update.bind(this)}></Clock>
                     </div>
                 );

       }else{

                 return (

                     <div className='header' style={this.getHeaderStyle()}>
                         <img onClick={this.goToHomePage.bind(this)} alt='logo' style={this.getLogoStyle()} src={TextLogo}></img>

                         <div style={this.getSearchContainerStyle()} className="search-container">
                             {/* <input type="text" style={this.getSearchInputStyle()} onKeyPress={this.handleSearch.bind(this)} ref={(input)=>{this.searchBar = input}}  placeholder="Search.." name="search" /> */}
                             {/* <button type="submit" style={this.getSearchButtonStyle()} onClick={this.handleSearchButton.bind(this)}  ><i className="fa fa-search"></i></button> */}
                             <InstantSearch
                             appId="I5KQF3O5KB"
                             apiKey="8199ff4474cffdde931f62cc2bfe4d53"
                             indexName="recitedverse"
                         >
                             {/* Use widgets here */}
                             <SearchBox />
                             <ul className="suggestions" id="sugg">
                             <ConditionalHits />
                             </ul>

                         </InstantSearch>
                          </div>

                         <div style={this.getButtonsSectionStyle()}>


                             <button style={this.getUploadButtonsStyle()} onClick={this.goToUploadPage.bind(this)}>Upload</button>
                               <button style={this.getMessagesButtonsStyle()} onClick={this.goToMessagesPage.bind(this)}>Notifications</button>
                               {redNotifications}



                             <div className="dropdown"   onMouseEnter={this.mouseOver} onMouseLeave={this.mouseLeaves} style={this.getDownAreatyle()}  >
                               <button  style={this.getButtonsUserStyle()}  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               {this.state.name} <i className="fa fa-caret-down"  style={this.getDownArrowStyle()} ></i>
                               </button>
                              {downMeue}
                             </div>

                         </div>


                         <Clock onupdate={this.update.bind(this)}></Clock>
                     </div>
                 );

       }


    }

    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    mouseOver(){
        this.state.showDownMenu = true;
    }

    mouseLeaves(){
        this.state.showDownMenu = false;
    }

    goToAccountSettings() {
        const store = this.props.rStore.getState();
        document.body.scrollTop = 0;

        if(store.currentUser !== null) {
            this.props.nav.goTo('accountsettings');
        } else {
            this.props.nav.goTo('login');
        }
    }

    goToPRofile() {
        const store = this.props.rStore.getState();
        document.body.scrollTop = 0;

        if(store.currentUser !== null) {
            this.props.nav.goTo('accountsettings');
        } else {
            this.props.nav.goTo('login');
        }
    }

    goToHomePage() {
        window.location = '/home';
    }

    handleSearch(e) {
        if(e.key === 'Enter') {
            window.sessionStorage.setItem('LastSearch', this.searchBar.value);
            window.location = 'search';
        }
    }


    handleSearchButton() {
            window.sessionStorage.setItem('LastSearch', this.searchBar.value);
            window.location = 'search';
    }

    handleLogout() {
        try {
            firebase.auth().signOut();
            window.localStorage.removeItem('currentUser');
            this.props.rStore.dispatch({
                type:'LOGOUT'
            });
        } catch(err) {
            console.log('Problem logging out. ' + err);
            return;
        }

        window.location = '/';

    }

    goToUploadPage() {
        window.location = '/upload';
    }

    goToMessagesPage() {
        window.location = '/notifications';
    }

    update() {
        if(document.body.scrollTop >= 30 || window.scrollY >= 30) {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0.85)',
                textColor: 'white',
            })
        } else {
            this.setState({
                backgroundColor: 'rgba(0,0,0,0)',
                textColor: 'black',

            })
        }
    }

};

export default Header;
