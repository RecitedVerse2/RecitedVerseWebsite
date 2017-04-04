import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import PillButton from '../PillButton';
import TabContent from './TabContent';
import UploadBox from './UploadBox';

import _ from '../../css/TabPane.css';


class TabPane extends Component {
    constructor() {
        super();
        this.state = {showUploadModal:false};
        Tabs.setUseDefaultStyles(false);
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
                <UploadBox shouldShow={this.state.showUploadModal} shouldClose={()=>{this.handleCloseModal()}}></UploadBox>
                <PillButton title='Upload new recitation' clickFunction={()=>{this.handleOpenModal()}}></PillButton>

                <Tabs onSelect={this.handleSelect} selectedIndex={0}>
                    <TabList>
                        <Tab className='tab'>All</Tab>
                        <Tab className='tab'>Popular</Tab>
                        <Tab className='tab'>Liked</Tab>
                        <Tab className='tab'>Favorites</Tab>
                        <Tab className='tab'>Playlists</Tab>
                    </TabList>

                    <TabPanel>
                        <TabContent><h1>Header1</h1></TabContent>
                    </TabPanel>
                    <TabPanel>
                        <TabContent><h1>Header2</h1></TabContent>
                    </TabPanel>
                    <TabPanel>
                        <TabContent><h1>Header3</h1></TabContent>
                    </TabPanel>
                    <TabPanel>
                        <TabContent><h1>Header4</h1></TabContent>
                    </TabPanel>
                    <TabPanel>
                        <TabContent><h1>Header5</h1></TabContent>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
export default TabPane;
