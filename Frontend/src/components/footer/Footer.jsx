import { Link } from "react-router-dom";
import data from "./data";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <hr />
      <div className="container footer_section">
        {/* ============================================ */}
        <div className="logoSec">
          <div className="merocare"></div>
          <h4>MeroCare</h4>
        </div>
        {/* ============================================ */}

        {/* ============================================ */}
        <div className="opens">
          <h4>Hours</h4>
          <div className="day">
            {data.map((item) => (
              <li key={item.id}>
                <span>{item.day}</span>
                <span>{item.time}</span>
              </li>
            ))}
          </div>
        </div>
        {/* ============================================ */}

        {/* ============================================ */}
        <div className="opens">
          <h4>Contact</h4>
          <div>
            <FaPhone />
            <span>+977-9818823117</span>
          </div>
          <div>
            <MdEmail />
            <span>076bct076@ioepc.edu.np</span>
          </div>
          <div>
            <FaLocationArrow />
            <span>Dhading, Nepal</span>
          </div>
        </div>
        {/* ============================================ */}
      </div>
      {/* ============================================ */}
      <ul className="unorder">
        <Link to={"/"} className="Link" onClick={scrollToTop}>
          Home
        </Link>
        <Link to={"/appointment"} className="Link" onClick={scrollToTop}>
          Appointment
        </Link>
        <Link to={"/about"} className="Link" onClick={scrollToTop}>
          About
        </Link>
      </ul>
      {/* ============================================ */}
    </footer>
  );
};

export default Footer;
