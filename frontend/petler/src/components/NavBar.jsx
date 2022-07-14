import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from '../App';
import jwtDecode from 'jwt-decode';

function Navbar() {
  const [user,setUser] = useAtom(userAtom)
  const navigate = useNavigate()
  const handleLogout =()=>{
    navigate("/home")
    alert("Logging Out")
    localStorage.clear()
    window.location.reload()
  }

  // const decodedToken = jwtDecode(localStorage.getItem("token"))
  const vId = user?.vendorId
  const uId = user?.userId

  
  
  return (
    <div className='navBar'>
      <Link className= "logo" to="/home"><img src="https://i.imgur.com/QwI6oUK.png" /> </Link>
      <Link className='navBarText' to="/vendor/login">Join us as vendor</Link>
      {/* <Link className='navBarText' to={`/vendor/manageprofile/`}>v-Profile</Link> */}
      {/* <Link className='navBarText' to={`/vendor/profile/:id`}>U-BrowseVendorDetails</Link> */}
    {/* <Link className='navBarText' to={`/vendor/editprofile/${vId}`}>v-Edit</Link> */}
      <Link className='navBarText' to="/user/signup">Signup</Link><Link className='navBarText' to="/user/login">Login</Link>
      {/* <Link className='navBarText' to={`/user/profile/${uId}`}>u-Profile</Link> */}
      {(localStorage.getItem("token"))&& <p onClick={handleLogout}>LogOut</p>}
      {/* <p onClick={handleLogout}>LogOut</p> */}
      {/* <span style={{fontWeight:"bold"}}>
        {(localStorage.getItem("token"))? user?.name :"Not Login"}
      </span> */}
      
    </div>
  )
}

export default Navbar
