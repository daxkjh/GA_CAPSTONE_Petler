import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

function VendorProfileCreation() {
  const navigate = useNavigate();
  // const access = jwtDecode(localStorage.getItem("token"))
  // const vendorId = access.vendorLogin.id

  // console.log("はよーはよー",vendorId)
  const id = useParams();
  console.log(id);
  const handleSubmit = (event) => {
    event.preventDefault();
    const profileData = {
      name: event.target.elements.name.value,
      address: event.target.elements.address.value,
      phone: event.target.elements.phone.value,
      intro: event.target.elements.intro.value,
      type: event.target.elements.type.value,
      profilePic: event.target.elements.profilePic.value,
      start: event.target.elements.start.value,
      end: event.target.elements.end.value,
      svcdsc: event.target.elements.svcdsc.value,
      petType: event.target.elements.petType.value,
      xs: event.target.elements.xs.value,
      s: event.target.elements.s.value,
      m: event.target.elements.m.value,
      l: event.target.elements.l.value,
      xl: event.target.elements.xl.value,
      // area: event.target.elements.area.value,
    };
    console.log(profileData);
    axios
      .put(`/api/vendor/profile/${id.id}`, profileData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          navigate(`/vendor/profile/${id.id}`);
        }
      })

      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input required name="name" type="name" placeholder="name" />
        <br />
        <label htmlFor="address">address</label>
        <input required name="address" type="address" placeholder="address" />
        <br />
        <label htmlFor="phone">phone</label>
        <input name="phone" type="phone" placeholder="phone" />
        <br />
        <label htmlFor="intro">introduce yourself</label>
        <input name="intro" type="intro" placeholder="intro" />
        <br />
        <label htmlFor="type of service">type of service</label>
        <input required name="type" type="type" placeholder="type" />
        <br />
        <label htmlFor="profilePic">add profile picture</label>
        <input
          name="profilePic"
          type="profilePic"
          placeholder="profilePicture"
        />
        <br />
        <label htmlFor="start time">start time</label>
        {/* change to pull down */}
        <input name="start" type="start" placeholder="start time" />
        <br />
        <label htmlFor="start time">end time</label>
        {/* change to pull down */}
        <input name="end" type="end" placeholder="end time" />
        <br />
        <label htmlFor="about your service">about your service</label>
        <input name="svcdsc" type="svcdsc" placeholder="about your service" />
        <br />
        <label htmlFor="Accepted pet type">accepted pet type</label>
        <select name="petType">
          <option value="cats">cats</option>
          <option value="dogs">dogs</option>
          <option value="both">both</option>
        </select>
        <br />
        <div>
          <p>accepted pet size</p>
          <label htmlFor="Accepted pet size">1-5kg</label>
          <input type="checkbox" name="xs" />
          <label htmlFor="Accepted pet size">5-10kg</label>
          <input type="checkbox" name="s" placeholder="petSize" />
          <label htmlFor="Accepted pet size">10-20kg</label>
          <input type="checkbox" name="m" />
          <label htmlFor="Accepted pet size">20-40kg</label>
          <input type="checkbox" name="l" />
          <label htmlFor="Accepted pet size">over 40kg</label>
          <input type="checkbox" name="xl" />
          <br />
        </div>
        <div>
          <p>operation area</p>
          <label htmlFor="operation area">north</label>
          <input type="checkbox" name="area" />
          <label htmlFor="operation area">south</label>
          <input type="checkbox" name="area" />
          <label htmlFor="operation area">west</label>
          <input type="checkbox" name="area" />
          <label htmlFor="operation area">east</label>
          <input type="checkbox" name="area" />
          <br />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
}

export default VendorProfileCreation;
