import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function VendorSignUp() {
  const [emailTaken, setEmailTaken] = useState(false)


  const navigate = useNavigate();

  const handleSubmit = (event) => { 
    event.preventDefault();
    const signupData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      name: event.target.elements.name.value,
      type: event.target.elements.type.value,
    }
      // console.log(signupData)
    axios.post( `${API_URL}/api/vendor/signup`, signupData)
      .then(res => {
        if (res.status === 200) {
          navigate('/vendor/login')
        }
      })
      .catch(error => console.log("error", error));
      setEmailTaken(true)
      
    }
        
  return (
    <div>
      <div className='form-u'>
     <form onSubmit={handleSubmit} >
     <div className="username">
        <input 
        className='login-input'
        required 
        name="name" 
        type="name" 
        placeholder="name" />
        <br />
        </div> 
        <div className="password">
      <input
              required
              className='login-input'
              name="email"
              type="email"
              placeholder="email"
              onChange={()=> setEmailTaken(false)}
            />
            {emailTaken? <p>this email is taken</p> : null }
            <br/>  
            </div>
      <div className="password">
      <input
              required
              className='login-input'
              name="password"
              type="password"
              placeholder="password"
              />
      </div>
      <div className="password">
      <input
              required
              className='login-input'
              name="password2"
              type="password2"
              placeholder="confirm password"
              />
         </div>
         <div className="password">
        <label htmlFor="type of service">type of service</label>
        <br/>
        <select className="login-input "name="type">
        <option value="sitter">sitter</option>
        <option value="hotel">hotel</option>
        <option value="groomer">groomer</option>
        </select>
        </div>
      <div className="login">
      <button className='loginButton'>create account</button>
      </div>
      </form>
      </div>
    </div>
  )
}

export default VendorSignUp
