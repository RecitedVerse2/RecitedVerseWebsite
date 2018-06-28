import React, { Component } from 'react';

import backgroundImage from '../res/brickBackground.jpg';
import CarouselImage1 from '../res/RVBanner.png';
import CarouselImage2 from '../res/flash_2.jpg';
import CarouselImage3 from '../res/flash_3.jpg';

import Header from '../components/LandingComps/Header';
import MainPointsSection from '../components/LandingComps/MainPointsSection';
//import PointDescriptionSection from '../components/LandingComps/PointDescriptionSection';
import AboutRV from '../components/LandingComps/AboutRV';
import PageFooter from '../components/PageFooter';

// The landing page for RecitedVerse.
class Landing extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    componentDidMount() {

    }


    getHeaderStyle() {
        return {
            position: 'fixed',
            top:'0px',
            left:'0xp',
            width: '100%',
            height: '70px',
            display:'table',
            zIndex:'1000',
            backgroundColor: 'rgba(0,0,0,0.85)'
        }
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
            width:'100%'
        };
    };
    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1',
        }
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'white'
        }
    }

    getMobileBannerDivStyle() {
        return {
            position:'relative',
            width:'100%',
            height:'100%',
            padding:'40px 40px 200px 0px'
        }
    }

    getBannerDivStyle() {
        return {
            position:'relative',
            width:'100%',
            height:'100%',
            padding:'60px 30px 200px 0px'
        }
    }



    getBannerStyle() {
        return {
            width:'100%',
            height:'100%',
            padding:'10px 0px 10px 0px'
        }
    }

    getIndicatorStyle(){
      return {
        top: '600px'
      }
    }


    render() {
      const isMobile = window.innerWidth <= 500;
      if(isMobile){

          return (
              <div style={this.getStyles()}>
                  <div style={this.getOverlay()}></div>
                   {/* <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img> */}
                  <Header nav={this.props.nav} style={this.getHeaderStyle()} ></Header>

                  <div id="myCarousel" className="carousel slide"  style={this.getMobileBannerDivStyle()} data-interval="4000" data-ride="carousel">
                  <ol className="carousel-indicators" style={this.getIndicatorStyle()}>
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner" >
                    <div className="item active" style={this.getBannerStyle()}>
                      <img src={CarouselImage1} alt="" ></img>
                    </div>

                    <div className="item" style={this.getBannerStyle()}>
                      <img src={CarouselImage2} alt="" ></img>
                    </div>

                    <div className="item" style={this.getBannerStyle()}>
                      <img src={CarouselImage3} alt="" ></img>
                    </div>
                  </div>
                  </div>

                  <PageFooter></PageFooter>
                  {this.props.children}
              </div>
          );

            }else{
              return (
              <div style={this.getStyles()}>
                  <div style={this.getOverlay()}></div>
                   {/* <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img> */}
                  <Header nav={this.props.nav} style={this.getHeaderStyle()} ></Header>

                  <div id="myCarousel" className="carousel slide"  style={this.getBannerDivStyle()} data-interval="4000" data-ride="carousel">
                  <ol className="carousel-indicators" style={this.getIndicatorStyle()}>
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner" >
                    <div className="item active" style={this.getBannerStyle()}>
                      <img src={CarouselImage1} alt="" ></img>
                    </div>

                    <div className="item" style={this.getBannerStyle()}>
                      <img src={CarouselImage2} alt="" ></img>
                    </div>

                    <div className="item" style={this.getBannerStyle()}>
                      <img src={CarouselImage3} alt="" ></img>
                    </div>
                  </div>
                  </div>

                  <PageFooter></PageFooter>
                  {this.props.children}
              </div>
          );

            }








    }
}

export default Landing;
