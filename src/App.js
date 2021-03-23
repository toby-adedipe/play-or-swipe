import { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.css';

import HomePage from './pages/HomePage';
import TopRated from './pages/TopRated';
import Popular from './pages/Popular';

import Header from './components/Header';
import Footer from './components/Footer';
import Error404 from './pages/Error404';
import AppContext from './context/AppContext';

function App() {

  const appContext = useMemo(()=>({
  }))

  return (
    <AppContext.Provider value={appContext}>
      <Router>
        <Header />
        <Switch>
          <Route exact path = "/" component={HomePage} />
          <Route exact path = "/top-rated" component={TopRated} />
          <Route exact path = "/popular" component={Popular} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
