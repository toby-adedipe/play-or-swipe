import { useContext } from 'react';
import Categories from '../../components/Categories';
import Search from '../../components/Search';
import AppContext from '../../context/AppContext';
import SearchResults from '../SearchResults';
import Loader from 'react-loader-spinner';
import './homepage.css';

const HomePage = () => {

  const {popular, top, searchVal, visible, error } = useContext(AppContext)

    return (
        <div className="home-page">
          <Search />
          {
            error
            ? <p>{error}</p>
            : popular === null || top === null
              ? <div className="spinner-container">
                  <Loader 
                    type="TailSpin"
                    color="#EC1F41"
                    height={40}
                    width={40}
                    visible={visible}
                  />
                </div>
              : searchVal.length>0
                ? <SearchResults />
                : <div>
                    <Categories category="Top Rated Movies" link="/top-rated" data={top} />
                    <Categories category="Popular Movies" link="/popular" data={popular} />
                  </div>         
          }
        </div>
    );
};

export default HomePage;