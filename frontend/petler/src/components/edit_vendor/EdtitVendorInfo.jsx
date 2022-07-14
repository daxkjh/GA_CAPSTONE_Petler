import axios from "axios";
import { useState } from 'react';

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function EdtitVendorInfo( { user, toggleForm, arg, setRefresh }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const profileData = {
            name: event.target.elements.name.value,
            address: event.target.elements.address.value,
            phone: event.target.elements.phone.value,
            intro: event.target.elements.intro.value
        };
        axios.put(`${API_URL}/api/vendor/profile/p/${user?.vendorId}`, profileData,{ headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }})
            .then((res) => {console.log(res.data)
            setRefresh(prev=>!prev);
            toggleForm(arg);
            })
            .catch((error) => console.log("error", error));            
        };

  return (
    <div className="vendorFormContainer">
    <div className="serviceForm">
        <h2>Edit your profile</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">name</label>
      <input required name="name" type="name" defaultValue={user?.name}/>
      <br />
      <label htmlFor="address">address</label>
      <input required name="address" type="address" defaultValue={user?.address} />
      <br />
      <label htmlFor="phone">phone</label>
      <input required name="phone" type="phone" defaultValue={user?.phone} />
      <br />
      <label htmlFor="intro">introduce yourself</label>
      <input required name="intro" type="intro" defaultValue={user?.intro}/>
      <br />
      <button>Apply</button>
      </form>
      <p className='edit' onClick={() => toggleForm(arg)} >cancel</p>
      </div>
      </div>
  )
}

export default EdtitVendorInfo
