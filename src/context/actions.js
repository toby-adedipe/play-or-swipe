import axios from "axios";
import { ERROR, LOGIN_SUCCESS, REQUEST_LOGIN, REQUEST_SIGNUP } from "./constants";

//const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';
const SERVER = 'http://localhost:5000';

export async function logIn(dispatch, loginPayload) {

  try{
    dispatch({ type: REQUEST_LOGIN });
    let response = await axios.post(`${SERVER}/api/v1/auth/login`, loginPayload)
    let data = response.data;
    
    if(data.success){
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }

    dispatch({ type: ERROR, error: "Failed to Sign Up" });
    return;
  }catch(error){
    dispatch({ type: ERROR, error: error });
  }
}

export async function signUp(dispatch, signupPayload){
  try{
    dispatch({ type: REQUEST_SIGNUP });
    let response = await axios.post(`${SERVER}/api/v1/auth/register`, signupPayload)
    let data = response.data;
    
    if(data.success){
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }

    dispatch({ type: ERROR, error: "Failed to Sign Up" });
    return;
  }catch(error){
    dispatch({ type: ERROR, error: error });
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}