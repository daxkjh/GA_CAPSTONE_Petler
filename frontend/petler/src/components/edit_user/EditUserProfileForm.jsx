import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";


const EditUserProfileForm = ({toggleForm})=>{
    const [user, setUser] = useAtom(userAtom)
    const [name, setName] = useState(user?.name)
    const [address, setAddress] = useState(user?.address)
    const [desc, setDesc]  = useState(user?.description)
    const [img, setImg] = useState("https://i.imgur.com/aeW3aDj.png")
    const [refresh, setRefresh] = useAtom(refreshAtom)
   



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
            axios.put(`${API_URL}/api/user/editprofile/${user?.userId}/`,{
                name : name,
                address : address,
                description : desc,
                image : img
            },{ headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
              }})
            .then((res)=> {
                setRefresh(!refresh)
                alert(res.data.msg)
                            })
            .catch(error => console.log("error", error));
        
    }

    return (
        <div className="profilechangeformcontainer">
            <button onClick={()=>toggleForm("profile")}>Close</button>
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