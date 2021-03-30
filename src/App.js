import { useMemo, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';

import './App.css';

import HomePage from './pages/HomePage';
import TopRated from './pages/TopRated';
import Popular from './pages/Popular';
import Error404 from './pages/Error404';
import AddMovie from "./pages/AddMovie";

import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';

import AppContext from './context/AppContext';
import SearchResults from "./pages/SearchResults";



function App() {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState(null);
  const [top, setTop] = useState(null);
  const [results, setResults] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const URL = "http://localhost:5000/api/v1"

  const fetchData = async()=>{
    const res = await axios.get(`${URL}/movies`)
    const filtered = filterPopular(res.data.data);
    setMovies(res.data.data);
    setPopular(filtered);
    setTop(filtered);
  }

  const filterPopular= (data)=>{
    const newData = data.filter((item)=>{
      return item.rating > 4.0;
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

  useEffect(()=>{
    fetchData()
  }, []);


  const context = useMemo(()=> ({
    showModal: showModal,
    setShowModal: setShowModal,
    popular,
    top,
    searchVal,
    setSearchVal,
    search: search,
    results,
  }))

  return (
    <AppContext.Provider value={context}>
      <Router>
        <Header />
        <Switch>
          <Route exact path = "/" component={HomePage} />
          <Route exact path = "/top-rated" component={TopRated} />
          <Route exact path = "/popular" component={Popular} />
          <Route exact path = "/add" component={AddMovie} />
          <Route exact path = "/search" component={SearchResults} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
