import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/Navigation/Nav'
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Users from "./components/Auth/ManageUsers/Users";
import { useEffect, useState } from "react";
import _ from "lodash"
const App = () => {
  const [account , setAccount] = useState({})
  
  useEffect(() => {
    let session = sessionStorage.getItem('account')
    if(session){
      setAccount(JSON.parse(session))
    }
  },[]);

  return (
    <Router>
      <div className="app-container">
        {
          account && !_.isEmpty(account) && account.isAuthenticated 
          && <Nav/>
        }
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/news"></Route>
          <Route path="/contact"></Route>
          <Route path="/about"></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/users" component={Users}></Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
    </Router>
  );
}

export default App;
