import { useState,useEffect } from 'react';

import axios from 'axios';

const User_SignUp = ()=>{
    const[usersData, setUsersData] = useState({})
    const[submit,setSubmit] = useState({
        email : "",
        password : "",
    })
    const[passwordCheck, setPasswordCheck] = useState("")


// Draw all USERS DATA for email check
    useEffect(()=>{
        axios.get('/api/user/')
  .then(function (response) {
    setSubmit(response)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
},[])






    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await axios.post()
        } catch (error) {
            alert(`status: Error, ${error}`)
        }

    }
//CONTROLLED FORM EMAIL INPUT
    const handleChange_email=(e)=>{
        
    }
// CONTROLLED FORM PASSWORD INPUT
    const handleChange_password=(e)=>{

    }

// CONTROLLED FORM CONFIRM PASSWORD INPUT
    const handleChange_confirmPassword=(e)=>{

    }

    return(
        <div>
            <h1>User Sign Up Page</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Sign Up</legend>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange_email} type="email" name="email" id="email" />
                    <label htmlFor="pw">Password</label>
                    <input onChange={handleChange_password} type="password" name="pw" id="pw" />
                    <label htmlFor="cpw">Confirm Password</label>
                    <input onChange={handleChange_confirmPassword} type="password" name="cpw" id="cpw" /><span>{(passwordCheck && passwordCheck===submit.password)?<h1>ok</h1>:null}</span>
                    <button type="submit">Sign Up</button>
                </fieldset>
            </form>
        </div>
    )
}
export default User_SignUp