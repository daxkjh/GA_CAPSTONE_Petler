import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { useState, useEffect } from 'react'
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import VendorSignUp from "./pages/vendor_pages/VendorSignUp"
import VendorLogin from "./pages//vendor_pages/VendorLogin"
import User_Login, { loginAtom } from './pages/user_pages/User_Login'
import User_SignUp from './pages/user_pages/User_Signup'
import User_Profile from "./pages/user_pages/User_Profile"
import { atom, useAtom, Provider } from 'jotai'
import VendorProfile from './pages/vendor_pages/VendorProfile'
import VendorProfileCreation from './pages/vendor_pages/VendorProfileCreation'
import User_Home from './pages/user_pages/User_Home'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
// import { loginAtom } from './pages/user_pages/User_Login'

export const vendorAtom = atom({})
export const userAtom = atom({})

function App() {
const [user, setUser] = useAtom(userAtom)
const [test, setTest] = useAtom(loginAtom)

useEffect(()=>{
if(localStorage.getItem("token")){
    console.log("app-side user",user)
axios
.get(`/api/user/profile/${jwtDecode(localStorage.getItem("token")).id}`, {
  headers: { Authorization: localStorage.getItem("token") },
})
.then((res) => {
  console.log("RES",res)
setUser(res.data)})
.catch((error) => console.log("error", error));
}
},[test])



  return (
    <div className="App">
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/vendor/home" element={<Home />} />
            <Route path="/vendor/signup" element={<VendorSignUp />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/profile/:id" element={<VendorProfile />} />
            <Route path="/vendor/editprofile/:id" element={<VendorProfileCreation />} />



{/* #########      User routes         #############*/}
            <Route path="/user/profile" element={<User_Profile/>}/>
            <Route path="/user/signup" element={<User_SignUp/>}/>
            <Route path="/user/login" element={<User_Login/>}/>
            <Route path="/user/home" element={<User_Home/>}/>
            {/* <Route path="/owner/all"  */}
            
{/**#########       Guest Home Page         ############# */}

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// export default ()=>(<Provider><App/></Provider>)
export default App
