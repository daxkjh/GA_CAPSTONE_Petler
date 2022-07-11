import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { atom,useAtom } from 'jotai';
import { useState } from 'react';
import { refreshAtom } from '../../App'


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
    axios.post( "/api/user/login", loginData)
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
      .catch(error => console.log("error", error));
  }

  return (
<div>
     <form onSubmit={handleSubmit} >
      <label htmlFor="email">email</label>
      <input
              required
              name="email"
              type="email"
              placeholder="email"
              onChange={() => {setInvalid(false)}}
            />
     <label htmlFor="password">Password</label>
      <input
              required
              name="password"
              type="password"
              placeholder="password"
              onChange={() => {setInvalid(false)}}
              />
      <button>Login!</button>
      </form>
      {invalid ? <p>Incorrect email or Password</p>: null }
    </div>
  )
}

export default User_Login
