import React from "react";
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../../App';

function ServicesForm() {
    const [user, setUser] = useAtom(userAtom);
    const [refresh, setRefresh] = useAtom(refreshAtom)

    console.log("d",user?.data?.id)
    const profileId = user?.data?.id
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const price = parseInt(event.target.elements.price.value)
        const serviceData = {
            title: event.target.elements.title.value,
            price: price,
            profileId: profileId
        }
        console.log(serviceData)
        axios.post("/api/vendor/services/", serviceData)
        .then((res) => console.log("れっっす", res.data))
        .catch(error => console.log("error", error));
        setRefresh(prev=>!prev);
    }

  return (
    <div className="serviceForm">
      <form onSubmit={handleSubmit}>  
            <label htmlFor="service">service title</label>
            <input
            type="text"
            name="title"
            id="title"
            placeholder="ie) cat sitting service for 1h"
            />
            <label htmlFor="price">price</label>
            <input
            type="text"
            name="price"
            id="price"
            placeholder="price"
            />
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ServicesForm;