import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Navbar
