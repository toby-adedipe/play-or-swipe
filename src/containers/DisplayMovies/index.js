import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import './DisplayMovies.css';

const DisplayMovies = ({data}) => {
  return (
    <div className="display-movies">
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
          <Link to={`/admin/movies/${data._id}`} className="edit-link">
            <button className="edit-btn">
              <ion-icon name="pencil-outline" id="edit-icon"></ion-icon>
              Edit
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayMovies;