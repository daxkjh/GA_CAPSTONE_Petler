import { useEffect,  useState} from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { userAtom, refreshAtom } from '../../App';
import EditVendorPasswordForm from '../../components/edit_vendor/EditVendorPasswordForm';
import { useAtom } from 'jotai';
import ServicesForm from '../../components/edit_vendor/ServicesForm';
import Calendar from 'react-calendar';
import '../../calendar.css';
import StyledDropzone from '../../components/uploader/StyledDropzone';



function VendorProfileManage() {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [vendor, setVendor] = useState();
  const [PWChange, setPWChange] = useState(false);
  const [serviceSetting, setServiceSetting] = useState(false);
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    pic: false,
    password: false,
    profile: false,
    
  });

  const toggleForm = (x) => {
    setFormState({
      ...formState,
      [x] : !formState[x],
    });
  };




  useEffect(()=> {// Uncomment Before Deployment
    // if (Object.keys(user).length<1) {
    //   navigate("/vendor/login")
    //   alert("Not Logged In")
    //  }
    // else{
    axios.get(`/api/vendor/profile/${user?.data?.vendorId}`)
    .then((res) => {setVendor(res?.data)
    console.log("RES :",res)
  console.log(user)})
    .catch(error => console.log("error", error));
    setRefresh(prev=>!prev);
/*}*/}, [])




  return (
    <div className="v_profile_container">
      <div className='c-left'>
      <div className="vendorinfo">
        <div className="v-left">
        <div onClick={()=>toggleForm("pic")} className='editbutton'><img src='https://i.imgur.com/horiynl.png'></img></div>
        <img src={vendor?.data?.profilePic}
        width={"200px"}></img>
        </div>
        <div className='v-right'>
        <h3>{vendor?.data?.name}</h3>
        <p> service type: {user?.type}</p>
        <p> {vendor?.data?.address} </p>
        <p> {vendor?.data?.phone} </p>
        <p className="pwchange" onClick={()=> setPWChange(true)}> change password</p>
        </div>
      </div>
      <div className="managebiz">
        <h3>manage business information</h3>
        <p>operation hours</p>
        <p>{vendor?.data?.start}~{vendor?.data?.end}</p>
        <p>pet type: {vendor?.data?.details?.petType}</p>
        <ul className='petsize'> accepted pet size: <br />
          <li className='petsize'>
            1-5kg: {vendor?.data?.details?.petSize?.xs}
          </li >
          <li className='petsize'>
            5-10kg: {vendor?.data?.details?.petSize?.s}
          </li>
          <li className='petsize'>
            10-20kg:  {vendor?.data?.details?.petSize?.m}
          </li>
          <li className='petsize'>
            20-40kg: {vendor?.data?.details?.petSize?.l}
          </li>
          <li className='petsize'>
            over 40kg: {vendor?.data?.details?.petSize?.xl}
          </li>
        </ul>
        <p>areas:</p>
        <p>services:</p>
        {vendor?.data?.services?.map((ele, index) => 
        <div key={index}>
        <p >{ele?.title}</p>
        <p>{ele?.price}</p>
        </div>
        )}
          
           
        <p className='edit'
        onClick={()=>setServiceSetting(true)}>edit services</p>
      </div>
      </div>
        <div className='c-right'>
        <Calendar 
        className="react-calendar"
        onChange={onChange} value={value} 
        onClickDay={(day) => console.log(day) }/>
        </div>
      {PWChange ? <EditVendorPasswordForm PWChange={PWChange} setPWChange={setPWChange} /> : null}
      {serviceSetting ? <ServicesForm /> : null }
      {formState.pic&&<StyledDropzone toggleForm={toggleForm} arg={"pic"}/>}
    </div>
  )
}


export default VendorProfileManage
