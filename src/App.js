import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/news"></Route>
          <Route path="/contact"></Route>
          <Route path="/about"></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
    </Router>
  );
}

export default App;
