import { useContext } from "react";
import Movie from "../../components/Movie";
import './popular.css';
import AppContext from '../../context/AppContext';
import Search from "../../components/Search";
import SearchResults from "../SearchResults";

const TopRated = () => {
  const { popular, searchVal } = useContext(AppContext);

  return (
    <>
      <Search />
      {
        searchVal.length>0
        ? <SearchResults />
        : <div className="popular-page">
            <p className="popular-h1">Popular Movies</p>
              {
                popular
                ? <div className="popular-movies"> 
                    {popular.map(({_id, genre, rating, synopsis, title, year, img, ratingFrequency})=> 
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