import Auth from "../index";
import "../index.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { registerNewUser } from "../../../services/userService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUseName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  }
  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);
  let history = useHistory()

  useEffect(() => {
    // axios.post("http://localhost:8081/api/v1/register").then(() => {
    //   console.log(">> Check Data");
    // });

  }, []);
  const isValidInput = () => {
    setObjectCheckInput(defaultValidInput)
    if (!email) {
      toast.error("Email is required");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Invalid email address");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
      return false;
    }
    if (!phone) {
      toast.error("Phone is required");
      setObjectCheckInput({ ...defaultValidInput, isValidPhone: false })
      return false;
    }
    if (!phone.length >= 9) {
      toast.error("Invalid phone number");
      setObjectCheckInput({ ...defaultValidInput, isValidPhone: false })
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      setObjectCheckInput({ ...defaultValidInput, isValidPassword: false })
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setObjectCheckInput({ ...defaultValidInput, isValidPassword: false })
      return false;
    }
    return true
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    let checkValid = isValidInput();
    if (checkValid === true) {
      let response = await registerNewUser(email, phone, username, password)
      let serverData = response;
      if (+serverData.EC === 0) {
        toast.success("Account created successfully. Please Logged in!");
        history.push("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  }
  return (
    <Auth>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-up-form">
            <h2 className="title">Register</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input className=
                {objectCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                type="text" placeholder="Email Address"
                value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input className={objectCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                type="text" placeholder="Phone Number"
                value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input className="form-control"
                type="text" placeholder="Username"
                value={username} onChange={(event) => setUseName(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input className={objectCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                type="password" placeholder="Password"
                value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-unlock-alt"></i>
              <input className={objectCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                type="password" placeholder="Re-Enter Password"
                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleRegister(e)} >Register</button>
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
