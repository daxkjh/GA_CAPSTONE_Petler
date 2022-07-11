import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";

function VendorProfileCreation() {

  const navigate = useNavigate();
  // const [check1, setCheck1] = useState(false)
  // const access = jwtDecode(localStorage.getItem("token"))
  // const vendorId = access.vendorLogin.id

  const id = useParams();
  console.log(id);

  // const handleChange1 = event => {
  //   if (event.target.checked) {
  //     console.log("checked");
  //   } else {
  //     console.log("not checked");
  //   }
  //   setCheck1(current=>!current)
  //   console.log(check1)
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const profileData = {
      name: event.target.elements.name.value,
      address: event.target.elements.address.value,
      phone: event.target.elements.phone.value,
      intro: event.target.elements.intro.value,
      profilePic: event.target.elements.profilePic.value,
      start: event.target.elements.start.value,
      end: event.target.elements.end.value,
      svcdsc: event.target.elements.svcdsc.value,
      petType: event.target.elements.petType.value,
      xs: event.target.elements.xs.checked,
      s: event.target.elements.s.checked,
      m: event.target.elements.m.checked,
      l: event.target.elements.l.checked,
      xl: event.target.elements.xl.checked,
      north: event.target.elements.north.checked,
      south: event.target.elements.south.checked,
      east: event.target.elements.east.checked,
      west: event.target.elements.west.checked,
    };
    console.log("データ",profileData);
    axios
      .put(`/api/vendor/profile/${id.id}`, profileData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          navigate(`/vendor/manageprofile/`);
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
        <label htmlFor="profilePic">add profile picture</label>
        <input
          name="profilePic"
          type="profilePic"
          placeholder="profilePicture"
        />
        <br />
        <label htmlFor="start time">start time</label>
        <select name="start">
        <option value="6">6:00</option>
        <option value="7">7:00</option>
        <option value="8">8:00</option>
        <option value="9">9:00</option>
        <option value="10">10:00</option>
        <option value="11">11:00</option>
        <option value="12">12:00</option>
        <option value="13">13:00</option>
        <option value="14">14:00</option>
        <option value="15">15:00</option>
        <option value="16">16:00</option>
        <option value="17">17:00</option>
        <option value="18">18:00</option>
        <option value="19">19:00</option>
        <option value="20">20:00</option>
        <option value="21">21:00</option>
        <option value="22">22:00</option>
        <option value="23">23:00</option>
        </select>
        <br />
        <label htmlFor="end time">end time</label>
        <select name="end">
        <option value="6">6:00</option>
        <option value="7">7:00</option>
        <option value="8">8:00</option>
        <option value="9">9:00</option>
        <option value="10">10:00</option>
        <option value="11">11:00</option>
        <option value="12">12:00</option>
        <option value="13">13:00</option>
        <option value="14">14:00</option>
        <option value="15">15:00</option>
        <option value="16">16:00</option>
        <option value="17">17:00</option>
        <option value="18">18:00</option>
        <option value="19">19:00</option>
        <option value="20">20:00</option>
        <option value="21">21:00</option>
        <option value="22">22:00</option>
        <option value="23">23:00</option>
        </select>
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
          <input type="checkbox" name="s" />
          <label htmlFor="Accepted pet size" >10-20kg</label>
          <input type="checkbox" name="m" />
          <label htmlFor="Accepted pet size" >20-40kg</label>
          <input type="checkbox" name="l" />
          <label htmlFor="Accepted pet size">over 40kg</label>
          <input type="checkbox" name="xl" />
          <br />
        </div>
        <div>
          <p>operation area</p>
          <label htmlFor="operation area">north</label>
          <input type="checkbox" name="north" />
          <label htmlFor="operation area">south</label>
          <input type="checkbox" name="south" />
          <label htmlFor="operation area">west</label>
          <input type="checkbox" name="west" />
          <label htmlFor="operation area">east</label>
          <input type="checkbox" name="east" />
          <br />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
}

export default VendorProfileCreation;
