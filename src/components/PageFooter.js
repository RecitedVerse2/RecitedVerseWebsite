import React, { Component } from 'react';

import facebookBtn from '../res/FB-Icon.png';
import instagramBtn from '../res/IG-Icon.png';
import twitterBtn from '../res/TW-Icon.png';

// eslint-disable-next-line
import _ from '../css/Footer.css';

class PageFooter extends Component {

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
            position: 'relative',
            bottom: this.props.bottom || '150px',
            left: '0px',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0, 0.75)'
        }
    }



    /**********************
    *                     *
    *        RENDER       *
    *                     *
    ***********************/

    render() {
        return (
            <div style={this.getStyles()}>
                <div className='sectionHolders'>
                    <div className='companyInfoSection'>
                        <h1>Company</h1>
                        <button>About</button>
                        <br/>
                        <button>Jobs</button>
                        <br/>
                        <button>Press</button>
                        <br/>
                        <button>News</button>
                    </div>

                    <div className='communitiesSection'>
                        <h1>Community</h1>
                        <button>Artists</button>
                        <br/>
                        <button>Developers</button>
                        <br/>
                        <button>Brands</button>
                    </div>

                    <div className='userfulLinksSection'>
                        <h1>Useful Links</h1>
                        <button>Help</button>
                        <br/>
                        <button>Gifts</button>
                        <br/>
                        <button>Brands</button>
                    </div>

                    <div className='buttonsSection'>
                        <button className='socialBtn' onClick={this.goToFacebook.bind(this)}><img className='socialImg' src={facebookBtn} alt="facebook"/></button>
                        <button className='socialBtn' onClick={this.goToInstagram.bind(this)}><img className='socialImg' src={instagramBtn} alt="instagram"/></button>
                        <button className='socialBtn' onClick={this.goToTwitter.bind(this)}><img className='socialImg' src={twitterBtn} alt="twitter"/></button>
                    </div>
                </div>

                <div>
                    <h1 id='copyright'><span className='fa fa-copyright'></span>
                        &nbsp;
                        Recited Verse 2017
                    </h1>
                </div>
                {this.props.children}
            </div>
        );
    }


    /**********************
    *                     *
    *       METHODS       *
    *                     *
    ***********************/

    goToFacebook() {
        window.location = "https://www.facebook.com/recitedpoetry/"
    }

    goToInstagram() {
        window.location = "https://www.instagram.com/recitedverse2017/"
    }

    goToTwitter() {
        window.location = "https://twitter.com/recitedverse"
    }
}

export default PageFooter;
