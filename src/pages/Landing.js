import React, { Component } from 'react';

import Header from '../components/LandingComps/Header';
import LandingPageCarousel from '../components/LandingComps/Carousel';
import MainPointsSection from '../components/LandingComps/MainPointsSection';
import PointDescriptionSection from '../components/LandingComps/PointDescriptionSection';
import Footer from '../components/LandingComps/Footer';

// The landing page for RecitedVerse.
class Landing extends Component {

    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    componentDidMount() {
        this.props.navHeader.hide();
        console.log(this.props.audioPlayer);
    }



    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles = () => {
        return {
            position:'absolute',
            left:'0px',
            top:'0px'
        };
    };


    render() {
        return (
            <div style={this.getStyles()}>

                <Header navHeader={this.props.navHeader}></Header>
                <LandingPageCarousel></LandingPageCarousel>

                <MainPointsSection></MainPointsSection>


                <br/><br/><br/>
                <PointDescriptionSection orientation='right'></PointDescriptionSection>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <PointDescriptionSection orientation='left'></PointDescriptionSection>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


                <Footer></Footer>

                {this.props.children}
            </div>
        );
    }
}

export default Landing;
