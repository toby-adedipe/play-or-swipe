import { 
  ERROR, 
  LOGIN_SUCCESS, 
  LOGOUT, 
  REQUEST_LOGIN, 
  REQUEST_SIGNUP, 
  SIGNUP_SUCCESS, 
  REQUEST_UPDATE_USER, 
  UPDATE_USER, 
  REQUEST_MOVIE, 
  GET_MOVIE_SUCCESS, 
  ON_SUCCESS, 
  REQUEST_CHANGE 
} from "./constants";

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";
let userId = localStorage.getItem("currentUser")
? JSON.parse(localStorage.getItem("currentUser")).userId
: "";
export const initialState = {
  user: "" || user,
  userId: "" || userId,
  token: "" || token,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return {
        ...initialState,
        loading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...initialState,
        user: action.payload.user,
        userId: action.payload.userId,
        token: action.payload.token,
        loading: false
      };
    case REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        user: action.payload.user,
        userId: action.payload.userId,
        token: action.payload.token,
        loading: false
      };
    case REQUEST_UPDATE_USER:
      return {
        ...initialState,
        loading: true
    }
    case UPDATE_USER:
      return{
        ...initialState,
        loading: false
      }
    case REQUEST_MOVIE:
      return {
        ...initialState,
        loading: true
      }
    case GET_MOVIE_SUCCESS:
      return{
        ...initialState,
        loading: false
      }
    case LOGOUT:
      return {
        ...initialState,
        user: "",
        token: ""
      };
      case REQUEST_CHANGE:
        return {
          ...initialState,
          loading: true
        }
      case ON_SUCCESS:
        return{
          ...initialState,
          loading: false
        }
    case ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
    
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};