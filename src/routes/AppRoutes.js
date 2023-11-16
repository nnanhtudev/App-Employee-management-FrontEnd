import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/project">project</Route>
        <Route exact path="/">
          Home
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  )
}

export default AppRoutes;