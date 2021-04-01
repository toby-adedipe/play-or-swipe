import { useContext } from 'react';
import Categories from '../../components/Categories';
import Search from '../../components/Search';
import AppContext from '../../context/AppContext';
import SearchResults from '../SearchResults';

const HomePage = () => {

  const {popular, top, searchVal } = useContext(AppContext)

    return (
        <>
          <Search />
          {
            popular === null || top === null
            ? <p>Fetching Data...</p>
            : searchVal.length>0
              ? <SearchResults />
              : <div className="home-page">
                  <Categories category="Top Rated Movies" link="/top-rated" data={top} />
                  <Categories category="Popular Movies" link="/popular" data={popular} />
                </div>         
          }
        </>
    );
};

export default HomePage;