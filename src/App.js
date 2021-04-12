import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import HomePage from './pages/HomePage';
import TopRated from './pages/TopRated';
import Popular from './pages/Popular';
import Error404 from './pages/Error404';
import AddMovie from "./pages/AddMovie";

import Header from './components/Header';
import Footer from './components/Footer';

import AppContext from './context/AppContext';
import SearchResults from "./pages/SearchResults";
import TopNigerian from "./pages/TopNigerianMovies";



function App() {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState(null);
  const [top, setTop] = useState(null);
  const [nigerian, setNigerian] = useState(null);
  const [results, setResults] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(["rateToken"]);
	const [currentCookie, setCurrentCookie] = useState(null);

  //const SERVER = "http://localhost:5000/api/v1"
  const URL = "https://play-or-swipe.herokuapp.com/api/v1"

  

  const filterPopular= (data)=>{
    const newData = data.filter((item)=>{
      return item.rating > 4.0;
    })
    return newData;
  }  

  const filterNigerian = (data) =>{
    const newData = data.filter((item)=>{
      if(item.location){
        return item.location.toLowerCase() === 'nigeria' && item.rating > 4.0;
      }else{
        return false;
      }
    })
    return newData;
  }

  

  const search = (val)=>{
    let results;
    if (val.length > 0){
      results = movies.filter(item=> item.title.toLowerCase().includes(val.toLowerCase()));
    }else{
      results=[]
    }
    setResults(results);
  }

	const handleCookie = ()=>{
		const rateToken = uuidv4();
		if( !cookies.rateToken ){
			setCookie("rateToken", rateToken, {
				path: '/'
			})
			setCurrentCookie(rateToken)
		}else{
			setCurrentCookie(cookies.rateToken)
		}
	}

  useEffect(()=>{
    const fetchData = async()=>{
      setVisible(true)
      try{
        const res = await axios.get(`${URL}/movies`)
        const filtered = filterPopular(res.data.data);
        const filteredNigerian = filterNigerian(res.data.data);
        setMovies(res.data.data);
        setPopular(filtered);
        setTop(filtered);  
        setNigerian(filteredNigerian)
      }catch(err){
        setError(err)
      }
      setVisible(false);
      handleCookie()
    };
    fetchData()
  }, []);


  const context = {
    showModal: showModal,
    setShowModal: setShowModal,
    popular,
    top,
    setTop,
    searchVal,
    setSearchVal,
    search,
    results,
    visible,
    setVisible,
    error,
    setError,
    currentCookie,
    nigerian,
  }

  return (
    <CookiesProvider>
      <AppContext.Provider value={context}>
        <Router>
          <Header />
          <Switch>
            <Route exact path = "/" component={HomePage} />
            <Route exact path = "/top-rated" component={TopRated} />
            <Route exact path = "/top-nigerian" component={TopNigerian} />
            <Route exact path = "/popular" component={Popular} />
            <Route exact path = "/add" component={AddMovie} />
            <Route exact path = "/search" component={SearchResults} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </Router>
      </AppContext.Provider>
    </CookiesProvider>
  );
}

export default App;
