import { useContext, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import './homepage.css';

import Header from '../../components/Header';
import Search from '../../containers/Search';
import AppContext from '../../context/AppContext';
import Categories from '../../containers/Categories';
import { useAuthDispatch, useAuthState } from '../../context';
import { fetchTopMovies, fetchNigerian, fetchPopular } from '../../context/actions';

const HomePage = () => {
  const [top, setTop] = useState(null);
  const [nigerian, setNigerian] = useState(null);
  const [popular, setPopular] = useState(null);
  const [visible, setVisible] = useState(true);

  const { error, handleCookie } = useContext(AppContext)

  const dispatch = useAuthDispatch();
  const {errorMessage} = useAuthState();

  useEffect(()=>{
    const fetchData = async()=>{
      setVisible(true)
      const payload = { 
        page: 1,
        limit: "5",
        status: "approved",
      }
      const topData = await fetchTopMovies(dispatch, payload);
      const nigerianData = await fetchNigerian(dispatch, payload);
      const popularData = await fetchPopular(dispatch, payload);
      if(topData.success){
        setTop(topData.data);
      }
      if(nigerianData.success){
        setNigerian(nigerianData.data);
      }
      if(popularData.success){
        setPopular(popularData.data);
      }
      setVisible(false)   
    }
    fetchData();
    handleCookie();
  }, [handleCookie, dispatch]);
  
  return (
    <>
      <Header />
      <div className="home-page">
        <Search />
        {
          error
          
          ? <p>There is a problem with your internet connection</p>
          : visible
            ? <div className="top-spinner">
                <Loader 
                  type="TailSpin"
                  color="#EC1F41"
                  height={40}
                  width={40}
                  visible={visible}
                />
              </div>
              : (
                <>
                  <p>{errorMessage && errorMessage}</p>
                  <div>
                    <Categories category="Top Rated Movies" link="/top-rated" data={top} />
                    <Categories category="Top Rated Nigerian Movies" link="/top-nigerian" data={nigerian} />
                    <Categories category="Popular Movies" link="/popular" data={popular} />
                  </div>
                </>
              )     
        }
      </div>
    </>
  );
};

export default HomePage;