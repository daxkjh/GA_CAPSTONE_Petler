import { useEffect,  useState} from 'react'
import { useParams } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { userAtom, refreshAtom } from '../../App';
import EditVendorPasswordForm from '../../components/edit_vendor/EditVendorPasswordForm';
import { useAtom } from 'jotai';
import BookingForm from '../../components/user_components/BookingForm';

function User_BrowseVendorDetails () {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom)
  const [vendor, setVendor] = useState();
  const [PWChange, setPWChange] = useState(false);

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
        <p className="pwchange" onClick={()=> setPWChange(true)}> change password</p>
      </div>
      <div className="managebiz">
        <h3>business information</h3>
        <p>operation hours</p>
        <p>{vendor?.data.start}~{vendor?.data.end}</p>
        <p>pet type: {vendor?.data?.details.petType}</p>
        <ul className='petsize'> accepted pet size: <br />
          <li className='petsize'>
            1-5kg: {vendor?.data?.details.petSize.xs}
          </li >
          <li className='petsize'>
            5-10kg: {vendor?.data?.details.petSize.s}
          </li>
          <li className='petsize'>
            10-20kg:  {vendor?.data?.details.petSize.m}
          </li>
          <li className='petsize'>
            20-40kg: {vendor?.data?.details.petSize.l}
          </li>
          <li className='petsize'>
            over 40kg: {vendor?.data?.details.petSize.xl}
          </li>
        </ul>
        <p></p>
      </div>
      {PWChange ? <EditVendorPasswordForm PWChange={PWChange} setPWChange={setPWChange} /> : null}
      {<BookingForm/>}
      
    </div>
  )
}


export default User_BrowseVendorDetails 
