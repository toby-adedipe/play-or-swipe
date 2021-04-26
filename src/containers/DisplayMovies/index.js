import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import './DisplayMovies.css';
import { useAuthDispatch, useAuthState } from '../../context';
import { deleteMovie } from '../../context/actions';
import DeleteModal from '../../components/DeleteModal';
import { useState } from 'react';

const DisplayMovies = ({data}) => {
  const [showModal, setShowModal] = useState(false);
  const { token, errorMessage } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleDelete = async()=>{
    const payload = {
      id: data._id,
      token,
    }
    const res = await deleteMovie(dispatch, payload);
    if (res.success){
      window.location.reload(false)
    }
  }
  return (
    <div className="display-movies">
      <DeleteModal 
        setShowModal={setShowModal}
        show={showModal}
        deleteMovie={handleDelete}
        title={data.title}
      />
      <p className="error">{errorMessage && errorMessage}</p>
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
          <div className="btn-container">
            <Link to={`/admin/movies/${data._id}`} className="edit-link">
              <button className="edit-btn">
                <ion-icon name="pencil-outline" id="edit-icon"></ion-icon>
                Edit
              </button>
            </Link>
            <div>
              <button className="delete-btn" onClick={()=>setShowModal(true)}>
                <ion-icon name="trash-outline" id="delete-icon"></ion-icon>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMovies;