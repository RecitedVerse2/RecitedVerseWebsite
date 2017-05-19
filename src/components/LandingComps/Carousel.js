import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';


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
            width:'100%',
            height:'350px'
        }
    }


    render() {
        return (
            <Carousel style={this.getCarouselStyles()}>
                <Carousel.Item>
                    <img width={900} alt="900x500" src="/assets/carousel.png"/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} alt="900x500" src="/assets/carousel.png"/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }


};

export default LandingPageCarousel;
