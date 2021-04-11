import AppContext from '../../context/AppContext';
import { useContext } from "react";
import Movie from "../../components/Movie";
import './TopNigerian.css';

import SearchResults from '../SearchResults';
import Search from '../../components/Search';
const TopNigerian = () => {
  const { nigerian, searchVal } = useContext(AppContext);

  return (

    <>
      <Search />
      {
        searchVal.length>0
        ? <SearchResults />
        : <div className="top-rated-page">
          <p className="top-rated-h1">Top Rated Nigerian Movies</p>
                {
                  nigerian
                  ? <div className="top-rated-movies"> 
                      {nigerian.map((item)=> 
                        <Movie key={item._id} data={item}/>)}
                    </div>
                  :<p>Fetching movies...</p>
                }
            </div>
        }
    </>
  );
};

export default TopNigerian;