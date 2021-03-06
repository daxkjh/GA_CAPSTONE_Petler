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
import VendorProfileManage from './pages/vendor_pages/VendorProfileManage'
import VendorProfileCreation from './components/edit_vendor/EditVendorBusiness'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import VendorProfileShow from "./pages/user_pages/User_BrowseVendorDetails"


const SECRET_KEY = import.meta.env.SECRET
// const SECRET = process.env.SECRET
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

// import { loginAtom } from './pages/user_pages/User_Login'


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
   if(decodedToken.role === "user"){
    navigate("/user/login")
     } else { navigate("/vendor/login") }
     localStorage.clear()
     window.location.reload()
  } 
  else {
axios
.get(`${API_URL}/api/${decodedToken?.role}/profile/${decodedToken?.id}`, {
  headers: { 'Authorization' : `Bearer ${localStorage.getItem("token")}` },
})
.then((res) =>{ console.log(res)
  setUser(res.data.data)})
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
            <Route path="/vendor/manageprofile/" element={<VendorProfileManage />} />
            <Route path="/vendor/editprofile/:id" element={<VendorProfileCreation />} />




{/* #########      User routes         #############*/}
            <Route path="/user/profile/" element={<User_Profile/>}/>
            <Route path="/user/signup" element={<User_SignUp/>}/>
            <Route path="/user/login" element={<User_Login/>}/>
            <Route path="vendor/profile/:id" element={<VendorProfileShow />}/>
            {/* <Route path="/owner/all"  */}
            


          </Route>
        </Routes>
      
    </div>
  )
}

// export default ()=>(<Provider><App/></Provider>)
export default App
