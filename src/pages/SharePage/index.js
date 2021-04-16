import { useContext } from "react";
import AppContext from "../../context/AppContext";

const SharePage = () => {
  const { currentRating, setCurrentRating } = useContext(AppContext);

  return (
    currentRating
    ?(
        <div className="search-results-movie" onClick={()=>setShowModal(true)}>
          <div className="search-container">
            <div className="art-container">
              <img 
                src={currentRating.img}
                alt={currentRating.title}
                className="search-results-image"
              />
            </div>
            <div className="search-movie-info">
              <p className="movie-title search-title">{currentRating.title} ({currentRating.year})</p>
              <p className="search-synopsis">{currentRating.synopsis}</p>
              <div className="search-rating-container">
                <StarRatingComponent
                  name="rate"
                  editing={false}
                  starCount = {5}
                  value={currentRating.rating}
                  starColor={"#EC1F41"}
                />
                <p className="rating">{currentRating.rating}</p>
              </div>
            </div>
          </div>
      </div>
    ):(
      null
    )
  );
};

export default SharePage;