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


    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/
    getTabPaneStyle() {
        return {
            position:'relative',
            top:'100px'
        };
    }


    render() {
        return (
            <div>
                <UploadBox shouldShow={this.state.showUploadModal} shouldClose={()=>{this.handleCloseModal()}}></UploadBox>
                <PillButton title='Upload new recitation' clickFunction={()=>{this.handleOpenModal()}}></PillButton>

                <Tabs onSelect={this.handleSelect} selectedIndex={0} style={this.getTabPaneStyle()}>
                    <TabList style={{position:'relative',left:'-25px'}}>
                        <Tab className='tab' activeTabClassName="is-active" disabledTabClassName="is-disabled">All</Tab>
                        <Tab className='tab' activeTabClassName="is-active" disabledTabClassName="is-disabled">Popular</Tab>
                        <Tab className='tab' activeTabClassName="is-active" disabledTabClassName="is-disabled">Liked</Tab>
                        <Tab className='tab' activeTabClassName="is-active" disabledTabClassName="is-disabled">Favorites</Tab>
                        <Tab className='tab' activeTabClassName="is-active" disabledTabClassName="is-disabled">Playlists</Tab>
                    </TabList>

                    <TabPanel className="tabPanel">
                        <TabContent><h1>Header1</h1></TabContent>
                    </TabPanel>
                    <TabPanel className="tabPanel">
                        <TabContent><h1>Header2</h1></TabContent>
                    </TabPanel>
                    <TabPanel className="tabPanel">
                        <TabContent><h1>Header3</h1></TabContent>
                    </TabPanel>
                    <TabPanel> className="tabPanel"
                        <TabContent><h1>Header4</h1></TabContent>
                    </TabPanel>
                    <TabPanel className="tabPanel">
                        <TabContent><h1>Header5</h1></TabContent>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
export default TabPane;
