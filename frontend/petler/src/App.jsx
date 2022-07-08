import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import VendorSignUp from "./pages/vendor_pages/VendorSignUp"
import VendorLogin from "./pages//vendor_pages/VendorLogin"
import User_Login from './pages/user_pages/User_Login'
import User_SignUp from './pages/user_pages/User_Signup'
import User_Profile from "./pages/user_pages/User_Profile"
import { atom } from 'jotai'
import VendorProfile from './pages/vendor_pages/VendorProfile'

export const vendorAtom = atom({})


function App() {

  return (
    <div className="App">
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/vendor/home" element={<Home />} />
            <Route path="/vendor/signup" element={<VendorSignUp />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/profile/:id" element={<VendorProfile />} />





{/* #########      User routes         #############*/}
            <Route path="/owner/profile" element={<User_Profile/>}/>
            <Route path="/owner/signup" element={<User_SignUp/>}/>
            <Route path="/owner/login" element={<User_Login/>}/>
            {/* <Route path="/owner/all"  */}
            


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
