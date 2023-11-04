import React, { useState } from "react";
import "./Login.scss";
function Login() {
  const [isSignUpMode, setSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Login</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid btn-primary" />
            <p className="social-text">Or Login with social platforms</p>
            <div className="social-media">
              <a href="/" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="/" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Register</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
            <p className="social-text">Or Register with social platforms</p>
            <div className="social-media">
              <a href="/" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="social-icon" aria-hidden="true">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="/" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <p>
              Register is the section where you can create a new account. If you don't have an account yet, you can
              register here to access our platform's features and services. Please provide your desired username, email
              address, and password to complete the registration process and become a part of our community.
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Register
            </button>
          </div>
          <img src="/images/register.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <p>
              Login is the section that allows you to log into your account. Please enter your username and password to
              access our features and services. If you already have an account, please enter your information below to
              proceed.
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Login
            </button>
          </div>
          <img src="/images/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
