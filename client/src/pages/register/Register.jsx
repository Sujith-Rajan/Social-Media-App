import React from 'react'
import axios from 'axios';
import '../register/Register.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function Register() {
const username = useRef(null);
const email = useRef(null);
const password = useRef(null);
const confirmPassword = useRef(null)
const navigate = useNavigate();

const handleClick =async (e) =>{
  e.preventDefault();
  if (confirmPassword.current.value !== password.current.value) {
    confirmPassword.current.setCustomValidity("Passwords don't match!");
  } else {
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
       const response=await axios.post("/api/auth/register", user);
      navigate("/login");
      console.log("registration success ",response.data)
    } catch (err) {
      console.log("registration fail",err);
    }
  }

}


  return (
    <div className="containerB">
      <div className="login flex">
        <div className="loginWrapper flex">
          <div className="loginLeft">
            <h3 className="loginLogo">ChatNext</h3>
            <span className="loginDesc">Connect with friends and the world around you on ChatNext.</span>
          </div>
          <div className="loginRight">
            <form className="loginBox"  method="post" onSubmit={handleClick}>
              <label htmlFor="username">Username</label>
              <input required className="loginInput" type="text" ref={username} />
              <label htmlFor="email">Email</label>
              <input required className="loginInput" type="email" ref={email} />
              <label htmlFor="password">Password</label>
              <input required className="loginInput" type="password" minLength="6" ref={password}  />
              <label htmlFor="confirmPassword">Password Again</label>
              <input required className="loginInput" type="password" ref={confirmPassword} />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
            </form>
            <Link to="/login">Log into Account</Link> {/* Use "to" prop to specify the link target */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

