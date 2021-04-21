import { useContext } from "react";

import AppContext from "../../context/AppContext";
import './search.css'
const Search = () => {

  const { search, searchVal, setSearchVal } = useContext(AppContext);

  const handleSearch =(val)=>{
    setSearchVal(val)
    search(val)
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