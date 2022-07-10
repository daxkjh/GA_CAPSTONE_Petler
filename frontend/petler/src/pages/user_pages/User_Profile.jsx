import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import jwtDecode from "jwt-decode";
import EditUserPasswordForm from "../../components/edit_user/EditUserPasswordForm";
import EditUserProfileForm from "../../components/edit_user/EditUserProfileForm";
import PetCard from "../../components/user_components/PetCard";
import EditUserPetsForm from "../../components/edit_user/EditUserPetForm";

const User_Profile = () => {
  const [user, setUser] = useAtom(userAtom);
  // const [userData, setUserData] = useState()
  console.log("USER", user);
  const [formState, setFormState] = useState({
    pic: false,
    password: false,
    profile: false,
    editpet: false,
    createpet: false
  });

  const toggleForm = (x) => {
    // console.log("WHAT IS X?",x)
    setFormState({
      ...formState,
      [x] : !formState[x],
    });
  };

  return (
    <div className="userProfContainer">
      <div className="userProfTitle">
      <h1>Welcome Back! </h1>
      <h2>{user?.data?.email}</h2>
      </div>
      <div className="userProf">
      <img src={user?.data?.profile?.image} width={"200px"}></img>
      <button onClick={()=>toggleForm("profile")}>
        edit profile
      </button>
      <p>{user?.data?.profile?.name}</p>
      <p>{user?.data?.profile?.description}</p>
      <button onClick={()=>toggleForm("password")}>
        edit password
      </button>
      </div>
      <div className="userCalendar">
        <p>calendar will be displayed here</p>
      </div>
     
      <div>
      <div className="petcontainer" id="pet1">
        <PetCard toggleForm={toggleForm} data={user?.data?.profile?.pets[0]}/>
      </div>
      <div className="petcontainer" id="pet2">
      <PetCard toggleForm={toggleForm} data={user?.data?.profile?.pets[1]}/>
      </div>
      <div className="petcontainer" id="pet3">
      <PetCard toggleForm={toggleForm} data={user?.data?.profile?.pets[2]}/>
      </div>
      </div>
      
      {formState.password && <EditUserPasswordForm toggleForm={toggleForm}/>}
      {formState.profile&&<EditUserProfileForm toggleForm={toggleForm} />}
      {formState.editpet&&<EditUserPetsForm toggleForm={toggleForm}/>}
    </div>
  );
};

// export default ()=> (<Provider><User_Profile/></Provider>) ;
export default User_Profile;
