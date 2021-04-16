import axios from "axios";
import { URL } from "../config/url";
import { ERROR, LOGIN_SUCCESS, REQUEST_LOGIN, REQUEST_SIGNUP } from "./constants";

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
    dispatch({ type: ERROR, error: error });
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