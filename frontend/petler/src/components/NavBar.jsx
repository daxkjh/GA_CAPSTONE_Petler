import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/vendor/home">Home</Link>
      <Link to="/vendor/signup">Sign up</Link>
      <Link to="/vendor/login">Login</Link>
      <Link to="/vendor/profile/:id">Profile</Link>
    </div>
  )
}

export default Navbar
