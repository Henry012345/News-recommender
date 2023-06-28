import React from "react";
import { login } from "../utils";
import { useNavigate } from "react-router-dom";

import '../index.css'

const Login = () => {
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const payload = { email, password };
    const response = await login(payload);

    if (response.status === "SUCCESSFUL") {
      // Handle successful signup
      navigate("/homepage");
    }
    console.log(response.message);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-inner">
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input id="email" name="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input id="password" name="password" type="password" className="form-control" placeholder="Enter password" />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={handleLoginSubmit}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/Forgot password">Forgot password?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
