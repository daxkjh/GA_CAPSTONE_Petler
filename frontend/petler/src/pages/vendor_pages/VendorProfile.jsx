import { useEffect} from 'react'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { useState } from 'react';
import { useAtom } from 'jotai'
import { userAtom } from '../../App'
import { loginAtom } from '../user_pages/User_Login';
import { useParams } from 'react-router-dom';


function VendorProfile() {
  const [user, setUser] = useAtom(userAtom);
  const [test, setTest] = useAtom(loginAtom);
  const [vendor, setVendor] = useState([]);

  const id = useParams();

  useEffect(()=> {
    axios.get(`/api/vendor/profile/${id}`)
    .then((response) => {setVendor(response)
    console.log("res",response)
  })
    .catch(error => console.log("error", error));
    setTest(prev=>!prev);
  }, [])
  
    console.log(vendor)

  return (
    <div className="v_profile_container">
      <div className="vendorinfo">
        <img src={vendor.profilePic} 
        width={"200px"}></img>
        <h3>{user.name}</h3>
        <p> service type: {user.type}</p>
        <p> {user.address} </p>
        <p> {user.phone} </p>
      </div>
      <div className="managebiz">
        <h3>manage business information</h3>
        <p>operation hours</p>
        <p>{user.start}~{user.end}</p>
      </div>
    </div>
  )
}

  // address: "19 emerard road"
  // bookings: []
  // details: []
  // end: "9"
  // id: 8
  // intro: null
  // name: "shibainu"
  // phone: "99998888"
  // posts: []
  // profilePic: "https://i.imgur.com/aeW3aDj.png%22"
  // reviews: []
  // services: []
  // start: "9"
  // type: "sitter"
  // vendorId: "e24d3b02-1d9e-4b7e-b13c-6c130481f727"

export default VendorProfile
