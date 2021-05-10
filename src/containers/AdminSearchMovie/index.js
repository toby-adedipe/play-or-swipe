import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

import './search-movie.css';

const AdminSearchMovie = ({data}) => {

  return (
    <div>
      <div className="admin-search-results-movie">
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
              <Link to={`/admin/movies/${data._id}`} className="edit-link">
                <button className="edit-btn">
                  <ion-icon name="pencil-outline" id="edit-icon"></ion-icon>
                  Edit
                </button>
              </Link>
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
    </div>
     );
};

export default AdminSearchMovie;