import AppContext from '../../context/AppContext';
import { useContext } from "react";
import Movie from "../../components/Movie";
import './topRated.css';

import SearchResults from '../SearchResults';
import Search from '../../components/Search';
const TopRated = () => {
  const { top, searchVal } = useContext(AppContext);

  return (

    <>
      <Search />
      {
        searchVal.length>0
        ? <SearchResults />
        : <div className="top-rated-page">
          <p className="top-rated-h1">Top Rated Movies</p>
                {
                  top
                  ? <div className="top-rated-movies"> 
                      {top.map(({_id, genre, rating, synopsis, title, year, img, ratingFrequency})=> 
                        <Movie key={_id} id={_id} genre={genre} title={title} rating={rating} synopsis={synopsis} year={year} img={img} ratingFrequency={ratingFrequency}/>)}
                    </div>
                  :<p>Fetching movies...</p>
                }
            </div>
        }
    </>
  );
};

export default TopRated;