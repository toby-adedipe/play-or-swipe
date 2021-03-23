import { Link } from 'react-router-dom';
import Movie from '../Movie';
import './categories.css';

const Categories = ({category, link}) => {
    const movies = [
        { id: 1, title: "Omo Ghetto", rating: 5, img: "https://placeimg.com/480/640/nature", year: "2020", genre: "Comedy", synopsis: "This is a story about Lefty who, together with her squad from the ghetto, was always getting into one trouble or the other."},
        { id: 2, title: "Lionheart", rating: 4, img: "https://placeimg.com/480/640/nature", year: "2020", genre: "Comedy", synopsis: "This is a story about Lefty who, together with her squad from the ghetto, was always getting into one trouble or the other."},
        { id: 3, title: "Ford v Ferrari", rating: 2, img: "https://placeimg.com/480/640/nature", year: "2020", genre: "Comedy", synopsis: "This is a story about Lefty who, together with her squad from the ghetto, was always getting into one trouble or the other."},
        { id: 4, title: "Sugar Rush", rating: 5, img: "https://placeimg.com/480/640/nature", year: "2020", genre: "Comedy", synopsis: "This is a story about Lefty who, together with her squad from the ghetto, was always getting into one trouble or the other."},
    ]
    return (
        <div>
            <div className="categoryHeader">
                <p className="categoryName">{category}</p>
                <Link to={link}><ion-icon name="chevron-forward-outline" id="arrow" ></ion-icon></Link> 
            </div>
            <div className="movies">
                {movies.map(({id, title, rating, img, year, genre, synopsis})=> (
                    <Movie 
                        key={id} 
                        title={title} 
                        rating={rating} 
                        img={img} 
                        year={year}
                        genre={genre}
                        synopsis={synopsis}
                    />
                ))}
            </div>
        </div>
    );
};

export default Categories;