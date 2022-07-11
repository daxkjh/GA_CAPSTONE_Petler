import { useState } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";



const EditUserPetsForm = ({ toggleForm, selectedPet }) => {
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [user, setUser] = useAtom(userAtom);
  const [petName, setPetName] = useState(selectedPet?.name);
  const [petType, setPetType] = useState(selectedPet?.type);
  const [petBreed, setPetBreed] = useState(selectedPet?.breed);
  const [ petSize, setPetSize] = useState(selectedPet?.size)
  const [petSterilized, setPetSterilized] = useState(selectedPet?.sterilized)
  const [petBirth, setPetBirth] = useState(selectedPet?.birth);


 

  const DogOption =()=>{
    
    return(
        <>
            
            <select onChange={handleBreed} name="breed" id="breed" defaultValue={petBreed}>
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
            <select onChange={handleBreed} name="breed" id="breed" defaultValue={petBreed}>
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
axios.put(`/api/userprofile/pet/${user.data.id}`,{
    id : selectedPet?.id,
    name : petName,
   type : petType,
    breed : petBreed,
   "birth":petBirth+"T00:00:00.000Z",
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
   size : petSize,
    sterilized : petSterilized
})
.then((res)=> {
    setRefresh(!refresh)
    alert(res.data.msg)
                })
.catch(error => console.log("error", error));


  };


const date = selectedPet.birth.slice(0,10)
console.log("SELECTED",selectedPet)
  return (
    <div className="EditPetFormContainer">
      <button onClick={() => toggleForm("editpet")}>Close</button>
      <div className="EditPetFormActual">
        <h1>Edit Pet</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Edit Pet Info</legend>
            <label htmlFor="petName">Pet Name</label>
            <input
              onChange={handlePetName}
              value={petName}
              type="text"
              name="petName"
              id="petName"
            />
            <br></br>
            <label htmlFor="type">Type</label>
            <select onChange={handleType} name="type" id="type" defaultValue={petType}>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
            </select>
            <br></br>
            <label htmlFor="breed">Breed</label>
            {/* <select name="breed" id="breed"> */}
            {(petType==="dog")?<DogOption/>:<CatOption/>}<br></br>
            {/* </select> */}
            <label htmlFor="birthday">Birthday</label>
            <input
              onChange={handleBirth}
              type="date"
              id="birthday"
              name="birthday"
              defaultValue={date}
            ></input><br></br>
            <label htmlFor="size">Size</label>
            <select onChange={handleSize} name="size" id="size" defaultValue={petSize}>
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

export default EditUserPetsForm;
