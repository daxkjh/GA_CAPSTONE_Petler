import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import './App.css'
import { useState, useEffect } from 'react'
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import VendorSignUp from "./pages/vendor_pages/VendorSignUp"
import VendorLogin from "./pages//vendor_pages/VendorLogin"
import User_Login from './pages/user_pages/User_Login'
import User_SignUp from './pages/user_pages/User_Signup'
import User_Profile from "./pages/user_pages/User_Profile"
import { atom, useAtom, Provider } from 'jotai'
import VendorProfile from './pages/vendor_pages/VendorProfile'
import VendorProfileCreation from './pages/vendor_pages/VendorProfileCreation'
import User_Home from './pages/user_pages/User_Home'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const SECRET_KEY = import.meta.env.SECRET
// const SECRET = process.env.SECRET


// import { loginAtom } from './pages/user_pages/User_Login'

export const vendorAtom = atom({})
export const userAtom = atom({})
export const refreshAtom = atom(false)

function App() {
  const navigate = useNavigate()
const [user, setUser] = useAtom(userAtom)
const [refresh, setRefresh] = useAtom(refreshAtom)

useEffect(()=>{
  const token = localStorage.getItem("token")
if(token){
  const decodedToken = jwtDecode(token)
  const current_time = Date.now() / 1000
  // console.log("decoded TOKEN",decodedToken)
  if (decodedToken.exp<current_time) {
      console.log("expired")
   alert("Your Token has expired")
   if(decodedToken.role ==="user"){
    navigate("/user/login")
     } else { navigate("/vendor/login") }
  } 
  else {
axios
.get(`/api/${decodedToken.role}/profile/${decodedToken.id}`, {
  headers: { Authorization: token },
})
.then((res) => setUser(res.data))
.catch((error) => console.log("error", error));
}}
},[refresh])

// advantage

  return (
    <div className="App">
           
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/home" element={<Home />} />
            <Route path="/vendor/signup" element={<VendorSignUp />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/profile/:id" element={<VendorProfile />} />
            <Route path="/vendor/editprofile/:id" element={<VendorProfileCreation />} />



{/* #########      User routes         #############*/}
            <Route path="/user/profile" element={<User_Profile/>}/>
            <Route path="/user/signup" element={<User_SignUp/>}/>
            <Route path="/user/login" element={<User_Login/>}/>
            {/* <Route path="/owner/all"  */}
            
{/**#########       Guest Home Page         ############# */}

          </Route>
        </Routes>
      
    </div>
  )
}

// export default ()=>(<Provider><App/></Provider>)
export default App
