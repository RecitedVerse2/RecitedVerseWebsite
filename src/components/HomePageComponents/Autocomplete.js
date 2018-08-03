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
import navigation from '../../components/navigation';
import createBrowserHistory from 'history/createBrowserHistory'

const Product = ({ hit }) => {
  console.log(hit, 'hit is')
  return (
      <div style={{width: '100%'}} key={hit.recitation.title}>
        <span onClick={() => handleIndivPoemClick(hit)} style={{width: '100%', cursor: 'pointer' }}>{hit.recitation.title}</span> - <span style={{cursor: 'pointer'}} onClick={() => handleLinkClick(hit)}><b>{hit.recitation.uploaderName}</b></span>
         <br/><span style={{cursor: 'pointer'}} onClick={() => handlePoemClick(hit)}>View All</span>
        <br/>
          <span><i>{hit.recitation.genre}</i></span>
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
  // console.log(hit, 'this is hit');
  // window.location.href = '/allrecordings?' + hit.recitation.id;

}

const handlePoemClick = (hit) => {
  window.location.href = '/allrecordings?' + hit.recitation.id;
}

const handleIndivPoemClick= (hit) => {
   // Stringify the recitation for this item so it can be passed around pages.
   var cache = [];
   var rec = JSON.stringify(hit.recitation, (key, value) => {
       if (typeof value === 'object' && value !== null) {
           if (cache.indexOf(value) !== -1) {
               // Circular reference found, discard key
               return;
           }
           // Store value in our collection
           cache.push(value);
       }
       return value;
   });

   window.sessionStorage.setItem('CurrentRecitation', rec);
   document.body.scrollTop = 0;
   const navObj = new navigation();
   const customHistory = createBrowserHistory()
   customHistory.push('poem');
   window.location.href = '/poem';
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
            <div style={{width: '350px', marginRight: '-100px'}} >
            <InstantSearch
            appId="I5KQF3O5KB"
            apiKey="8199ff4474cffdde931f62cc2bfe4d53"
            indexName="recitedverse"
        >
           <Configure hitsPerPage={25} />
           <SearchBox />
           <ul style={{width: '100%'}}>
            <Results />      
            </ul>   
           
        </InstantSearch>
        </div>
        )
    }
}