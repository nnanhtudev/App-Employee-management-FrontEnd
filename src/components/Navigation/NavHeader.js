/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import "./NavHeader.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";
const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogoutUser = async () => {
    let data = await logoutUser();
    localStorage.removeItem("jwt");
    logoutContext();
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        {/* <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Project</NavLink>
        </div> */}
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home">
                {/* <img src="/img/logo.svg" width="30" height="30" className="d-inline-block align-top" /> */}
                <span className="brand-name">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink className="nav-link" to="/" exact>
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                  <NavLink className="nav-link" to="/roles">
                    Roles
                  </NavLink>
                  <NavLink className="nav-link" to="/project">
                    Project
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">Welcome {user.account.username}!</Nav.Item>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <span onClick={() => handleLogoutUser()}>Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
