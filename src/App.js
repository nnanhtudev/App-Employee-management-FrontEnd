import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import Nav from "./components/Navigation/Nav";
import AppRoutes from "./routes/AppRoutes";
import { InfinitySpin } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import "./App.scss";
const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <>
            <div className="loading-container">
              <InfinitySpin width="200" color="#4fa94d" />
              <div>Loading data ...</div>
            </div>
          </>
        ) : (
          <>
            <div className="header-container">
              <Nav />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}

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
    </>
  );
};

export default App;
