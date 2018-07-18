import React, { Component } from 'react';



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
            top:'0px',
            width: '100%',
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

                <DisplaySection title="What's Trending"
                                top='100px'
                                rStore={this.props.rStore}
                                nav={this.props.nav}
                                name='Trending'>
                </DisplaySection>

                <DisplaySection title='New Uploads'
                                top='150px'
                                rStore={this.props.rStore}
                                nav={this.props.nav}
                                name='Recent'>
                </DisplaySection>

                <ROTDArea rStore={this.props.rStore}
                            nav={this.props.nav}

                            audioPlayer={this.props.children}></ROTDArea>

                <PageFooter bottom='-200px'>
                </PageFooter>
                {this.props.children}
            </div>
        );
    }

}

export default Home;
