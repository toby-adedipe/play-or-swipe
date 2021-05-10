import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import TopRated from '../pages/TopRated';
import Popular from '../pages/Popular';
import AddMovie from "../pages/AddMovie";
import SignUp from "../pages/SignUp";
import SearchResults from "../pages/SearchResults";
import TopNigerian from '../pages/TopNigerianMovies';
import Movie from '../pages/Movie';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import EditMovie from '../pages/Admin/EditMovie';
import ApprovedMovies from '../pages/Admin/ApprovedMovies';
import PendingMovies from '../pages/Admin/PendingMovies';
import AdminAdd from '../pages/Admin/AdminAdd';
import AdminSearchResults from '../pages/Admin/AdminSearchResults';

const routes =[
  {
    path:'/login',
    component: Login,
    isPrivate: false,
    type: 'auth'
  },
  {
    path:'/signup',
    component: SignUp,
    isPrivate: false,
    type: 'auth'
  },
  {
    path:'/',
    component: HomePage,
    isPrivate: false,
    type: 'general'
  },
  {
    path:'/top-rated',
    component: TopRated,
    isPrivate: false,
    type: 'general'
  },
  {
    path:'/popular',
    component: Popular,
    isPrivate: false,
    type: 'general'
  },
  {
    path:'/top-nigerian',
    component: TopNigerian,
    isPrivate: false,
    type: 'general'
  },
  {
    path:'/add',
    component: AddMovie,
    isPrivate: false,
    type: 'general'
  },
  {
    path:'/search',
    component: SearchResults,
    isPrivate: false,
    type: 'general'
  },
  {
    path:'/movies/:id',
    component: Movie,
    isPrivate: false,
    type: 'general'
  },
  {
    path:'/dashboard',
    component: Dashboard,
    isPrivate: true,
    type: 'dashboard'
  },

  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    isPrivate: true,
    type: 'admin',
  },
  {
    path: '/admin/movies',
    component: ApprovedMovies,
    isPrivate: true,
    type: 'admin',
  },
  {
    path: '/admin/pending',
    component: PendingMovies,
    isPrivate: true,
    type: 'admin',
  },
  {
    path:'/admin/movies/:id',
    component: EditMovie,
    isPrivate: true,
    type: 'admin',
  },
  {
    path:'/admin/add',
    component: AdminAdd,
    isPrivate: true,
    type: 'admin',
  },
  {
    path:'/search-results',
    component: AdminSearchResults,
    isPrivate: true,
    type: 'admin',
  },
]
 
export default routes