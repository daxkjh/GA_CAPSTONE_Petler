import { useEffect,  useState} from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { userAtom, refreshAtom } from '../../App';
import EditVendorPasswordForm from '../../components/edit_vendor/EditVendorPasswordForm';
import { useAtom } from 'jotai';
import  Calendar from 'react-calendar'
import '../../calendar.css'
import ServicesForm from '../../components/edit_vendor/ServicesForm';
import StyledDropzone from '../../components/uploader/StyledDropzone';
import BookingCardVendor from '../../components/BookingCardVendor';
import EditVendorBusiness from '../../components/edit_vendor/EditVendorBusiness';
import EdtitVendorInfo from '../../components/edit_vendor/EdtitVendorInfo';
import TestCalendar from '../../components/TestCalendar';
import ShowBooking from '../../components/ShowBooking';
import {isSameDay} from 'date-fns'

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function VendorProfileManage() {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [vendor, setVendor] = useState();
  const [PWChange, setPWChange] = useState(false);
  const [days, setDays ] = useState([])
  const [value, onChange] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [element, setElement] =useState("")
  const [history, setHistory]= useState(false)
  const [specificBooking, setSpecificBooking] = useState([])
  
  


  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    pic: false,
    password: false,
    profile: false,
    service: false,
    prof:false,
    buz: false,
    booking:false
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
    const res = await axios.get(`${API_URL}/api/booking/${user.id}`)
     setBookings(res.data)
     setDays(res.data.data.map((x)=>new Date(x.startDateTime)))
    //  setHistory(res.data.data.filter((x)=> new Date(x.startDateTime) < new Date()))
  }

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token){
   let decodedToken = jwtDecode(token)
    if (!decodedToken || decodedToken.role !== "vendor") {
      alert("Not Logged In As User")
     navigate("/vendor/login")
    } else{
      fetchData()
    }
  } else {
    alert("Not Logged In As Vendor")
     navigate("/home")
  }
},[])

 useEffect(()=> {
      if(user.id)
      fetchData()
}, [user.id])


const handleDateClick = (day) => {
  // const day = x;
  // const date = day.toISOString();
  // console.log(date)
  // axios.get(`${API_URL}/api/booking/calendar`)
  // .then((res) => {
  //   setBookings(res.data);
  // })
  // .catch((error) => console.log("error", error));
    if(days[0]){
     setSpecificBooking(days.filter(dDate => isSameDay(dDate, day)))
     toggleForm("booking")

    }
}



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
        <p>{user?.start}00H ~ {user?.end}00H </p>
        <p>pet type: {user?.details?.petType}</p>

        <ul className='petsize'> accepted pet size: <br />
          <li className='petsize'>
            { user?.details?.petSize?.xs && <img src="https://i.imgur.com/tgjlv34.png" width={"80px"} />}
          </li >
          <li className='petsize'>
          { user?.details?.petSize?.s && <img src="https://i.imgur.com/EIkUWtP.png" width={"80px"}/>}
          </li>
          <li className='petsize'>
          { user?.details?.petSize?.m && <img src="https://i.imgur.com/jCsCsy6.png" width={"80px"} /> }
          </li>
          <li className='petsize'>
          { user?.details?.petSize?.l && <img src="https://i.imgur.com/VGd3U5L.png" width={"80px"}/> }
          </li>
          <li className='petsize'>
          { user?.details?.petSize?.xl && <img src="https://i.imgur.com/JeZkKL6.png" width={"80px"}/>  }
          </li>
        </ul>
        <p>areas:</p>
        { user?.details?.area?.north && <span style={{margin:"0 5px 0 5px"}}>North</span> }
        { user?.details?.area?.south && <span style={{margin:"0 5px 0 5px"}}>South</span> }
        { user?.details?.area?.east && <span style={{margin:"0 5px 0 5px"}}>East</span> }
        { user?.details?.area?.west && <span style={{margin:"0 5px 0 5px"}}>West</span> }
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


        <div className='v-calendar'>  
          {/* <Calendar
          className="react-calendar"
          onChange={onChange} value={value}
          onClickDay={(day) => {
            handleDateClick(day);
            console.log(day)}}
          /> */}
        <TestCalendar days={days} handleDateClick={handleDateClick}/>
        {formState.booking&&<ShowBooking bookings={bookings?.data} specificBooking={specificBooking} days={days} toggleForm={toggleForm} arg={"booking"}/>}

      </div>


        <h2>Your Bookings</h2>
        {bookings?.data?.length > 0 ? bookings?.data?.filter((x)=> new Date(x.startDateTime) > new Date()).sort((a,b)=> new Date(a.startDateTime) - new Date(b.startDateTime)).map((booking, index) => 
         <BookingCardVendor key={index} booking={booking} fetchData={fetchData}/>
        ) 
        : <p>no bookings yet</p> } 
        <p onClick={()=>setHistory(!history)} className='edit'> view past bookings</p>
        {history? (bookings?.data?.length > 0 ? bookings?.data?.filter((x)=> new Date(x.startDateTime) < new Date()).sort((a,b)=> new Date(a.startDateTime) - new Date(b.startDateTime)).map((booking, index) => 
         <BookingCardVendor key={index} booking={booking} fetchData={fetchData}/>
        ) 
        : <p>no bookings yet</p> ):null}
        </div>
    </div>
    </>
  )



  }

export default VendorProfileManage
