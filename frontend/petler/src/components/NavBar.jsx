import React from 'react'
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from '../App';

function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  const userId = user?.data?.vendorId
  console.log("user", userId)
  
  return (
    <div className='navBar'>
     <span><h1 style={{display:"inline-block"}}>DEV Bar</h1></span> 
      <Link className='navBarText' to="/vendor/home">v-Home</Link>
      <Link className='navBarText' to="/vendor/signup">v-Signup</Link>
      <Link className='navBarText' to="/vendor/login">v-Login</Link>
      <Link className='navBarText' to={`/vendor/profile/${userId}`}>v-Profile</Link>
      <Link className='navBarText' to="/vendor/editprofile/:id">v-Edit</Link>
      <Link className='navBarText' to="/user/home">u-Home</Link>
      <Link className='navBarText' to="/user/signup">u-Signup</Link>
      <Link className='navBarText' to="/user/login">u-Login</Link>
      <Link className='navBarText' to="/user/profile/">u-Profile</Link>
    </div>
  )
}

export default Navbar
