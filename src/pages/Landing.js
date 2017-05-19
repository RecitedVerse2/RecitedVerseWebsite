import React, { Component } from 'react';

import Header from '../components/LandingComps/Header';
import LandingPageCarousel from '../components/LandingComps/Carousel';
import MainPointsSection from '../components/LandingComps/MainPointsSection';
import PointDescriptionSection from '../components/LandingComps/PointDescriptionSection';

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

                <Header></Header>
                <LandingPageCarousel></LandingPageCarousel>

                <MainPointsSection></MainPointsSection>


                <br/><br/><br/>
                <PointDescriptionSection></PointDescriptionSection>

                <br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        );
    }



    /**********************
    *                     *
    *       UTILITY       *
    *                     *
    ***********************/

    goToLogin() {
        this.props.navHeader.goTo('login');
    }
    goToSignup() {
        this.props.navHeader.goTo('signup');
    }
    submitToMailingList() {
        console.log('On mailing list!');
    }
}

export default Landing;
