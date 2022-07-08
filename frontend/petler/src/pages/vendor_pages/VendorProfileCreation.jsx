import React from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwtDecode from "jwt-decode";

function VendorProfileCreation() {

    const navigate = useNavigate();

    const handleSubmit = (event) => { 
        console.log("Submit")
        event.preventDefault();
        const profileData = {
          name: event.target.elements.name.value,
          address: event.target.elements.address.value,
          phone: event.target.elements.phone.value,
          description: event.target.elements.description.value,          
          type: event.target.elements.type.value,
          profilePic: event.target.elements.profilePic.value,          
          start: event.target.elements.start.value,
          end: event.target.elements.end.value,
          svcdsc: event.target.elements.description.value,          
          petType: event.target.elements.petType.value,
          petSize: event.target.elements.petSize.value,   
          area: event.target.elements.area.value,       
        }
          console.log(profileData)
        axios.post( "/api/vendors/profile/:id", profileData)
          .then(res => console.log(res))
          .catch(error => console.log("error", error));
          navigate('/vendor/home')
        }

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input 
            required name="name" 
            type="name" 
            placeholder="name" />
        <br />
        <label htmlFor="address">address</label>
        <input 
            required 
            name="address" 
            type="address" 
            placeholder="address" />
        <br />
        <label htmlFor="phone">phone</label>
        <input  
            name="phone" 
            type="phone" 
            placeholder="phone" />
        <br />
        <label htmlFor="description">description</label>
        <input 
            name="description" 
            type="description" 
            placeholder="description" />
        <br />
        <label htmlFor="type of service">type of service</label>
        <input 
            required 
            name="type" 
            type="type" 
            placeholder="type" />
        <br />
        <label htmlFor="profilePic">add profile picture</label>
        <input 
            name="profilePic" 
            type="profilePic" 
            placeholder="profilePicture" />
        <br />
        <label htmlFor="start time">start time</label>
        {/* change to pull down */}
        <input  
            name="start" 
            type="start" 
            placeholder="start time" />
        <br />
        <label htmlFor="start time">end time</label>
        {/* change to pull down */}
        <input  
            name="end" 
            type="end" 
            placeholder="end time" />
        <br />
        <label htmlFor="about your service">about your service</label>
        <input 
            name="svcdsc" 
            type="svcdsc" 
            placeholder="about your service" />
        <br />
        <label htmlFor="Accepted pet type">accepted pet type</label>
        <input 
            name="petType" 
            type="petType" 
            placeholder="petType" />
        <br />
        <label htmlFor="Accepted pet size">accepted pet size</label>
        <input 
            name="petSize" 
            type="petSize" 
            placeholder="petSize" />
        <br />
        <label htmlFor="operation area">operation area</label>
        <input 
            name="area" 
            type="area" 
            placeholder="area" />
       <br />
        <button>submit</button>
      </form>
    </div>
  );
}

export default VendorProfileCreation;
