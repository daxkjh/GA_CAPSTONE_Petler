import { useState, useEffect } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import jwtDecode from "jwt-decode";
import { userAtom } from "../../App";



const User_Profile = () => {
  const [user,setUser] = useAtom(userAtom)
  console.log("USER", user)

  return (
    <div>
         <h1>Welcome Back! </h1>
         <h2>{user.email}</h2>
    </div>
  );
};

// export default ()=> (<Provider><User_Profile/></Provider>) ;
export default User_Profile
