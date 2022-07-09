import { useEffect} from 'react'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { useState } from 'react';
import { userAtom } from '../../App';
import EditVendorPasswordForm from '../../components/edit_vendor/EditVendorPasswordForm';
import { useAtom } from 'jotai';


function VendorProfile() {
  const [user, setUser] = useAtom(userAtom)
//  const [vendorData, setVendorData] = useState({});

  // useEffect(()=> {
  //   axios.get("/api/vendor/profile/:id")
  //   .then(res => {
  //     setVendorData(res)
  //     console.log(vendorData)
  //   })
  //   .catch(error => console.log(error))
  // }, [])


  return (
    <div>
      <h1>This is a vendor profile page</h1>
      <EditVendorPasswordForm/>
    </div>
  )
}

export default VendorProfile
