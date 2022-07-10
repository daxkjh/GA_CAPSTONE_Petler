import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";



const EditUserPetsForm = ({toggleForm,selectedPet})=>{
    const [refresh, setRefresh] = useAtom(refreshAtom)
    const [user, setUser] = useAtom(userAtom)
    
    const [petName, setPetName] = useState(selectedPet?.name)
    const [petType, setPetType] = useState(selectedPet?.type)
    const [petBreed, setPetBreed]= useState(selectedPet?.breed)
    const [petBirth, setPetBirth] = useState(Date.now())

    console.log("PET",selectedPet)

const handlePetName = (e)=>{
e.preventDefault()
setPetName(e.target.value)
}

const handleBirth=(e)=>{
e.preventDefault()
setPetBirth(e.target.value)
console.log(typeof(e.target.value))
}




    const handleSubmit=()=>{}

    return(
        <div className="EditPetFormContainer">
            <button onClick={()=>toggleForm("editpet")}>Close</button>
            <div className="EditPetFormActual">
            <h1>Edit Pet</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <legend>Edit Pet Info</legend>
                <label htmlFor="petName">Pet Name</label>
                <input onChange={handlePetName} value={petName} type="text" name="petName" id="petName"/><br></br>
                <label htmlFor="type">Type</label>
                <select name="type" id="type" defaultValue={petType}>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    </select><br></br>
                <select name="breed" id="breed" ></select>
                <label for="start">Start date:</label>

<input onChange={handleBirth} type="date" id="birthday" name="birthday"
       value={petBirth}
       ></input>
                </fieldset>
            </form>
            </div>
        </div>
    )
}

export default EditUserPetsForm