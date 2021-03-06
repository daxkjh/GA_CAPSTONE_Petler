import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function EditVendorBusiness( { toggleForm, arg, user, setRefresh }) {
  const [emptyAlertSize, setElementSize] = useState(false);
  const [emptyAlertArea, setElementArea] = useState(false);

  // const access = jwtDecode(localStorage.getItem("token"))
  // const vendorId = access.vendorLogin.id


  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.elements.xs.checked === false && 
      event.target.elements.s.checked === false &&
      event.target.elements.m.checked === false &&
      event.target.elements.l.checked === false &&
      event.target.elements.xl.checked === false ) {
        setElementSize(true);
    } else if (event.target.elements.north.checked === false && 
      event.target.elements.south.checked === false && 
      event.target.elements.east.checked === false && 
      event.target.elements.west.checked === false
      ) {
        setElementArea(true);
    } else {
    const profileData = {
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
    // console.log("データ",profileData);
    axios
      .put(`${API_URL}/api/vendor/profile/b/${user?.vendorId}`, profileData,{ headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }})
      .then((res) => {
          console.log(res.data);
          setRefresh(prev=>!prev);
          toggleForm(arg);
      })
      .catch((error) => console.log("error", error));
  }};

  return (
    <div className="vendorFormContainer">
        <div className="serviceForm">
          <h2>Edit your business info</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="start time">start time</label>
        <select name="start" defaultValue={user?.start}>
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
        <select name="end" defaultValue={user?.end}>
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
        <h3 htmlFor="about your service">Description of Your Service</h3>
        <textarea maxLength="500" cols="30" rows="15" charswidth="23" name="svcdsc" id="svcdsc" defaultValue={user?.details?.svcdsc}/>
        <br />
        <label htmlFor="Accepted pet type">accepted pet type</label>
        <select name="petType" defaultValue={user?.details?.petType}>
          <option value="cats">cats</option>
          <option value="dogs">dogs</option>
          <option value="both">both</option>
        </select>
        <br />
        <div>
          <p>accepted pet size</p>
          {emptyAlertSize&&<p>please select at least one</p>}
          <label htmlFor="Accepted pet size">1-5kg</label>
          <input type="checkbox" name="xs" defaultChecked={user?.details.petSize.xs} /><span> </span>
          <label htmlFor="Accepted pet size">5-10kg</label>
          <input  type="checkbox" name="s" defaultChecked={user?.details.petSize.s}/><span> </span>
          <label htmlFor="Accepted pet size" >10-20kg</label>
          <input type="checkbox" name="m" defaultChecked={user?.details.petSize.m} /><span> </span>
          <label htmlFor="Accepted pet size" >20-40kg</label>
          <input type="checkbox" name="l" defaultChecked={user?.details.petSize.l}/><span> </span>
          <label htmlFor="Accepted pet size">over 40kg</label>
          <input type="checkbox" name="xl" defaultChecked={user?.details.petSize.xl}/><span> </span>
          <br />
        </div>
        <div>
          <p>operation area</p>
          {emptyAlertArea&&<p>please select at least one</p>}
          <label htmlFor="operation area">north</label>
          <input type="checkbox" name="north" defaultChecked={user?.details.area.north}/>
          <label htmlFor="operation area">south</label>
          <input type="checkbox" name="south" defaultChecked={user?.details.area.south}/>
          <label htmlFor="operation area">west</label>
          <input type="checkbox" name="west" defaultChecked={user?.details.area.west}/>
          <label htmlFor="operation area">east</label>
          <input type="checkbox" name="east" defaultChecked={user?.details.area.east}/>
          <br />
        </div>
        <button>submit</button>
        <p onClick={() => toggleForm(arg)} className="edit"> cancel</p>
      </form>
      
      </div>
    </div>
  );
}

export default EditVendorBusiness;
