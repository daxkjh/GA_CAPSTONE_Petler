import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { userAtom } from "../../App";
import { atom, useAtom } from "jotai";
import { refreshAtom } from "../../App";
import { useState } from "react";

export const vendorAtom = atom({});

function VendorLogin() {
  const [user, setUser] = useAtom(userAtom);
  const [invalid, setInvalid] = useState(false);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    axios
      .post("/api/vendor/login", loginData)
      .then((response) => {
        {
          const token = response.data.accessToken;
          localStorage.setItem("token", token);
          if (token) {
            setRefresh((prev) => !prev);
            setTimeout(()=>navigate("/vendor/manageprofile/"),200);
          } else {
            setInvalid(true);
            console.log(response.data);
          }
        }
      })
      .catch(error => { alert("Invalid Login Credentials")
        console.log("error", error)});
  };

  // console.log("ここ", vendor)
  return (
    <>
    <div className='form-u'>
      <form onSubmit={handleSubmit}> 
      <div className="username">
      <input
        required
        name="email"
        type="email"
        placeholder="email"
        onChange={() => {
          setInvalid(false);
        }}
      />
      </div>
      <div className="password">
      <input
        required
        name="password"
        type="password"
        placeholder="password"
        onChange={() => {
          setInvalid(false);
        }}
      />
      </div>
      <div className="login">
      <button className='loginButton'>log in</button>
      </div>
      </form>
      {invalid ? <p>Incorrect email or Password</p> : null}
    </div>
    <div>
      <p> don't have an account? </p>
      <Link className="signuptext" to="/vendor/signup">Signup</Link>
      </div>
      </>
  );
}


export default VendorLogin;
