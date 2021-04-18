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

import Footer from './components/Footer';
import AppContext from './context/AppContext';
import routes from "./config/routes";
import { AuthProvider } from "./context";
import AppRoute from "./config/AppRoute";
import Movie from "./pages/Movie";
import { URL } from "./config/url";



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
  const [currentRating, setCurrentRating] = useState(null);
  
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
      }catch(error){
        setError(error.response.data.error)
      }
      setVisible(false);
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
    handleCookie,
    currentRating,
    setCurrentRating,
  }

  return (
    <CookiesProvider>
      <AuthProvider>
        <AppContext.Provider value={context}>
          <Router>
            <Switch>
              {routes.map((route)=>(
                <AppRoute
                  key={route.path}
                  exact
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
              <Route path="/movies/:id" children={<Movie />} />
            </Switch>
            <Footer />
          </Router>
        </AppContext.Provider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
