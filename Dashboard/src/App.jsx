import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddAdmin from "./components/AddAdmin";
import AddDoctor from "./components/AddDoctor";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Doctors from "./components/Doctors";
import Messages from "./components/Messages";
import "./App.css";

// =====================================================================
import { useContext, useEffect } from "react";
import { Context } from "./main";
// =====================================================================
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// =====================================================================
// =============================check whether admin is registered or not========================================

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
  console.log("sidebar auth:", isAuthenticated);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/user/admin/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  {
    console.log("admin:", admin);
  }
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/addnew" element={<AddAdmin />} />
          <Route path="/doctor/addnew" element={<AddDoctor />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
