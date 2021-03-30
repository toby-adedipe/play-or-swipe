import StarRatingComponent from 'react-star-rating-component';
import './search-movie.css';

const SearchMovie = ({data}) => {
  return (
    <div className="search-results-page">
      <hr />
      <div className="search-container">
        <div className="art-container">
          <img 
            src={data.img}
            alt={data.title}
            className="search-results-image"
          />
        </div>
        <div className="search-movie-info">
          <p className="movie-title search-title">{data.title} ({data.year})</p>
          <p className="search-synopsis">{data.synopsis}</p>
          <div className="search-rating-container">
            <StarRatingComponent
              name="rate"
              editing={false}
              starCount = {5}
              value={data.rating}
              starColor={"#EC1F41"}
            />
            <p className="rating">{data.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;