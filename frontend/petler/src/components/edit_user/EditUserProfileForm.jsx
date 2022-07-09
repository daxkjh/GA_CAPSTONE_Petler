import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";


const EditUserProfileForm = ()=>{
    const [user, setUser] = useAtom(userAtom)
    const [name, setName] = useState(user?.profile?.name)
    const [address, setAddress] = useState(user?.profile?.address)
    const [desc, setDesc]  = useState(user?.profile?.description)
    const [img, setImg] = useState("https://i.imgur.com/aeW3aDj.png")



    const handleName = (e)=>{
        e.preventDefault()
        setName(e.target.value)
    }

    const handleAddress = (e) =>{
        e.preventDefault()
        setAddress(e.target.value)
    }
    const handleDesc = (e)=>{
        e.preventDefault()
        setDesc(e.target.value)
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
            axios.put(`/api/user/editprofile/${user?.id}/`,{
                name : name,
                address : address,
                description : desc,
                image : img
            })
            .then((res)=> alert(res.data.msg))
            .catch(error => console.log("error", error));
        
    }

    return (
        <div className="profilechangeformcontainer">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Edit Profile</legend>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleName} value={name} type="text" name="name" id="name" placeholder="enter new name"/><br></br>
                    <label htmlFor="address">Address</label>
                    <input onChange={handleAddress} value={address} type="text" name="address" id="address" placeholder="enter new address"/><br></br>
                    <label htmlFor="description">Introduce Yourself!</label>
                    <textarea onChange={handleDesc} value={desc} maxLength="500" cols="30" rows="5" charswidth="23" name="description" id="description" placeholder="Max 500 Characters"/><br></br>
                    <button>Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default EditUserProfileForm