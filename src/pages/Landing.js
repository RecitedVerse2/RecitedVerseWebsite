import React, { Component } from 'react';

import backgroundImage from '../../public/res/brickBackground.jpg';
import CarouselImage from '../../public/res/RVBanner.png';

import Header from '../components/LandingComps/Header';
import MainPointsSection from '../components/LandingComps/MainPointsSection';
import PointDescriptionSection from '../components/LandingComps/PointDescriptionSection';
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }
    getBannerStyle() {
        return {
            position:'relative',
            top:'70px',
            width:'100%'
        }
    }


    render() {
        return (
            <div style={this.getStyles()}>
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>


                <Header nav={this.props.nav}></Header>
                <img alt='ci' style={this.getBannerStyle()} src={CarouselImage}/>

                <MainPointsSection></MainPointsSection>


                <br/><br/><br/><br/><br/><br/><br/><br/>
                <PointDescriptionSection orientation='right'></PointDescriptionSection>
                <br/><br/><br/><br/><br/><br/>
                <PointDescriptionSection orientation='left'></PointDescriptionSection>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


                <AboutRV></AboutRV>
                <PageFooter></PageFooter>
                <br/><br/><br/><br/><br/><br/><br/>
                {this.props.children}
            </div>
        );
    }
}

export default Landing;
