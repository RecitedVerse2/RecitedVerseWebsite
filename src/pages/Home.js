import React, { Component } from 'react';

import backgroundImage from '../../public/res/brickBackground.jpg';

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
    





    render() {
        return (
            <div style={this.getStyles()}>
                <div style={this.getOverlay()}></div>
                <img alt='bg' style={this.getImageStyles()} src={backgroundImage}></img>

                <HomeHeader rStore={this.props.rStore} nav={this.props.nav}></HomeHeader>
                <HomeCarousel rStore={this.props.rStore} nav={this.props.nav}></HomeCarousel>

                <DisplaySection title="What's Trending Now"
                                top='100px'
                                rStore={this.props.rStore}
                                nav={this.props.nav}
                                name='Trending'>
                </DisplaySection>

                <br/><br/><br/><br/><br/><br/><br/>

                <DisplaySection title='Recent Uploads'
                                top='150px'
                                rStore={this.props.rStore}
                                nav={this.props.nav}
                                name='Recent'>
                </DisplaySection>


                <br/><br/><br/><br/><br/><br/><br/><br/>
                <ROTDArea rStore={this.props.rStore} 
                            nav={this.props.nav} 
                            audioPlayer={this.props.children}></ROTDArea>

                <br/><br/>
                <PageFooter bottom='-400px'>
                    <br/><br/><br/>
                </PageFooter>
                <br/><br/><br/>

                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                {this.props.children}
            </div>
        );
    }

}

export default Home;
