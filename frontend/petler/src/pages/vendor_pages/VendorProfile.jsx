import { useEffect} from 'react'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { useState } from 'react';
import { userAtom } from '../../App';
import EditVendorPasswordForm from '../../components/edit_vendor/EditVendorPasswordForm';
import { useAtom } from 'jotai';


function VendorProfile() {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom)
  const [vendor, setVendor] = useState([]);

  const id = useParams();

  useEffect(()=> {
    axios.get(`/api/vendor/profile/${id}`)
    .then((response) => {setVendor(response)
    console.log("res",response)
  })
    .catch(error => console.log("error", error));
    setRefresh(prev=>!prev);
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
      <EditVendorPasswordForm/>
    </div>
  )
}


export default VendorProfile
