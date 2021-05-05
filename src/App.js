import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import Footer from './components/Footer';
import Error404 from './pages/Error404';
import AppContext from './context/AppContext';
import routes from "./config/routes";
import { AuthProvider } from "./context";
import AppRoute from "./config/AppRoute";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [cookies, setCookie] = useCookies(["rateToken"]);
	const [currentCookie, setCurrentCookie] = useState(null);
  const [currentRating, setCurrentRating] = useState(null);
  const [response, setResponse] = useState(null);

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

  const context = {
    showModal,
    setShowModal,
    searchVal,
    setSearchVal,
    results,
    setResults,
    visible,
    setVisible,
    error,
    setError,
    currentCookie,
    handleCookie,
    currentRating,
    setCurrentRating,
    page,
    setPage,
    response,
    setResponse,
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
                  type={route.type}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
              <Route exact component={Error404}/>
            </Switch>
            <Footer />
          </Router>
        </AppContext.Provider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
