import React, { Component } from 'react';

import backgroundImage from '../res/brickBackground.jpg';

import HomeHeader from '../components/HomePageComponents/HomeHeader';
import HomeCarousel from '../components/HomePageComponents/Carousel';
import DisplaySection from '../components/HomePageComponents/DisplaySection';
import ROTDArea from '../components/HomePageComponents/ROTDArea';
import PageFooter from '../components/PageFooter';

// This is the home page.
class Home extends Component {
    
    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/



    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getStyles() {
        return {
            position:'absolute',
            left:'0px',
            top:'0px'
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'white',
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
    





    render() {
        return (
            <div style={this.getStyles()}>
                <div style={this.getOverlay()}></div>
                <HomeHeader rStore={this.props.rStore} nav={this.props.nav}></HomeHeader>
                <HomeCarousel rStore={this.props.rStore} nav={this.props.nav}></HomeCarousel>

                <DisplaySection title="Trending Now"
                                top='100px'
                                rStore={this.props.rStore}
                                nav={this.props.nav}
                                name='Trending'>
                </DisplaySection>
                <DisplaySection title='Recent Uploads'
                                top='150px'
                                rStore={this.props.rStore}
                                nav={this.props.nav}
                                name='Recent'>
                </DisplaySection>
                <ROTDArea rStore={this.props.rStore} 
                            nav={this.props.nav} 
                            audioPlayer={this.props.children}></ROTDArea>

                <PageFooter bottom='-400px'>
                </PageFooter>
                {this.props.children}
            </div>
        );
    }

}

export default Home;
