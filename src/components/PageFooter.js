import React, { Component } from 'react';

import facebookBtn from '../../public/res/FB-Icon.png';
import instagramBtn from '../../public/res/IG-Icon.png';
import twitterBtn from '../../public/res/TW-Icon.png';

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
            height: '100%'
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
                        <button className='socialBtn'><img className='socialImg' src={facebookBtn} alt="facebook"/></button>
                        <button className='socialBtn'><img className='socialImg' src={instagramBtn} alt="instagram"/></button>
                        <button className='socialBtn'><img className='socialImg' src={twitterBtn} alt="twitter"/></button>
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

}

export default PageFooter;