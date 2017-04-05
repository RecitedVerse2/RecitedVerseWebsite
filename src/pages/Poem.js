import React, { Component } from 'react';
import { Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';

import AudioPlayer from '../components/AudioPlayer';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';

import _ from '../css/Poem.css';


// The generic poem page for each recitation.
class Poem extends Component {
    render() {
        const popoverBottom = (
            <Popover id="popover-positioned-bottom" title="Transcript">
                {this.props.transcript}
            </Popover>
        );

        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>


                <ContentArea>
                    <ContentHeader height='300px'>

                        <div className="horizontal_info_section">
                            <div className="vertical_image_section">
                                <img id="poem_image" src='' alt="im" width={200} height={200} />
                            </div>

                            <div className="vertical_info_section">
                                <h4 id="title_author_area" />
                                <br />
                                <p id="recBy_Pub_Gen" />
                                <p id="descr_area" />
                                <div className="description_buttons_section">
                                    <OverlayTrigger delayShow='1000' placement="bottom" overlay={<Tooltip id="tooltip">Play</Tooltip>}>
                                        <button className="description_button fa fa-play"/>
                                    </OverlayTrigger>
                                    <OverlayTrigger delayShow='1000' placement="bottom" overlay={<Tooltip id="tooltip">Like</Tooltip>}>
                                        <button className="description_button fa fa-thumbs-up"/>
                                    </OverlayTrigger>
                                    <OverlayTrigger delayShow='1000' placement="bottom" overlay={<Tooltip id="Favorite">Favorite</Tooltip>}>
                                        <button className="description_button fa fa-heart"/>
                                    </OverlayTrigger>
                                </div>
                            </div>

                            <div className="vertical_numbers_section">
                                <div style={{display: 'table', float: 'right'}}>
                                    <p style={{display: 'table-cell'}} id="poem_play_label" />&nbsp;<p style={{display: 'table-cell'}} className="fa fa-play" />
                                </div>
                                <br />
                                <div style={{display: 'table', float: 'right'}}>
                                    <p style={{display: 'table-cell'}} id="poem_like_label" />&nbsp;<p style={{display: 'table-cell'}} className="fa fa-thumbs-up" />
                                </div>
                                <br />
                                <div style={{display: 'table', float: 'right'}}>
                                    <p style={{display: 'table-cell'}} id="poem_favorite_label" />&nbsp;<p style={{display: 'table-cell'}} className="fa fa-heart" />
                                </div>
                            </div>
                        </div>
                        <div style={{position: 'relative', backgroundColor: 'white', width: '100%', textAlign: 'center'}}>
                            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                                <button id="view_transcript_btn" data-toggle="popover" data-placement="bottom" title="Poem Transcript"> Click to view transcript </button>
                            </OverlayTrigger>
                        </div>

                    </ContentHeader>
                </ContentArea>




                <AudioPlayer></AudioPlayer>
            </div>
        );
    }


    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Poem;
