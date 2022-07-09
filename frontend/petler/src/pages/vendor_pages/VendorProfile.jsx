import { useEffect} from 'react'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { useState } from 'react';
import { useAtom } from 'jotai'
import { userAtom } from '../../App'


function VendorProfile() {
  const [user, setUser] = useAtom(userAtom)
  console.log(user)

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
      This is a vendor profile page
    </div>
  )
}

export default VendorProfile
