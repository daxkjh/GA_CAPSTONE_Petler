import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='navBar'>
      <Link className='navBarText' to="/vendor/home">Home</Link>
      <Link className='navBarText' to="/vendor/signup">Sign up</Link>
      <Link className='navBarText' to="/vendor/login">Login</Link>
      <Link className='navBarText' to="/vendor/profile/:id">Profile</Link>
      <Link className='navBarText' to="/vendor/editprofile/:id">Edit</Link>
    </div>
  )
}

export default Navbar
