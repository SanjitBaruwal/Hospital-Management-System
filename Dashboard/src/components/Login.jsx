import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { Context } from "../main";
import { useEffect } from "react";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${import.meta.env.VITE_SERVER_API}/api/v1/user/login`,
          { email, password, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setIsAuthenticated(true);
          toast.success(res.data.message);
          console.log("authentication status: ", isAuthenticated);
          // navigateTo("/");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    console.log("authentication status after login: ", isAuthenticated);
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component">
        <img
          src="/Designer.png"
          alt="logo"
          style={{ height: "200px", width: "200px" }}
        />
        <h2 className="form-title">Welcome to MeroCare Health Service.</h2>
        <p>Only admins are allowed to access these resources.</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button type="submit" style={{ cursor: "pointer" }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
