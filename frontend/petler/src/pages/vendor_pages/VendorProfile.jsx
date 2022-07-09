import { useEffect,  useState} from 'react'
import { useParams } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { userAtom, refreshAtom } from '../../App';
import EditVendorPasswordForm from '../../components/edit_vendor/EditVendorPasswordForm';
import { useAtom } from 'jotai';

function VendorProfile() {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom)
  const [vendor, setVendor] = useState();

  const id = useParams();

  useEffect(()=> {
    axios.get(`/api/vendor/profile/${id.id}`)
    .then((res) => setVendor(res.data))
    .catch(error => console.log("error", error));
    setRefresh(prev=>!prev);
  }, [])
   console.log("hey bitch", vendor)

  //  if (!vendor) {
  //   return <p>loading,,,</p>
  //  }
  //  else
  return (
    <div className="v_profile_container">
      <div className="vendorinfo">
        <img src={vendor?.data?.profilePic}
        width={"200px"}></img>
        <h3>{vendor?.data.name}</h3>
        <p> service type: {user.type}</p>
        <p> {vendor?.data.address} </p>
        <p> {vendor?.data.phone} </p>
      </div>
      <div className="managebiz">
        <h3>manage business information</h3>
        <p>operation hours</p>
        <p>{vendor?.data.start}~{vendor?.data.end}</p>
      </div>
      <EditVendorPasswordForm/>
    </div>
  )
}


export default VendorProfile
