import axios from "axios";
import { URL } from "../config/url";
import { ERROR, 
  GET_MOVIE_SUCCESS, 
  LOGIN_SUCCESS, 
  ON_SUCCESS, 
  REQUEST_CHANGE, 
  REQUEST_LOGIN, 
  REQUEST_MOVIE, 
  REQUEST_SIGNUP, 
  REQUEST_UPDATE_USER, 
  UPDATE_USER 
} from "./constants";
import { storage } from '../firebase';

export async function fetchTopMovies(dispatch, payload){
  try{
    let response = await axios.get(`${URL}/movies?status=approved&limit=10&page=${payload.page}&sort=rating`)
    return response.data;
  }catch(error){
    let data = error.response.data;
    return data;
  }
}

export async function fetchNigerian(dispatch, payload){
  try{
    let response = await axios.get(`${URL}/movies?page=${payload.page}&limit=10&status=approved&location=nigeria`)
    return response.data;
  }catch(error){
    let data = error.response.data;
    return data;
  }
}
export async function fetchPopular(dispatch, payload){
  try{
    let response = await axios.get(`${URL}/movies?page=${payload.page}&limit=10&status=approved&sort=ratingFrequency`)
    return response.data;
  }catch(error){
    let data = error.response.data;
    return data;
  }
}

export async function logIn(dispatch, loginPayload) {
  try{
    dispatch({ type: REQUEST_LOGIN });
    let response = await axios.post(`${URL}/auth/login`, loginPayload)
    let data = response.data;
    
    if(data.success){
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }

    dispatch({ type: ERROR, error: "Failed to Sign Up" });
    return;
  }catch(error){
    dispatch({ type: ERROR, error: error.response.data.error });
    return error;
  }
}

export async function signUp(dispatch, signupPayload){
  try{
    dispatch({ type: REQUEST_SIGNUP });
    let response = await axios.post(`${URL}/auth/register`, signupPayload)
    let data = response.data;
    
    if(data.success){
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
    dispatch({ type: ERROR, error: "Failed to Sign Up" });
    return data;
  }catch(error){
    dispatch({ type: ERROR, error: error.response.data.error });
  }
}

export async function updateUser(dispatch, payload){

  let config = {
    headers: {
      "Authorization": `Bearer ${payload.token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  }
  try{
    dispatch({ type: REQUEST_UPDATE_USER });

    let res = await axios.put(`${URL}/movies/${payload.movieId}`, {
      rating: payload.newRating,
      ratingFrequency: payload.ratingFrequency,
      cookieToken: payload.cookieToken,
    })
    if(payload.userId){
      await axios.put(`${URL}/users/${payload.userId}`, {
        movieId: payload.movieId,
        rating: payload.rating,
      }, config)
    }
    let data = res.data;
    if(data.success){
      dispatch({ type: UPDATE_USER })
      return data;
    }
  }catch(error){
    dispatch({ type: ERROR, error: error.response.data.error });
    let data = error.response.data;
    return data;
  }
}
export async function getAllMovies(){
  try{
    let res = await axios.get(`${URL}/movies`)
    let data = res.data;
    
    return data;
  }catch(error){
    let data = error.response.data;
    return data;
  }
}

export async function getPendingMovies(dispatch, payload){

  let config = {
    headers: {
      "Authorization": `Bearer ${payload.token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  }
  try{
    let res = await axios.get(`${URL}/admin/movies`, config)
    let data = res.data;
    
    return data;
  }catch(error){
    let data = error.response.data;
    return data;
  }
}

export async function getMovie(dispatch, payload){
  dispatch({ type: REQUEST_MOVIE })
  let config = {
    headers: {
      "Authorization": `Bearer ${payload.token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  }
  try{
    let res = await axios.get(`${URL}/movies/${payload.id}`, config)
    let data = res.data;
    
    if(data.success){
      dispatch({ type: GET_MOVIE_SUCCESS })
    }
    return data;
  }catch(error){
    let data = error.response.data;
    dispatch({ type: ERROR, error: error.response.data.error });
    return data;
  }
}

export async function getCurrentUser (dispatch, payload){
  let config = {
    headers: {
      "Authorization": `Bearer ${payload.token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  }
  try{
    const res = await axios.get(`${URL}/auth/me`, config);
    return res.data;
  }catch(error){
    //dispatch({ type: ERROR, error: error.response.data.error });
  }
}
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export async function addMovie(dispatch, payload){

  let config = {
    headers: {
      "Authorization": `Bearer ${payload.token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  }
  const isAdmin = payload.status === 'admin';

  try{
    if(payload.image.length>0){
      const image = payload.image[0];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error =>{
          console.log(error);
        },
        ()=>{
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(async(url) => {
              const postInfo = async()=>{
                const res = await axios.post(`${URL}/admin/movies`, {
                  title: payload.title,
                  year: payload.year,
                  genre: payload.genre,
                  synopsis: payload.synopsis,
                  location: payload.location,
                  img: url,
                  rating: payload.rating,
                  status: isAdmin?'approved':'pending',
                  ratingFrequency: payload.ratingFrequency,          
                },  config);
                console.log(res.data.data);
                return res.data.data
                // dispatch({type: ON_SUCCESS})
                // return res.data.data;
              }
              postInfo()
            })
        })
    }else{
      const res = await axios.put(`${URL}/admin/movies/${payload.id}`, {
        title: payload.title,
        year: payload.year,
        genre: payload.genre,
        synopsis: payload.synopsis,
        location: payload.location,
        rating: payload.rating,
        status: isAdmin?'approved':'pending',
        ratingFrequency: payload.ratingFrequency,
      },  config)
      dispatch({type: ON_SUCCESS})
      return res.data.data;
    }
  }catch(error){
    dispatch({ type: ERROR, error: error.response.data.error });
  }
}

export async function updateMovie(dispatch, payload){

  let config = {
    headers: {
      "Authorization": `Bearer ${payload.token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  }
  
  try{
    if(payload.image.length>0){
      const image = payload.image[0];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error =>{
          console.log(error);
        },
        ()=>{
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(async(url) => {
              const postInfo = async()=>{
                const res = await axios.put(`${URL}/admin/movies/${payload.id}`, {
                  title: payload.title,
                  year: payload.year,
                  genre: payload.genre,
                  synopsis: payload.synopsis,
                  location: payload.location,
                  img: url,
                  rating: payload.rating,
                  status: payload.status,
                  ratingFrequency: payload.ratingFrequency,          
                },  config);
                dispatch({type: ON_SUCCESS})
                return res.data.data;
              }
              postInfo();
            })
        })
    }else{
      const res = await axios.put(`${URL}/admin/movies/${payload.id}`, {
        title: payload.title,
        year: payload.year,
        genre: payload.genre,
        synopsis: payload.synopsis,
        location: payload.location,
        rating: payload.rating,
        status: payload.status,
        ratingFrequency: payload.ratingFrequency,
      },  config)
      dispatch({type: ON_SUCCESS})
      return res.data.data;
    }
  }catch(error){
    dispatch({ type: ERROR, error: error.response.data.error });
  }
}

export async function deleteMovie(dispatch, payload){
  dispatch({type: REQUEST_CHANGE});
  let config = {
    headers: {
      "Authorization": `Bearer ${payload.token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  }
  try{
    const res = await axios.delete(`${URL}/admin/movies/${payload.id}`, config)
    return res.data;
  }catch(error){
    console.log(error.response.data.error);
  }

}