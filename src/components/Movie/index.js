import './movie.css'

const Movie = ({ img, title, rating}) => {
    return (
        <div className="movieContainer">
            <img src={img} alt={title} className="movieArt"/>
            <p className="title">{title}</p>
            <p className="rating">{rating}</p>
        </div>
    );
};

export default Movie;