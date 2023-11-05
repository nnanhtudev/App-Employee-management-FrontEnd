import Auth from "../index";
import "../index.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUseName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // axios.get("http://localhost:8081/api/test").then((data) => {
    //   console.log(">> Check Data", data);
    // });
  }, []);
  const isValid = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!phone) {
      toast.error("Phone is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Invalid email address");
      return false;
    }
    return true
  }
  const handleRegister = () => {
    let checkValid = isValid();
    let userData = { email, phone, username, password, confirmPassword }
    console.log(">>check user data", userData);
  }
  return (
    <Auth>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-up-form">
            <h2 className="title">Register</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email Address" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input type="text" placeholder="Phone Number" value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={username} onChange={(event) => setUseName(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-unlock-alt"></i>
              <input type="password" placeholder="Re-Enter Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => handleRegister()} >Register</button>
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
