import { useState,useEffect } from "react"

useatom
const User_Profile = ()=>{

    axios.post( "/api/vendors/signup", {header: {
        authorization: token
    }})
    .then(res => console.log(res))
    .catch(error => console.log("error", error));
    navigate('/vendor/home')
  

    return (
        <div>
            <h1>User Profile</h1>
        </div>
    )
}

export default User_Profile