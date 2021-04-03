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
                {data.slice(0, 5).map((item)=> (
                    <Movie 
                        key={item._id} 
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Categories;