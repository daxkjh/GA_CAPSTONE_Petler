import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='navBar'>
      <Link className='navBarText' to="/vendor/home">v-Home</Link>
      <Link className='navBarText' to="/vendor/signup">v-Signup</Link>
      <Link className='navBarText' to="/vendor/login">v-Login</Link>
      <Link className='navBarText' to="/vendor/profile/:id">v-Profile</Link>
      <Link className='navBarText' to="/user/profile">v-Edit</Link>
      <Link className='navBarText' to="/user/home">u-Home</Link>
      <Link className='navBarText' to="/user/profile/singup">u-Signup</Link>
      <Link className='navBarText' to="/user/login">u-Login</Link>
      <Link className='navBarText' to="/vendor/editprofile/:id">u-Profile</Link>
    </div>
  )
}

export default Navbar
