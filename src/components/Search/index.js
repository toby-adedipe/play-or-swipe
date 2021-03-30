import { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';

import AppContext from "../../context/AppContext";
import './search.css'
const Search = () => {
  const history = useHistory();

  const { search, searchVal, setSearchVal } = useContext(AppContext);

  const handleSearch =(val)=>{
    setSearchVal(val)
    search(val)
    //history.push('/search')
  }
  return (
      <div className="searchContainer">
          <div>
              <form id="search">
                  <input 
                    placeholder="Search for a movie"
                    value={searchVal} 
                    onChange={(e)=>handleSearch(e.target.value)}
                  />
                  <ion-icon name="search-outline" id="searchIcon" onClick={handleSearch}></ion-icon>
              </form>
          </div>
      </div>
  );
};

export default Search;