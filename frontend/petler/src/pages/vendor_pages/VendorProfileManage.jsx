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
import EditVendorBusiness from '../../components/edit_vendor/EditVendorBusiness';
import EdtitVendorInfo from '../../components/edit_vendor/EdtitVendorInfo';

function VendorProfileManage() {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [vendor, setVendor] = useState();
  const [PWChange, setPWChange] = useState(false);
  const [serviceSetting, setServiceSetting] = useState(false);
  const [value, onChange] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [element, setElement] =useState("")
  

  // console.log('USER', user)
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    pic: false,
    password: false,
    profile: false,
    service: false,
    prof:false,
    buz: false
  });

  const toggleForm = (x) => {
    setFormState({
      ...formState,
      [x] : !formState[x],
    });
    setElement(x)
    console.log(x)
  };

const fetchData = async ()=>{
    const res = await axios.get(`/api/booking/${user.id}`)
     setBookings(res.data)
    // const data = await res.json()
    // console.log('BOOKINGS',res)
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
console.log("kkkkkkk",user?.details?.petSize?.xs)
  return (
    <>
      {PWChange && <EditVendorPasswordForm PWChange={PWChange} setPWChange={setPWChange} />}
      {formState.service && <ServicesForm toggleForm={toggleForm} arg={"service"} /> }
      {formState.pic&&<StyledDropzone toggleForm={toggleForm} arg={"pic"}/>}
      {formState.prof&&<EdtitVendorInfo toggleForm={toggleForm} arg={"prof"} user={user} setRefresh={setRefresh} />}
      {formState.buz&&<EditVendorBusiness toggleForm={toggleForm} arg={"buz"} user={user} setRefresh={setRefresh}/>}
      
    <div className="v_profile_container">
      <div className='c-left'>
      <div className="vendorinfo">
        <div className="v-left">
        <div onClick={()=>toggleForm("pic")} className='editbutton'>
          <img src='https://i.imgur.com/horiynl.png'></img></div>
        <img src={user?.profilePic} width={"200px"}/>
        </div>
        <div className='v-right'>
        <div className='inline' >
        <h3>{user?.name}</h3>
        <p onClick={(e)=>{
          toggleForm("prof")
        }} 
        value="name"
        className='edit'> edit </p>
        </div>
        <div className='inline'>
        <p> service type: {user?.type}</p>
        </div>
        <div className='inline' >
        <p> {user?.address} </p>
        </div>
        
        <div className='inline' >
        <p> {user?.phone} </p>
        </div>

        <div className='inline' >
          <p>{user?.intro}</p>
        </div>
        
        <p className="edit" onClick={()=> {console.log(PWChange)
          setPWChange(true)}}> change password</p>
        </div>
      </div>

      <div className="managebiz">
        <div>
        <h3>manage business information</h3>
        <p onClick={()=>toggleForm("buz")} className='edit'> edit</p>
        </div>
        <div>
          <p>{user?.details?.svcdsc}</p>
        </div>
        <p>operation hours:</p>
        <p>{user?.start}~{user?.end}</p>
        <p>pet type: {user?.details?.petType}</p>

        <ul className='petsize'> accepted pet size: <br />
          <li className='petsize'>
            { user?.details?.petSize?.xs && <><p>1-5kg</p> <img src="https://i.imgur.com/tgjlv34.png" width={"80px"} /></>}
          </li >
          <li className='petsize'>
          { user?.details?.petSize?.xs && <><p>5-10kg</p> <img src="https://i.imgur.com/EIkUWtP.png" width={"80px"}/></> }
          </li>
          <li className='petsize'>
          { user?.details?.petSize?.xs && <> <p>10-20</p> <img src="https://i.imgur.com/jCsCsy6.png" width={"80px"} /></> }
          </li>
          <li className='petsize'>
          { user?.details?.petSize?.xs && <><p>20-40 </p><img src="https://i.imgur.com/VGd3U5L.png" width={"80px"}/> </>}
          </li>
          <li className='petsize'>
          { user?.details?.petSize?.xs && <>  <p>over 40kg</p><img src="https://i.imgur.com/JeZkKL6.png" width={"80px"}/> </> }
          </li>
        </ul>

        <p>areas:</p>
        { user?.details?.area?.north && <p>north</p> }
        { user?.details?.area?.south && <p>south</p> }
        { user?.details?.area?.east && <p>east</p> }
        { user?.details?.area?.west && <p>west</p> }
        <p>services:</p>
        {user?.services?.map((ele, index) => 
        <div className='inline' key={index}>
        <p className='serviceText'>{ele?.title}</p>
        <p className='serviceText'>${ele?.price}</p>
        </div>
        )}  
        <p className='edit'
        onClick={()=>toggleForm('service')}>add services</p>
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
         <BookingCardVendor key={index} booking={booking} fetchData={fetchData}/>
        ) 
        : <p>no bookings yet</p> } 
        <p className='edit'> view past bookings (not in function)</p>
        </div>
    </div>
    </>
  )



  }

export default VendorProfileManage
