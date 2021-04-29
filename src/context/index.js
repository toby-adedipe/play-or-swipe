import {
  logIn, 
  logout, 
  fetchAllMovies, 
  getCurrentUser, 
  getMovie, 
  getPendingMovies,  
} from './actions';
import { AuthProvider, useAuthDispatch, useAuthState } from './context';
 
export { 
  AuthProvider, 
  useAuthState, 
  useAuthDispatch, 
  logIn, 
  logout,
  fetchAllMovies,
  getMovie,
  getCurrentUser,
  getPendingMovies,
};