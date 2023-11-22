import { Route, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return (
      <>
        <Redirect to="/login"></Redirect>
      </>
    );
  }
};

export default PrivateRoutes;
