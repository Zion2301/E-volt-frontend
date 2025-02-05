import "./Navbar.css"
import logo from "../assets/droneshi-removebg-preview.png"
import { useState } from "react";
// import { IoPersonOutline } from "react-icons/io5";
// import { IoMdHelpCircleOutline } from "react-icons/io";
// import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
   <>
      <nav className="main">
       <Link className="logo-shi"><img src={logo} alt="" className="logo"/><span className="text"> SquaDrone </span></Link>

        <div className="sec-nav">
            <Link to="/" className="link">Home</Link>
            <Link className="link">About us</Link>
            <Link to="/service" className="link">Services</Link>
            <Link to="/dashboard" className="link">Dashboard</Link>
            <Link className="link">Contact</Link>
            <div className="special"><button className="special-link" onClick={toggleDropdown}>Account</button>
            {isOpen && (
        <div className="option-shi">
          <Link to="/login" className="link">Login</Link>
          <Link to="/register" className="link">Register</Link>
        </div>
      )}
            </div>
        </div>
      </nav>
   </>
  )
}

export default Navbar