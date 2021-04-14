import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthDispatch } from "../../context";
import { signUp } from "../../context/actions";
import { withRouter } from "react-router";

import "./signup.css";

const SignUpComp = ({history}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAuthDispatch()

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
    <div className="signup-page">
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign Up</h3>
        <div className="">
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
        <input type="submit" className="submit-btn"/>
      </form>
      </div>
    </div>
  );
};
const SignUp = withRouter(SignUpComp)
export default SignUp;