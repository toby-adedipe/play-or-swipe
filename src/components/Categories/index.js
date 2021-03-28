import { Link } from 'react-router-dom';
import Movie from '../Movie';
import './categories.css';

const Categories = ({category, link, data}) => {

    return (
        <div>
            <div className="categoryHeader">
                <p className="categoryName">{category}</p>
                <Link to={link}><ion-icon name="chevron-forward-outline" id="arrow" ></ion-icon></Link> 
            </div>
            <div className="movies">
                {data.slice(0, 5).map(({_id, title, rating, img, year, genre, synopsis, ratingFrequency})=> (
                    <Movie 
                        key={_id} 
                        id={_id}
                        title={title} 
                        rating={rating} 
                        img={img} 
                        year={year}
                        genre={genre}
                        synopsis={synopsis}
                        ratingFrequency={ratingFrequency}
                    />
                ))}
            </div>
        </div>
    );
};

export default Categories;