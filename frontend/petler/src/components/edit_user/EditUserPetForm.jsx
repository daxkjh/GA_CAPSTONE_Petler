import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";



const EditUserPetsForm = ({toggleForm})=>{
    const [refresh, setRefresh] = useAtom(refreshAtom)
    const [user, setUser] = useAtom(userAtom)
    

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
                <input type="text" name="petName" id="petName"/><br></br>
                <label htmlFor="type">Type</label>
                <select name="type" id="type">
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    </select><br></br>

                </fieldset>
            </form>
            </div>
        </div>
    )
}

export default EditUserPetsForm