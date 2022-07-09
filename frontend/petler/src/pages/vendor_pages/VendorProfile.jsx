import { useEffect} from 'react'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { useState } from 'react';
import { vendorAtom } from '../../App'


function VendorProfile() {
 const [vendorData, setVendorData] = useState({});

  useEffect(()=> {
    axios.get("/api/vendors/profile/:id")
    .then(res => {
      setVendorData(res)
      console.log(vendorData)
    })
    .catch(error => console.log(error))
  }, [])


  return (
    <div>
      This is a vendor profile page
    </div>
  )
}

export default VendorProfile
