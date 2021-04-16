import { useState } from "react";
import { useForm } from "react-hook-form";
import { logIn } from "../../context";
import "./login.css";
import { useAuthDispatch } from "../../context";
import { withRouter } from "react-router";

const LoginComp = ({history}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAuthDispatch()

  const onSubmit = async(data) => {
    let payload = data;
    try {
      let res = await logIn(dispatch, payload);

      if (!res.success) return
      history.push('/dashboard')
    }catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="signup-page">
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Log In</h3>
        <div className="">
          <div className="form-group">
            <label>Email {errors.email && <span className="error-message">Please add an email.</span>}</label>
            <input 
              type="text" 
              name="email"
              className="year-input"
              {...register('email', { required: true })}
            />
          </div>
          <div className="form-group">
            <div className="password-label">
              <label>Password {errors.password && <span className="error-message">Dont forget to add your password.</span>}</label>
              <p onClick={()=>setShowPassword(!showPassword)}>{showPassword ? "Hide Password" : "Show Password"}</p>
            </div>
            <input 
              name="password"
              className="year-input"
              type={showPassword ? "text" : "password"}
              {...register('password', { required: true })}
            />
          </div>
        </div>
        <input type="submit" className="submit-btn" value="Log In"/>
      </form>
      </div>
    </div>
  );
};

const Login = withRouter(LoginComp)
export default Login;