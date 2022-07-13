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
import StyledDropzone from "../../components/uploader/StyledDropzone";

  
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

  useEffect(()=>{
     if (Object.keys(user).length<1) {
       alert("Not Logged In")
      navigate("/user/login")
     }
  },[])



  return (
    <div className="userProfContainer">
      <div className="userProfTitle">
      <h1>Welcome Back! </h1>
      <h2>{user?.email}</h2>
      </div>
      <div className="userProf">
      <div onClick={()=>toggleForm("pic")} className='editbutton'><img src='https://i.imgur.com/horiynl.png'></img></div>
      <img src={user?.image} width={"200px"}></img>
      <button onClick={()=>toggleForm("profile")}>
        edit profile
      </button>
      <p>{user?.name}</p>
      <p>{user?.description}</p>
      <button onClick={()=>toggleForm("password")}>
        edit password
      </button>
      </div>
      <div className="userCalendar">
        <Calendar onChange={onChange} value={value} />
      </div>
     
      <div>
      <div className="petcontainer" id="pet1">
        <PetCard toggleForm={toggleForm} setSelectedPet={setSelectedPet} data={user?.pets?.[0]}/>
      </div>
      <div className="petcontainer" id="pet2">
      <PetCard toggleForm={toggleForm} setSelectedPet={setSelectedPet}  data={user?.pets?.[1]}/>
      </div>
      <div className="petcontainer" id="pet3">
      <PetCard toggleForm={toggleForm} setSelectedPet={setSelectedPet}  data={user?.pets?.[2]}/>
      </div>
      </div>
      
      {formState.password && <EditUserPasswordForm toggleForm={toggleForm}/>}
      {formState.profile&&<EditUserProfileForm toggleForm={toggleForm} />}
      {formState.editpet&&<EditUserPetsForm selectedPet={selectedPet} toggleForm={toggleForm}/>}
      {formState.createpet&&<CreatePetForm toggleForm={toggleForm}/>}
      {formState.pic&&<StyledDropzone toggleForm={toggleForm} arg={"pic"}/>}
    </div>
  );
};

// export default ()=> (<Provider><User_Profile/></Provider>) ;
export default User_Profile;
