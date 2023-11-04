import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./index.scss";

const Auth = ({ children }) => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Set the isSignUpMode based on the current location
    if (location.pathname === "/register") {
      setSignUpMode(true);
    } else if (location.pathname === "/login") {
      setSignUpMode(false);
    }
  }, [location.pathname]);

  const handleSignUpClick = () => {
    history.push("/register");
    setSignUpMode(true);
  };

  const handleSignInClick = async () => {
    setSignUpMode(false);
    history.push("/login");
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
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
      <div className="forms-container">{children}</div>
    </div>
  );
};

export default Auth;
