import {
  logIn, 
  logout, 
  getAllMovies, 
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
  getAllMovies,
  getMovie,
  getCurrentUser,
  getPendingMovies,
};