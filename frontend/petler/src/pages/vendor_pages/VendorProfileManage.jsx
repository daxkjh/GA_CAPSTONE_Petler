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
  // const [user, setVendor] = useState();
  const [PWChange, setPWChange] = useState(false);
  const [serviceSetting, setServiceSetting] = useState(false);
  const [value, onChange] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  console.log('USER', user)
  const navigate = useNavigate();

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

useEffect(()=> {
  axios.get(`/api/booking/${user?.id}`)
  .then((res) => {console.log(res.data)
    setBookings(res?.data)})
  .catch(error => console.log("error", error));
  setRefresh(prev=>!prev);
  }, [])


  return (
    <div className="v_profile_container">
      <div className='c-left'>
      <div className="vendorinfo">
        <div className="v-left">
        <img src={user?.profilePic}
        width={"200px"}></img>
        </div>
        <div className='v-right'>
          <div>
        <h3>{user?.name}</h3>
        <p className='edit'> edit </p>
        </div>
        <p> service type: {user?.type}</p>
        <div>
        <p> {user?.address} </p>
        <p> {user?.phone} </p>
        <p className='edit'> edit </p>
        </div>
        <p className="edit" onClick={()=> setPWChange(true)}> change password</p>
        </div>
      </div>
      <div className="managebiz">
        <h3>manage business information</h3>
        <p>operation hours</p>
        <p>{user?.start}~{user?.end}</p>
        <p className='edit'> edit </p>
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
        <p className='edit'> edit </p>
        <p>areas:</p>
        <p>services:</p>
        {user?.services?.map((ele, index) => 
        <div key={index}>
        <p >{ele?.title}</p>
        <p>${ele?.price}</p>
        </div>
        )}
        <p className='edit'
        onClick={()=>setServiceSetting(true)}>edit services</p>
      </div>
      </div>
        <div className='c-right'>
          <h2>manage your bookings  </h2>
        <Calendar 
        className="react-calendar"
        onChange={onChange} value={value} 
        onClickDay={(day) => console.log(day) }/>
        <h2>your bookings</h2>
        {bookings?.data?.length > 1 ? bookings?.data?.map((booking, index)=> 
        <BookingCardVendor key={index} vendor={user} booking={booking} />
        ) 
        : <p>no bookings yet</p>} 
        <p className='edit'> view past bookings</p>
        </div>
      {PWChange ? <EditVendorPasswordForm PWChange={PWChange} setPWChange={setPWChange} /> : null}
      {serviceSetting ? <ServicesForm setServiceSetting={setServiceSetting} /> : null }
      <StyledDropzone/>
    </div>
  )



  // return (
  //   <div className="v_profile_container">
  //     <div className='c-left'>
  //     <div className="vendorinfo">
  //       <div className="v-left">
  //       <img src={vendor?.data?.profilePic}
  //       width={"200px"}></img>
  //       </div>
  //       <div className='v-right'>
  //         <div>
  //       <h3>{vendor?.data?.name}</h3>
  //       <p className='edit'> edit </p>
  //       </div>
  //       <p> service type: {user?.type}</p>
  //       <div>
  //       <p> {vendor?.data?.address} </p>
  //       <p> {vendor?.data?.phone} </p>
  //       <p className='edit'> edit </p>
  //       </div>
  //       <p className="edit" onClick={()=> setPWChange(true)}> change password</p>
  //       </div>
  //     </div>
  //     <div className="managebiz">
  //       <h3>manage business information</h3>
  //       <p>operation hours</p>
  //       <p>{vendor?.data?.start}~{vendor?.data?.end}</p>
  //       <p className='edit'> edit </p>
  //       <p>pet type: {vendor?.data?.details?.petType}</p>
  //       <ul className='petsize'> accepted pet size: <br />
  //         <li className='petsize'>
  //           1-5kg: {vendor?.data?.details?.petSize?.xs}
  //         </li >
  //         <li className='petsize'>
  //           5-10kg: {vendor?.data?.details?.petSize?.s}
  //         </li>
  //         <li className='petsize'>
  //           10-20kg:  {vendor?.data?.details?.petSize?.m}
  //         </li>
  //         <li className='petsize'>
  //           20-40kg: {vendor?.data?.details?.petSize?.l}
  //         </li>
  //         <li className='petsize'>
  //           over 40kg: {vendor?.data?.details?.petSize?.xl}
  //         </li>
  //       </ul>
  //       <p className='edit'> edit </p>
  //       <p>areas:</p>
  //       <p>services:</p>
  //       {vendor?.data?.services?.map((ele, index) => 
  //       <div key={index}>
  //       <p >{ele?.title}</p>
  //       <p>${ele?.price}</p>
  //       </div>
  //       )}
  //       <p className='edit'
  //       onClick={()=>setServiceSetting(true)}>edit services</p>
  //     </div>
  //     </div>
  //       <div className='c-right'>
  //         <h2>manage your bookings  </h2>
  //       <Calendar 
  //       className="react-calendar"
  //       onChange={onChange} value={value} 
  //       onClickDay={(day) => console.log(day) }/>
  //       <h2>your bookings</h2>
  //       {bookings?.data?.length > 1 ? bookings?.data?.map((booking, index)=> 
  //       <BookingCardVendor key={index} vendor={vendor} booking={booking} />
  //       ) 
  //       : <p>no bookings yet</p>} 
  //       <p className='edit'> view past bookings</p>
  //       </div>
  //     {PWChange ? <EditVendorPasswordForm PWChange={PWChange} setPWChange={setPWChange} /> : null}
  //     {serviceSetting ? <ServicesForm setServiceSetting={setServiceSetting} /> : null }
  //     <StyledDropzone/>
  //   </div>
  // )
}


export default VendorProfileManage
