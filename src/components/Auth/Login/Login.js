/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Auth from "../index";
import "../index.scss";
import { loginUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
const Login = (props) => {
  const { loginContext } = useContext(UserContext);
  let history = useHistory();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultValueInput = {
    isValidValueLogin: true,
    isValidValuePassword: true,
  };
  const [objectValidInput, setObjectValidInput] = useState(defaultValueInput);
  const handleLogin = async (e) => {
    e.preventDefault();
    setObjectValidInput(defaultValueInput);
    if (!valueLogin) {
      setObjectValidInput({ ...defaultValueInput, isValidValueLogin: false });
      toast.error("Please enter a your email address or phone number");
      return;
    }
    if (!password) {
      setObjectValidInput({ ...defaultValueInput, isValidValuePassword: false });
      toast.error("Please enter your password");
      return;
    }
    let response = await loginUser(valueLogin, password);
    if (response && +response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
      };
      localStorage.setItem("jwt", token);
      loginContext(data);
      toast.success("Successfully logged in");
      history.push("/users");
      // window.location.reload()
      //successfully logged in
    }
    if (response && +response.EC !== 0) {
      toast.error(response.EM);
    }
  };
  return (
    <Auth>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Login</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email Address or Phone"
                className={objectValidInput.isValidValueLogin ? "form-control" : "is-invalid form-control"}
                value={valueLogin}
                onChange={(event) => setValueLogin(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                className={objectValidInput.isValidValuePassword ? "form-control" : "is-invalid form-control"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="btn solid btn-primary" onClick={(e) => handleLogin(e)}>
              Login
            </button>
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
        </div>
      </div>
    </Auth>
  );
};

export default Login;
