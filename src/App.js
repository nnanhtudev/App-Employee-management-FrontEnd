import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import Nav from './components/Navigation/Nav'
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [account , setAccount] = useState({})
  
  useEffect(() => {
    let session = sessionStorage.getItem('account')
    if(session){
      setAccount(JSON.parse(session))
    }
  },[]);

  return (
    <>
    <Router>
      <div className="header-container">
        <Nav/>
      </div>
      <div className="app-container">
        <AppRoutes/>
      </div>
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
}

export default App;
