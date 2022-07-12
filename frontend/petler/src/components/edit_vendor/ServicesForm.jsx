import React from "react";
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../../App';

function ServicesForm({ setServiceSetting }) {
    const [user, setUser] = useAtom(userAtom);
    const [refresh, setRefresh] = useAtom(refreshAtom)

    console.log("d",user?.data?.id)
    const profileId = user?.data?.id
    
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
        axios.post("/api/vendor/services/", serviceData)
        .then((res) => console.log("れっっす", res.data))
        .catch(error => console.log("error", error));
        } else {
          const serviceData = {
            title: event.target.elements.title.value,
            price: price,
            profileId: profileId,
            dayService: false,
        } 
        axios.post("/api/vendor/services/", serviceData)
        .then((res) => console.log("れっっす", res.data))
        .catch(error => console.log("error", error));
      }
        setRefresh(prev=>!prev);
    }

  return (
    <div className="vendorFormContainer">
    <div className="serviceForm">
      <form onSubmit={handleSubmit}>  
            <label htmlFor="service">service title</label>
            <br/>
            <input
            type="text"
            name="title"
            id="title"
            placeholder="ie) cat sitting service for 1h"
            />
            <br/>
            <label htmlFor="price">price</label>
            <br/>
            <input
            type="text"
            name="price"
            id="price"
            placeholder="price"
            />
        <br/>
        <select name="dayService" >
          <option name="dayService" value="true">single day</option>
          <option name="dayService" value="false">multiple days</option>
        </select>
        <button>Submit</button>
        <p onClick={() => setServiceSetting(false)}
        className="edit"> cancel </p>
      </form>
    </div>
    </div>
  );
}

export default ServicesForm;