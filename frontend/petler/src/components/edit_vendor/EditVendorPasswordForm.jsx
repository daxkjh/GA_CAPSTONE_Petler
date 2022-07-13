import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";


const EditVendorPasswordForm = ( {setPWChange} )=>{
    const [cfmpw, setCFMPW] = useState(true)
    const [user, setUser] = useAtom(userAtom)

    // const handleCheck =(e)=>{
    //     if(e.target.value)
    // }


    // console.log("heyya!", id)
    const handleSubmit=(e)=>{
        e.preventDefault()
        // console.log(e.target.elements.oldpw.value)
        console.log(e.target.elements.newpw.value)
        console.log(e.target.elements.cfmpw.value)
        if(e.target.elements.newpw.value!==e.target.elements.cfmpw.value){
            setCFMPW(false)
        } else {
            setCFMPW(true)
            console.log("USERID",user)
            axios.put(`/api/vendor/signup/${user?.vendorId}/`,{
                password : e.target.elements.newpw.value
            },{ headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
              }})
            .then((res)=> {
                alert("password changed")
                console.log(res)} )
            .catch(error => console.log("error", error));
            setPWChange(false);
        }
    }

    return (
        <div className="vendorFormContainer">
            <div className="serviceForm">
            <form onSubmit={handleSubmit}>
                    <legend>Change Password</legend>
                    {/* <label htmlFor="oldpw">Old Password</label>
                    <input type="text" name="oldpw" id="oldpw" placeholder="enter old password"/><br></br> */}
                    <label htmlFor="newpw">New Password</label>
                    <input type="text" name="newpw" id="newpw" placeholder="enter new password"/><br></br>
                    <label htmlFor="cfmpw">Confirm New Password</label>
                    <input type="text" name="cfmpw" id="cfmpw" placeholder="re-enter new password"/><span>{(cfmpw)? null : "Password does not match"}</span><br></br>
                    <button>Submit</button>
            </form>
            <p className="edit" onClick={() => setPWChange(false)}>cancel</p>
            </div>
        </div>
    )
}

export default EditVendorPasswordForm