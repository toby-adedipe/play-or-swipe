import './movie.css'
import StarRatingComponent from 'react-star-rating-component';

const Movie = ({ img, title, rating}) => {
    return (
        <div className="movieContainer">
            <img src={img} alt={title} className="movieArt"/>
            <p className="title">{title}</p>
            <div className="ratingContainer">
                <StarRatingComponent
                    name="rate"
                    editing={false}
                    starCount = {5}
                    value={rating}
                    starColor={"#EC1F41"}
                />
                <p className="rating">{rating}</p>
            </div>
            
        </div>
    );
};

export default Movie;