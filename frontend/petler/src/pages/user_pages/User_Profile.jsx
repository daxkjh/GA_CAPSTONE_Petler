import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import jwtDecode from "jwt-decode";
import EditUserPasswordForm from "../../components/edit_user/EditUserPasswordForm";
import EditUserProfileForm from "../../components/edit_user/EditUserProfileForm";

const User_Profile = () => {
  const [user, setUser] = useAtom(userAtom);
  // const [userData, setUserData] = useState()
  console.log("USER", user);
  const [formState, setFormState] = useState({
    pic: false,
    password: false,
    profile: false,
  });

  const toggleForm = (event) => {
    setFormState({
      ...formState,
      [event.target.value]: !formState[event.target.value],
    });
  };

// const id = user?.data?.id
// console.log('aa',id)
//   useEffect(()=> {
//     axios.get(`/api/user/profile/${id}`)
//     .then((res) => {console.log("れす",res)
//       setUserData(res.data)})
//     .catch(error => console.log("error", error));
//     // setRefresh(prev=>!prev);
//   }, [])
//    console.log("hey dude", userData)

  return (
    <div>
      <h1>Welcome Back! </h1>
      <h2>{user?.data?.email}</h2>


      <button onClick={toggleForm} value="password">
        edit password
      </button>
      <button onClick={toggleForm} value="profile">
        edit profile
      </button>
      {formState.password && <EditUserPasswordForm toggleForm={toggleForm}/>}
      {formState.profile&&<EditUserProfileForm toggleForm={toggleForm} />}
    </div>
  );
};

// export default ()=> (<Provider><User_Profile/></Provider>) ;
export default User_Profile;
