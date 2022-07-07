import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function VendorSignUp() {


  const navigate = useNavigate();

  const handleSubmit = (event) => { 
    event.preventDefault();
    const signupData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,}
      // console.log(signupData)
    axios.post( "/api/vendors/signup", signupData)
      .then(res => console.log(res))
      .catch(error => console.log("error", error));
      navigate('/home')
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
            />
     <label htmlFor="password">password</label>
      <input
              required
              name="password"
              type="password"
              placeholder="password"
              />
      <label htmlFor="password2"> confirm password</label>
      <input
              required
              name="password2"
              type="password2"
              placeholder="confirm password"
              />
      <button>submit</button>
      </form>
    </div>
  )
}

export default VendorSignUp