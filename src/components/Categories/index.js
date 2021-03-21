import Movie from '../Movie';
import './categories.css';

const Categories = ({category}) => {
    const movies = [
        { id: 1, title: "Omo Ghetto", rating: 5, img: "https://placeimg.com/480/640/nature"},
        { id: 2, title: "Lionheart", rating: 5, img: "https://placeimg.com/480/640/nature"},
        { id: 3, title: "Ford v Ferrari", rating: 5, img: "https://placeimg.com/480/640/nature"},
        { id: 4, title: "Sugar Rush", rating: 5, img: "https://placeimg.com/480/640/nature"},
    ]
    return (
        <div>
            <p className="categoryName">{category}</p>
            <div className="movies">
                {movies.map(({id, title, rating, img})=> <Movie key={id} title={title} rating={rating} img={img}/> )}
            </div>
        </div>
    );
};

export default Categories;