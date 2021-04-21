import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthDispatch, useAuthState } from "../../context";
import { signUp } from "../../context/actions";
import { withRouter } from "react-router";

import "./signup.css";
import Header from "../../components/Header";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

const SignUpComp = ({history}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAuthDispatch()

  const { loading, errorMessage } = useAuthState();

  const onSubmit = async(data) => {
    let payload = data;
    try {
      let res = await signUp(dispatch, payload);

      if (!res.success) return
      history.push('/dashboard')
    }catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Header />
      <div className="signup-page">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign Up</h3>
          <div className="">
            <p className="error">
              {
                errorMessage === "Duplicate field value entered"
                ? "This email has been used already"
                :errorMessage
                }</p>
            <div className="form-group">
              <label>Full Name {errors.fullName && <span className="error-message">Please add your fullname.</span>}</label>
              <input 
                type="text" 
                name="fullName"
                className="title-input"
                {...register('fullName', { required: true })}
              />
            </div>
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
          <div className="login-container">
            <input type="submit" className="submit-btn" value={!loading? "Sign Up": "Signing you up"} disabled={loading}/>
            <Loader 
              type="TailSpin"
              color="#EC1F41"
              height={20}
              width={20}
              visible={loading}
            />
          </div>
          <div className="alt-option-container">
            <p>Already have an account?</p>
            <Link to="/login" className="alt-option">Sign In</Link>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};
const SignUp = withRouter(SignUpComp)
export default SignUp;