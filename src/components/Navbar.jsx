import "./Navbar.css";
import logo from "../assets/droneshi-removebg-preview.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    setIsLoggedIn(!!token);
    setIsAdmin(email === "admin@gmail.com");
  }, [localStorage.getItem("token"), localStorage.getItem("email")]); // Listen for changes

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/login");

        Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
      }
    });
  };

  const name = localStorage.getItem("name"); // Get user name from localStorage
  const dashboardRoute = name === "Admin" ? "/dashboard" : "/user"; // Determine the dashboard route

  return (
    <nav className="main">
      <Link className="logo-shi">
        <img src={logo} alt="Logo" className="logo" />
        <span className="text">SquaDrone</span>
      </Link>

      <div className="sec-nav">
        <Link to="/" className="link">Home</Link>
        <Link className="link">About us</Link>
        <Link to="/service" className="link">Services</Link>
        <Link className="link">Contact</Link>

        {isLoggedIn ? (
          <>
            <Link to={dashboardRoute} className="link">Dashboard</Link>
            <button onClick={handleLogout} className="logout">Logout</button>
          </>
        ) : (
          <div className="special">
            <button className="special-link" onClick={toggleDropdown}>Account</button>
            {isOpen && (
              <div className="option-shi">
                <Link to="/login" className="link" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="link" onClick={() => setIsOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
