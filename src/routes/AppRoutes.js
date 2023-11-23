import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Roles";
const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/project">Project</PrivateRoutes>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/">
          Home
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
