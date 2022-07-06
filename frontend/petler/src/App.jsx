import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import VendorSignUp from "./pages/VendorSignUp"
import Login from "./pages/Login"
import User_Login from './pages/user_pages/User_Login'
import User_SignUp from './pages/user_pages/User_Signup'

function App() {

  return (
    <div className="App">
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="home" element={<Home />} />
            <Route path="/signup" element={<VendorSignUp />} />
            <Route path="/login" element={<Login />} />







{/* #########      User routes         #############*/}
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
