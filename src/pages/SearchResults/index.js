import { useContext } from "react";
import { Link } from "react-router-dom";
import SearchDiv from "../../containers/SearchDiv";
import AppContext from "../../context/AppContext";

import './search-results.css'

const SearchResults = () => {
  const {searchVal, results} = useContext(AppContext);

  return (
    <>
      <div className="search-results">
        <p>Showing search results for "{searchVal}" </p>
        <SearchDiv results={results} />
        <hr />
        <Link to="/add">
        <div className="add-movie">
          <div className="add-container">
            <div>
            <ion-icon name="add" id="add"></ion-icon>
            </div>
          </div>
          <div className="add-btn-desc">
            <p>Can't find your movie? Be the first to rate it</p>
          </div>
        </div>
        </Link>
      </div>
    </>
  );
};

export default SearchResults;