import React, { Component } from 'react';

import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';

// This is the search results page.
class Search extends Component {
    /**********************
    *                     *
    *    INITIALIZATION   *
    *                     *
    ***********************/

    componentDidMount() {

    }


    /**********************
    *                     *
    *       STYLES        *
    *                     *
    ***********************/

    headerStyles = ()=>{
        return {
            height:'200px',
            padding:'20px'
        }
    }

    resultsAreaStyles() {
        return {
            position:'relative',
            top:'50px',
            width:'98%',
            margin:'auto',
            textAlign:'center',
            backgroundColor:'white'
        }
    }



    /**********************
    *                     *
    *       RENDER        *
    *                     *
    ***********************/

    render() {
        return (
            <div>
                <ContentArea>
                    <ContentHeader {...this.headerStyles()} style={{textAlign:'center'}}>
                        <h4>Search By:</h4><br/>
                        <input type="radio" name="searchType" onClick={this.handleChangeSearchType.bind(this)} value="Recitations"/>&nbsp;Reciations
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="searchType" onClick={this.handleChangeSearchType.bind(this)} value="Users"/>&nbsp;Users<br/>
                    </ContentHeader>


                    <div className='results_area' style={this.resultsAreaStyles()}>

                    </div>
                </ContentArea>
            </div>
        );
    }



    /**********************
    *                     *
    *   UTILITY METHODS   *
    *                     *
    ***********************/

    // Loads the data for the search
    loadResults(criteria) {
        
    }


    handleChangeSearchType() {

    }
}


export default Search;
