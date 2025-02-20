import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3020/api/auth/signup", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
  
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
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
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };
  
  return (
    <>
     <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input required type="text" className="input" onChange={handleChange} name="name"/>
            <span>FullName</span>
          </label>
        </div>  
        <label>
          <input required  type="email" className="input" name='email' onChange={handleChange}/>
          <span>Email</span>
        </label> 
        <label>
          <input required  type="password" className="input" name='password' onChange={handleChange}/>
          <span>Password</span>
        </label>
        <button className="submit" type='submit'>Submit</button>
        <p className="signin">Already have an acount ? <Link to="/login">Sign In</Link> </p>
      </form>
    </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    border: 1px solid grey;
    margin-left: 550px;
    margin-top: 100px
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message, .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,.form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default Signup