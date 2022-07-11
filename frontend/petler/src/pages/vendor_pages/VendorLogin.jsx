import React from "react";
import { useNavigate } from "react-router-dom";
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
            navigate("/home");
            setRefresh((prev) => !prev);
          } else {
            setInvalid(true);
            console.log(response.data);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  // console.log("ここ", vendor)
  return (
    <div>
      <form onSubmit={handleSubmit}> 
      <label htmlFor="email">email</label>
      <input
        required
        name="email"
        type="email"
        placeholder="email"
        onChange={() => {
          setInvalid(false);
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        required
        name="password"
        type="password"
        placeholder="password"
        onChange={() => {
          setInvalid(false);
        }}
      />
      <button>Login!</button>
      </form>
      {invalid ? <p>Incorrect email or Password</p> : null}
    </div>
  );
}

export default VendorLogin;
