import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
//import Error404 from '../pages/Error404';
import HomePage from '../pages/HomePage';
import TopRated from '../pages/TopRated';
import Popular from '../pages/Popular';
import AddMovie from "../pages/AddMovie";
import SignUp from "../pages/SignUp";
import SearchResults from "../pages/SearchResults";
import TopNigerian from '../pages/TopNigerianMovies';
import Movie from '../pages/Movie';



const routes =[
  {
    path:'/login',
    component: Login,
    isPrivate: false,
  },
  {
    path:'/signup',
    component: SignUp,
    isPrivate: false,
  },
  {
    path:'/',
    component: HomePage,
    isPrivate: false,
  },
  {
    path:'/top-rated',
    component: TopRated,
    isPrivate: false,
  },
  {
    path:'/popular',
    component: Popular,
    isPrivate: false,
  },
  {
    path:'/top-nigerian',
    component: TopNigerian,
    isPrivate: false,
  },
  {
    path:'/add',
    component: AddMovie,
    isPrivate: false,
  },
  {
    path:'/search',
    component: SearchResults,
    isPrivate: false,
  },
  {
    path:'/dashboard',
    component: Dashboard,
    isPrivate: true,
  },
  {
    path:'/movies/id',
    component: Movie,
    isPrivate: false,
  },
  // {
  //   path:'/*',
  //   component: Error404,
  //   isPrivate: false,
  // },
]
 
export default routes