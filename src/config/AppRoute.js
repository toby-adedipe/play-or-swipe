import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context";
 
 
const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const user = useAuthState();

  return (
    <Route
      path={path}
      render={props =>
        isPrivate && !Boolean(user.token) ? (
          <Redirect
            to={{ pathname: "/login" }}
          />
        ):(
            <Component {...props} />
          )
      }
      {...rest}
    />
  )
}
 
export default AppRoute