import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

import CarouselImage from '../../../public/res/RVBanner.png';

class LandingPageCarousel extends Component {

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    getCarouselStyles() {
        return {
            position:'relative',
            top:'70px',
            width:'100%'
        }
    }


    render() {
        return (
            <Carousel style={this.getCarouselStyles()}>
                <Carousel.Item>
                    <img src={CarouselImage}/>
                </Carousel.Item>
            </Carousel>
        );
    }


};

export default LandingPageCarousel;
