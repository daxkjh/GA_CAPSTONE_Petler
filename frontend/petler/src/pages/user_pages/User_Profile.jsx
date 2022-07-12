import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import jwtDecode from "jwt-decode";
import EditUserPasswordForm from "../../components/edit_user/EditUserPasswordForm";
import EditUserProfileForm from "../../components/edit_user/EditUserProfileForm";
import PetCard from "../../components/user_components/PetCard";
import EditUserPetsForm from "../../components/edit_user/EditUserPetForm";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CreatePetForm from "../../components/edit_user/CreateUserPetsForm";
import EditUserPicForm from "../../components/edit_user/EditUserPicForm";

  
  const User_Profile = () => {
  const [value, onChange] = useState(new Date());
  const [user, setUser] = useAtom(userAtom);
  const [selectedPet, setSelectedPet] = useState({})
  // const [userData, setUserData] = useState()
  console.log("USER", user);
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    pic: false,
    password: false,
    profile: false,
    editpet: false,
    createpet: false
  });

  const toggleForm = (x) => {
    setFormState({
      ...formState,
      [x] : !formState[x],
    });
  };

  // useEffect(()=>{
  //    if (Object.keys(user).length<1) {
  //     navigate("/user/login")
  //     alert("Not Logged In")
  //    }
  // },[])



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
        <Calendar onChange={onChange} value={value} />
      </div>
     
      <div>
      <div className="petcontainer" id="pet1">
        <PetCard toggleForm={toggleForm} setSelectedPet={setSelectedPet} data={user?.data?.profile?.pets[0]}/>
      </div>
      <div className="petcontainer" id="pet2">
      <PetCard toggleForm={toggleForm} setSelectedPet={setSelectedPet}  data={user?.data?.profile?.pets[1]}/>
      </div>
      <div className="petcontainer" id="pet3">
      <PetCard toggleForm={toggleForm} setSelectedPet={setSelectedPet}  data={user?.data?.profile?.pets[2]}/>
      </div>
      </div>
      
      {formState.password && <EditUserPasswordForm toggleForm={toggleForm}/>}
      {formState.profile&&<EditUserProfileForm toggleForm={toggleForm} />}
      {formState.editpet&&<EditUserPetsForm selectedPet={selectedPet} toggleForm={toggleForm}/>}
      {formState.createpet&&<CreatePetForm toggleForm={toggleForm}/>}
      <EditUserPicForm/>
    </div>
  );
};

// export default ()=> (<Provider><User_Profile/></Provider>) ;
export default User_Profile;
