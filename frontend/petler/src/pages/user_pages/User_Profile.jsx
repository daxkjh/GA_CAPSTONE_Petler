import { useState,useEffect } from "react"
import axios from "axios";

const User_Profile = ()=>{

    axios.get( "/api/user/", {headers: { Authorization:localStorage.getItem('jwtToken') } })
        
 
    .then(res => console.log(res))
    .catch(error => console.log("error", error));
    navigate('/user/login')

    axios.post('http://yourendpoint',data,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
    .then(response=> console.log(response))
    .catch(error => console.log(error));
};
  

    return (
        <div>
            <h1>User Profile</h1>
        </div>
    )
}

export default User_Profile