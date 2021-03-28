import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
 
import './App.css';

import HomePage from './pages/HomePage';
import TopRated from './pages/TopRated';
import Popular from './pages/Popular';
import Error404 from './pages/Error404';
import AddMovie from "./pages/AddMovie";

import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';




function App() {

  return (
      <Router>
        <Header />
        <Search />
        <Switch>
          <Route exact path = "/" component={HomePage} />
          <Route exact path = "/top-rated" component={TopRated} />
          <Route exact path = "/popular" component={Popular} />
          <Route exact path = "/add" component={AddMovie} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </Router>
  );
}

export default App;
