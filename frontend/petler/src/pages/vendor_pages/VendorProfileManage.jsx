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
import BookingCardVendor from '../../components/BookingCardVendor';

function VendorProfileManage() {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [vendor, setVendor] = useState();
  const [PWChange, setPWChange] = useState(false);
  const [serviceSetting, setServiceSetting] = useState(false);
  const [value, onChange] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  

  console.log('USER', user)
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    pic: false,
    password: false,
    profile: false,
    service: false,
    
  });

  const toggleForm = (x) => {
    setFormState({
      ...formState,
      [x] : !formState[x],
    });
  };

const fetchData = async ()=>{
    const res = await axios.get(`/api/booking/${user.id}`)
     setBookings(res.data)
    // const data = await res.json()
    console.log('BOOKINGS',res)
  }

 useEffect(()=> {// Uncomment Before Deployment
    // if (Object.keys(user).length<1) {
    //   navigate("/vendor/login")
    //   alert("Not Logged In")
    //  }
    // else{
      if(user.id)
      fetchData()
  //   axios.get(`/api/vendor/profile/${user?.vendorId}`)
  //   .then((res) => {setVendor(res?.data)
  //   console.log("RES :",res)
  // console.log(user)})
  //   .catch(error => console.log("error", error));
  //   setRefresh(prev=>!prev);
/*}*/}, [user.id])


//   useEffect(()=> {// Uncomment Before Deployment
//     // if (Object.keys(user).length<1) {
//     //   navigate("/vendor/login")
//     //   alert("Not Logged In")
//     //  }
//     // else{
//     axios.get(`/api/vendor/profile/${user?.data?.vendorId}`)
//     .then((res) => {
//       console.log(res)
//       setVendor(res?.data)})
//     .catch(error => console.log("error", error));
//     setRefresh(prev=>!prev);
// /*}*/}, [])

const arr = [{"BBB": "AAA"}, {"BBB": "AAA "}, {"BBB": "AAA"}]
const newArr = []

console.log("noooooooo", bookings?.data)
  return (
    <>
      {PWChange && <EditVendorPasswordForm PWChange={PWChange} setPWChange={setPWChange} />}
      {formState.service && <ServicesForm toggleForm={toggleForm} arg={"service"} /> }
      {formState.pic&&<StyledDropzone toggleForm={toggleForm} arg={"pic"}/>}
    <div className="v_profile_container">
      <div className='c-left'>
      <div className="vendorinfo">
        <div className="v-left">
        <div onClick={()=>toggleForm("pic")} className='editbutton'><img src='https://i.imgur.com/horiynl.png'></img></div>
        <img src={user?.profilePic} width={"200px"}/>
        </div>
        <div className='v-right'>
          <div>
        <h3>{user?.name}</h3>
        <p className='edit'> edit(not in function) </p>
        </div>
        <p> service type: {user?.type}</p>
        <div>
        <p> {user?.address} </p>
        <p> {user?.phone} </p>
        <p className='edit'> edit (not in function)</p>
        </div>
        <p className="edit" onClick={()=> {console.log(PWChange)
          setPWChange(true)}}> change password</p>
        </div>
      </div>
      <div className="managebiz">
        <h3>manage business information</h3>
        <p>operation hours</p>
        <p>{user?.start}~{user?.end}</p>
        <p className='edit'> edit (not in function)</p>
        <p>pet type: {user?.details?.petType}</p>
        <ul className='petsize'> accepted pet size: <br />
          <li className='petsize'>
            1-5kg: {user?.details?.petSize?.xs}
          </li >
          <li className='petsize'>
            5-10kg: {user?.details?.petSize?.s}
          </li>
          <li className='petsize'>
            10-20kg:  {user?.details?.petSize?.m}
          </li>
          <li className='petsize'>
            20-40kg: {user?.details?.petSize?.l}
          </li>
          <li className='petsize'>
            over 40kg: {user?.details?.petSize?.xl}
          </li>
        </ul>
        <p className='edit'> edit (not in function)</p>
        <p>areas:</p>
        <p>services:</p>
        {user?.services?.map((ele, index) => 
        <div key={index}>
        <p >{ele?.title}</p>
        <p>${ele?.price}</p>
        </div>
        )}
        <p className='edit'
        onClick={()=>toggleForm('service')}>edit services</p>
      </div>
      </div>
        <div className='c-right'>
          <h2>manage your bookings  </h2>
        <Calendar 
        className="react-calendar"
        onChange={onChange} value={value} 
        onClickDay={(day) => console.log(day) }/>
        <h2>your bookings</h2>
        {bookings?.data?.length > 0 ? bookings?.data?.map((booking, index) => 
         <BookingCardVendor key={index} booking={booking} />
        ) 
        : <p>no bookings yet</p> } 
        <p className='edit'> view past bookings (not in function)</p>
        </div>
    </div>
    </>
  )



  }

export default VendorProfileManage
