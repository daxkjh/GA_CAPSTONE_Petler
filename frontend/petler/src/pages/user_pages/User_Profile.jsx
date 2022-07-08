import { useState, useEffect } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import jwtDecode from "jwt-decode";
import { userAtom } from "../../App";



const User_Profile = () => {
  const [user,setUser] = useAtom(userAtom)
//     const [user,setUser] = useState("")
//     useEffect(()=>{
//         setUser(jwtDecode(localStorage.getItem("token")))
//         // console.log(user)
//   axios
//     .get(`/api/user/profile/${jwtDecode(localStorage.getItem("token")).id}`, {
//       headers: { Authorization: localStorage.getItem("token") },
//     })
//     .then((res) => console.log(res))
//     .catch((error) => console.log("error", error));
//     },[])
console.log("USER", user)

  return (
    <div>
         <h1>User Profile</h1>
         <h2>{user.email}</h2>
    </div>
  );
};

// export default ()=> (<Provider><User_Profile/></Provider>) ;
export default User_Profile
