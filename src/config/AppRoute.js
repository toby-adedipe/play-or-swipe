import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../context";
import { getCurrentUser } from "../context/actions";
import { useLocation } from 'react-router-dom';

 
const AppRoute = ({ component: Component, path, isPrivate, type, ...rest }) => {
  const { token } = useAuthState();
  const dispatch = useAuthDispatch();
  const [status, setStatus] = useState(null);
  const location = useLocation();
  
  useEffect(()=>{
    let payload = {
      token,
    }
    const getMe = async()=>{
      try{
        let res = await getCurrentUser(dispatch, payload);
        if(res.success){
          setStatus(res.data.role);
        }
      }catch(error){
        setStatus('anon')
      }
    }
    getMe();
  }, [dispatch, token]);
  
  return (
    <Route
      path={path}
      render={props =>{
        if(isPrivate && !Boolean(token)){
          return <Redirect
            to={{ pathname: "/login" }}
          />
        }else if(type === 'auth' && Boolean(token)){
          return <Redirect
            to={{ pathname: '/dashboard' }}
          />
        }else if(status === 'user' && type === 'admin' ){
          return <Redirect
            to={{pathname: '/dashboard'}}
          />
        }else if(status === 'admin' && location.pathname === '/dashboard' ){
          return <Redirect
            to={{pathname: '/admin/dashboard'}}
          />
        }else if(status === 'admin' && type === 'admin'){
          return <Component {...props} />
        }else{
          return <Component {...props} />
        }
      }}
      {...rest}
    />
  )
}
 
export default AppRoute