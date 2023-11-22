import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
import { useLocation } from "react-router-dom";
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const location = window.location.pathname;
  const defaultUser = { isLoading: true, isAuthenticated: false, token: "", account: {} };
  const [user, setUser] = useState(defaultUser);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...defaultUser, isLoading: false });
    }
  };
  useEffect(() => {
    if (location !== "/" || location !== "/login") {
      fetchUser();
    }
  }, []);

  return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
