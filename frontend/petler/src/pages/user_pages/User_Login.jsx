import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { atom,useAtom } from 'jotai';
import { useState } from 'react';
import { refreshAtom } from '../../App'

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function User_Login() {
//   const [user, setUser] = useAtom(userAtom);
  const [invalid, setInvalid ] = useState(false)
  const [refresh, setRefresh] = useAtom(refreshAtom)
  
const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {
    email: event.target.elements.email.value,
    password: event.target.elements.password.value} 
    console.log(loginData)
    axios.post( `${API_URL}/api/user/login`, loginData)
      .then((response)=> 
      {const token = response.data.accessToken;
        localStorage.setItem("token", token);
        // console.log(token)
        if (token) {
          console.log(response)
        //  setUser(response.data);
        setRefresh(!refresh);
          navigate("/home");}
        else {
          setInvalid(true);
          console.log(response.data);}
      })
      .catch(error => { alert("Invalid Login Credentials")
        console.log("error", error)});

  }

  return (
<div className='form-u'>
<h2 className="login-title" >Log In</h2>
     <form onSubmit={handleSubmit} >
        <div className="username">
            <input
              className='login-input'
              required
              name="email"
              type="email"
              placeholder="email"
              onChange={() => {setInvalid(false)}}
            />
            </div>
      <div className="password">
      <input  className='login-input'
              required
              name="password"
              type="password"
              placeholder="password"
              onChange={() => {setInvalid(false)}}
              />
      </div>
      <div className="login">
      <button className='loginButton'>log in!</button>
      </div>
      </form>
      {invalid ? <p>Incorrect email or Password</p>: null }
      
    </div>
  )
}

export default User_Login
