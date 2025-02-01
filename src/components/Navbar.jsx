import "./Navbar.css"
import logo from "../assets/logo.avif"
import { IoPersonOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
const Navbar = () => {
  return (
   <>
      <nav className="main">
        <img src={logo} alt="" className="logo" />

        

        <div className="sec-nav">
            <a href="#" className="link"> Collections</a>
            <a href="#" className="link">Guide</a>
            <a href="#" className="link">Contact</a>
        </div>

        <div className="sec-nav">
            <a href="#" className="link"><IoPersonOutline/> Account</a>
            <a href="#" className="link"><IoMdHelpCircleOutline/> Help</a>
            <a href="#" className="link"><FiShoppingCart/> Cart</a>
        </div>
      </nav>
   </>
  )
}

export default Navbar