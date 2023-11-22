/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Redirect, useLocation } from "react-router-dom/cjs/react-router-dom.min";
const Nav = (props) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Project</NavLink>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Nav;
