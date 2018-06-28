import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Configure
} from "react-instantsearch/dom";
import { connectStateResults } from "react-instantsearch/connectors";
import _ from '../../css/fonts.css';
import __ from '../../css/Header.css';

const Product = ({ hit }) => {
  return (
      <div style={{width: '100%'}} key={hit.recitation.title} onClick={() => handleLinkClick(hit)}>
        <span style={{width: '100%', cursor: 'pointer' }}>{hit.recitation.title} | {hit.recitation.uploaderName}</span>
      <hr />
      </div>
  );
};

const Search = () => {
  return (
    <div>
      <SearchBox />
      <ul className="suggestions" id="sugg">
      <Results />
      </ul>
    </div>
  );
};

const handleLinkClick = (hit) => {
  window.open(`/user?${hit.recitation.uploaderID}`);
}


const Results = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
      <Hits hitComponent={Product} />
    ) : //<div>No query</div>
    null
);

export default class Autocomplete extends Component {
    constructor(props){
        super(props);
    }
    render(){



        return (
            <div style={{width: '100%'}} >
            <InstantSearch
            appId="I5KQF3O5KB"
            apiKey="8199ff4474cffdde931f62cc2bfe4d53"
            indexName="recitedverse"
        >
           <Configure hitsPerPage={5} />
           <SearchBox />
           <ul style={{width: '100%'}}>
            <Results />      
            </ul>   
           
        </InstantSearch>
        </div>
        )
    }
}