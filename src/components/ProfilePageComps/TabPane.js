import React, { Component } from 'react';
import { Tabs, Tab, TabContent } from 'react-bootstrap';


class TabPane extends Component {

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/
    getTabHolderStyle() {
        return {
            position:'relative',
            top:'140px',
            left:'1%',
            width:'98%',
            height:'500px',
            backgroundColor:'white'
        };
    }
    getTabPaneStyle() {
        return {
            position:'relative',
            zIndex:'10'
        };
    }
    getTabStyle() {
        return {
            position:'relative',
            top:'0px',
            left:'0px',
            margin:'0px',
            padding:'0px'
        };
    }



    render() {
        return (
            <div style={this.getTabHolderStyle()}>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" style={this.getTabPaneStyle()}>
                    <Tab eventKey={1} title="All">
                        <TabContent style={this.getTabStyle()}>
                            <h1>All</h1>
                        </TabContent>
                    </Tab>

                    <Tab eventKey={2} title="Popular" style={this.getTabStyle()}>
                        <TabContent style={this.getTabStyle()}>
                            <h1>Popular</h1>
                        </TabContent>
                    </Tab>

                    <Tab eventKey={3} title="Liked" style={this.getTabStyle()}>
                        <TabContent style={this.getTabStyle()}>
                            <h1>Liked</h1>
                        </TabContent>
                    </Tab>

                    <Tab eventKey={4} title="Favorites" style={this.getTabStyle()}>
                        <TabContent style={this.getTabStyle()}>
                            <h1>Favorites</h1>
                        </TabContent>
                    </Tab>

                    <Tab eventKey={5} title="Playlists" style={this.getTabStyle()}>
                        <TabContent style={this.getTabStyle()}>
                            <h1>Playlists</h1>
                        </TabContent>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default TabPane;





// <Tabs onSelect={this.handleSelect} selectedIndex={0} style={this.getTabPaneStyle()}>
//     <TabList className='tabList'>
//         <Tab className='tab'>All</Tab>
//         <Tab className='tab'>Popular</Tab>
//         <Tab className='tab'>Liked</Tab>
//         <Tab className='tab'>Favorites</Tab>
//         <Tab className='tab'>Playlists</Tab>
//     </TabList>
//
//     <TabPanel className="tabPanel">
//         <TabContent><h1>Header1</h1></TabContent>
//     </TabPanel>
//     <TabPanel className="tabPanel">
//         <TabContent><h1>Header2</h1></TabContent>
//     </TabPanel>
//     <TabPanel className="tabPanel">
//         <TabContent><h1>Header3</h1></TabContent>
//     </TabPanel>
//     <TabPanel> className="tabPanel"
//         <TabContent><h1>Header4</h1></TabContent>
//     </TabPanel>
//     <TabPanel className="tabPanel">
//         <TabContent><h1>Header5</h1></TabContent>
//     </TabPanel>
// </Tabs>