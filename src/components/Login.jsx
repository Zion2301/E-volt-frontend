import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3020/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
  
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully signed up!",
      }).then(() => {
        if (formData.email === "admin@gmail.com" && formData.password === "admin") {
          navigate("/dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/user"); // Redirect to user dashboard
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };
  return (
    <>
         <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input type="email" placeholder="Enter email" required onChange={handleChange} name='email'/>
          <span>
          </span>
        </div>
        <div className="input-container">
          <input type="password" placeholder="Enter password" required onChange={handleChange} name='password'/>
        </div>
        <button type="submit" className="submit">
          Sign in
        </button>
        <p className="signup-link">
          No account?
          <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  .form {
    background-color: #fff;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
     margin-left: 550px;
    margin-top: 100px
  }

  .form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
  }

  .input-container {
    position: relative;
  }

  .input-container input, .form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
  }

  .input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .submit {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #4F46E5;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
  }

  .signup-link {
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  .signup-link a {
    text-decoration: underline;
  }`;

export default Login