import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/patient/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleLogin = () => {
    navigateTo("/login");
  };
  return (
    <nav className="container">
      {/* ===================================================== */}
      <div className="logoSec">
        <div className="merocare"></div>
        <h4>MeroCare</h4>
      </div>
      {/* ===================================================== */}

      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>HOME</Link>
          <Link to={"/appointment"}>APPOINTMENT</Link>
          <Link to={"/about"}>ABOUT US</Link>
        </div>
        {isAuthenticated ? (
          <button
            className="logoutBtn btn"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            LOGOUT
          </button>
        ) : (
          <button
            className="loginBtn btn"
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
          >
            LOGIN
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
