import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav /> {/* Render the Nav component outside of the Switch */}
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/news"></Route>
          <Route path="/contact"></Route>
          <Route path="/about"></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
