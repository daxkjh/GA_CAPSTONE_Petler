import { useState,useEffect } from "react"
import axios from "axios";

const User_Profile = ()=>{

    axios.get( "/api/vendors/signup", {header: {
        
    }})
    .then(res => console.log(res))
    .catch(error => console.log("error", error));
    navigate('/user/login')
  

    return (
        <div>
            <h1>User Profile</h1>
        </div>
    )
}

export default User_Profile