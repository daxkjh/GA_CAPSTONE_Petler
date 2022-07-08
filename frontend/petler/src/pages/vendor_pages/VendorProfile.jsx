import { useEffect} from 'react'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { use } from '../../../../../server/controllers/user_Controller';

function VendorProfile() {
  // const []

  useEffect(()=> {
    axios.get("/api/vendors/profile/:id")
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }, [])


  return (
    <div>
      This is a vendor profile page
    </div>
  )
}

export default VendorProfile
