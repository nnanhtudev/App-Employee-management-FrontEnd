import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Nav from "./components/Navigation/Nav";
// import Auth from "./components/Auth/index";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";

function App() {
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
    </Router>
  );
}

export default App;
