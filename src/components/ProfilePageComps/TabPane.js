import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import PillButton from '../PillButton';
import TabContent from './TabContent';
import UploadBox from './UploadBox';


class TabPane extends Component {
    constructor() {
        super();
        this.state = {showUploadModal:false};
    }

    /**********************
    *                     *
    *    MODAL CONTROLS   *
    *                     *
    ***********************/
    handleCloseModal() { this.setState({ showUploadModal: false }); }
    handleOpenModal() { this.setState({ showUploadModal: true }); }


    render() {
        return (
            <div>
                <UploadBox shouldShow={this.state.showUploadModal} shouldClose={()=>{this.handleCloseModal()}}>

                </UploadBox>

                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="All">
                        <TabContent></TabContent>
                    </Tab>
                    <Tab eventKey={2} title="Popular">
                        <TabContent></TabContent>
                    </Tab>
                    <Tab eventKey={3} title="Liked">
                        <TabContent></TabContent>
                    </Tab>
                    <Tab eventKey={3} title="Favorites">
                        <TabContent></TabContent>
                    </Tab>
                    <Tab eventKey={3} title="Playlists">
                        <TabContent></TabContent>
                    </Tab>
                </Tabs>

                <PillButton title='Upload new recitation' clickFunction={()=>{this.handleOpenModal()}}></PillButton>
            </div>
        );
    }
}
export default TabPane;
