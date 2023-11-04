import React, { useEffect } from "react";
import "../index.scss";
import Auth from "../index";
import axios from "axios";

const Register = () => {
  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=2").then((data) => {
      console.log(">> Check Data", data);
    });
  }, []);
  return (
    <Auth>
      <div className="forms-container">
        <div className="signin-signup">
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
              <i className="fas fa-phone"></i>
              <input type="text" placeholder="Phone" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className="input-field">
              <i className="fas fa-unlock-alt"></i>
              <input type="password" placeholder="Re-Enter Password" />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
            <p className="social-text">Or Register with social platforms</p>
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
        </div>
      </div>
    </Auth>
  );
};

export default Register;
