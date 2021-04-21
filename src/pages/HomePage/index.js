import { useContext, useEffect } from 'react';
import Categories from '../../containers/Categories';
import Search from '../../containers/Search';
import AppContext from '../../context/AppContext';
import SearchResults from '../SearchResults';
import Loader from 'react-loader-spinner';
import './homepage.css';
import Header from '../../components/Header';

const HomePage = () => {

  const {popular, top, searchVal, visible, error, nigerian, handleCookie } = useContext(AppContext)

  useEffect(()=>{
    handleCookie();
  }, [handleCookie]);
  
  return (
    <>
      <Header />
      <div className="home-page">
        <Search />
        {
          error
          
          ? <p>There is a problem with your internet connection</p>
          : popular === null || (top === null || nigerian === null)
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
                  <Categories category="Top Rated Nigerian Movies" link="/top-nigerian" data={nigerian} />
                  <Categories category="Popular Movies" link="/popular" data={popular} />
                </div>         
        }
      </div>
    </>
  );
};

export default HomePage;