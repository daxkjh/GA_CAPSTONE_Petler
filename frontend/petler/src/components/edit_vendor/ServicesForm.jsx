import React from "react";
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../../App';

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function ServicesForm({ toggleForm, arg }) {
    const [user, setUser] = useAtom(userAtom);
    const [refresh, setRefresh] = useAtom(refreshAtom)

    console.log("d",user?.id)
    const profileId = user?.id
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const price = parseInt(event.target.elements.price.value)
        if (event.target.elements.dayService.value === "true") {
          const serviceData = {
            title: event.target.elements.title.value,
            price: price,
            profileId: profileId,
            dayService: true,
          }
        axios.post(`${API_URL}/api/vendor/services/`, serviceData,{ headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }})
        .then((res) => console.log("れっっす", res.data))
        .catch(error => console.log("error", error));
        } else {
          const serviceData = {
            title: event.target.elements.title.value,
            price: price,
            profileId: profileId,
            dayService: false,
        } 
        axios.post("/api/vendor/services/", serviceData,{ headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }})
        .then((res) => console.log("れっっす", res.data))
        .catch(error => console.log("error", error));
      }
        setRefresh(prev=>!prev);
        toggleForm(arg);
    }

  return (
    <div className="vendorFormContainer">
    <div className="serviceForm">
      <form onSubmit={handleSubmit}>  
            <label htmlFor="service">service title</label>
            <br/>
            <input
            required
            type="text"
            name="title"
            id="title"
            placeholder="ie) cat sitting service for 1h"
            />
            <br/>
            <label htmlFor="price">price</label>
            <br/>
            <input
            required
            type="text"
            name="price"
            id="price"
            placeholder="price"
            />
        <br/><br></br>
        <select name="dayService" >
          <option name="dayService" value="true">single day</option>
          <option name="dayService" value="false">multiple days</option>
        </select>
        <button>Submit</button>
        <p onClick={() => toggleForm(arg)}
        className="edit"> cancel </p>
      </form>
    </div>
    </div>
  );
}

export default ServicesForm;