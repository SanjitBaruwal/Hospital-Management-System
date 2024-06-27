import { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { HiOutlineLogout } from "react-icons/hi";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctor = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddnewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddnewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_API}/api/v1/user/admin/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigateTo("/login");
        setShow(!show);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHome} />
          <AiFillMessage onClick={gotoMessage} />
          <FaUserDoctor onClick={gotoDoctor} />
          <MdAddModerator onClick={gotoAddnewAdmin} />
          <IoPersonAddSharp onClick={gotoAddnewDoctor} />
          <HiOutlineLogout onClick={handleLogout} />
        </div>
      </nav>
      <div
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="wrapper"
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
