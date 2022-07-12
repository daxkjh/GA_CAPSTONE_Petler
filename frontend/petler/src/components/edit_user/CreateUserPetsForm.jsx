import { useState } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";



const CreateUserPetsForm = ({ toggleForm}) => {
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [user, setUser] = useAtom(userAtom);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [ petSize, setPetSize] = useState("xs")
  const [petSterilized, setPetSterilized] = useState(false)
  const [petBirth, setPetBirth] = useState(Date.now());


 

  const DogOption =()=>{
    
    return(
        <>
            <label htmlFor="breed">Breed</label>
            <select required onChange={handleBreed} name="breed" id="breed" defaultValue={petBreed}>
                <option value="Pomeranian">Pomeranian</option>
                <option value="Labrador Retriever">Labrador Retriever</option>
                <option value="Poodle">Poodle</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Golden Retriever">Golden Retriever</option>
                <option value="Others">Others</option>
            </select>
        </>
    )
} 

const CatOption =()=>{
    return(
        <> 
        <label htmlFor="breed">Breed</label>
            <select required onChange={handleBreed} name="breed" id="breed" defaultValue={petBreed}>
                <option value="British Shorthair">British Shorthair</option>
                <option value="Russian Blue">Russian Blue</option>
                <option value="Siberian">Siberian</option>
                <option value="Munchkin">Munchkin</option>
                <option value="Siamese">Siamese</option>
                <option value="Others">Others</option>
            </select>
        </>
    )
} 

const handleBreed = (e)=>{
    e.preventDefault()
    setPetBreed(e.target.value)
}

const handleType = (e) =>{
    e.preventDefault()
    setPetType(e.target.value)
}

const handleSize = (e) =>{
    e.preventDefault()
    setPetSize(e.target.value)
}

  const handlePetName = (e) => {
    e.preventDefault();
    setPetName(e.target.value);
  };

  const handleBirth = (e) => {
    e.preventDefault();
    setPetBirth(e.target.value);
    console.log(e.target.value);
  };

  const handleSterilized = (e)=>{
    setPetSterilized(e.target.checked)
//    console.log(e.target.checked)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
axios.post(`/api/userprofile/pet/${user.data.id}`,{
    // id : selectedPet?.id,
    name : petName,
   type : petType,
    breed : petBreed,
   "birth":petBirth+"T00:00:00.000Z",
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
   size : petSize,
    sterilized : petSterilized,
    userProfileId: user?.profile?.id
})
.then((res)=> {
    setRefresh(!refresh)
    alert(res.data.msg)
                })
.catch(error => console.log("error", error));


  };



  return (
    <div className="EditPetFormContainer">
      <button onClick={() => toggleForm("createpet")}>Close</button>
      <div className="EditPetFormActual">
        <h1>Create Pets</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Create Pets</legend>
            <label htmlFor="petName">Pet Name</label>
            <input
            required
              onChange={handlePetName}
              value={petName}
              type="text"
              name="petName"
              id="petName"
            />
            <br></br>
            <label htmlFor="type">Type</label>
            <select required onChange={handleType} name="type" id="type" defaultValue={petType}>
              <option value=""> -- </option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
            </select>
            <br></br>
            
            {/* <select name="breed" id="breed"> */}
            {(petType==="dog")?<DogOption/>:(petType==="cat")?<CatOption/>:null}<br></br>
            {/* </select> */}
            <label htmlFor="birthday">Birthday</label>
            <input
            required
              onChange={handleBirth}
              type="date"
              id="birthday"
              name="birthday"
              defaultValue={petBirth}
            ></input><br></br>
            <label htmlFor="size">Size</label>
            <select required onChange={handleSize} name="size" id="size" defaultValue={petSize}>
                <option value="xs">1 - 5 KG</option>
                <option value="s">5 - 10 KG</option>
                <option value="m">10 - 20 KG</option>
                <option value="l">20 - 40 KG</option>
                <option value="xl">40+ KG</option>
            </select>
            <label htmlFor="sterilized">Sterilized</label>
            <input onChange={handleSterilized} type="checkbox" name="sterilized" id="sterilized" defaultChecked={petSterilized}/>
            <button>Apply</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPetsForm;
