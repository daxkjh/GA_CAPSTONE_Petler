import { useState, useEffect } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import jwtDecode from "jwt-decode";

const userAtom = atom("");
const User_Profile = () => {
    const [user,setUser] = useState("")
    useEffect(()=>{
        setUser(jwtDecode(localStorage.getItem("token")))
        // console.log(user)
  axios
    .get(`/api/user/profile/${jwtDecode(localStorage.getItem("token")).id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => console.log(res))
    .catch((error) => console.log("error", error));
    },[])


  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
};

export default User_Profile;
