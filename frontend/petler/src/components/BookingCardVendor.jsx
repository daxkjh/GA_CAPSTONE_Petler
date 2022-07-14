import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function BookingCardVendor({ booking, fetchData }) {
  const [user, setUser] = useAtom(userAtom);
  const [editBooking, setEditBooking] = useState(false);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [status, setStatus] = useState("")

  const date = new Date(booking?.startDateTime)
  const bookingDate = date.toLocaleDateString('en-SG',{year: "numeric", month:"long", day:"numeric", time:"numeric"})
  const time = new Date(booking?.startDateTime);
  const bookingTime = time.toLocaleTimeString('en-SG')

  const navigate = useNavigate();

  const EditBookingFrom = ({ booking }) => {
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
       console.log(status)
    axios.put(`${API_URL}/api/booking/${booking.id}`,
      { 
        status: status
      },
      { headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }})
    .then((res) => {
      setRefresh(!refresh)
      console.log("booking status",res);
      setEditBooking(false);
      fetchData();
    })
    .catch((error) => {
      alert(error)
      console.log(error)});
};

    return (
      <div className='bookingEdit'>
        <div className='bookingStatus' >
        <form onSubmit={handleSubmit}>
        <p>{booking?.services.title} </p>
        <p>{bookingDate} </p>
        <p>{bookingTime}</p>
        <br/>
        <p> booked by : {booking?.user.name} </p>
        <p> status: </p>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>select status</option>
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
          <option value="cancelled">cancelled</option>
        </select>
        <br />
        <button>apply</button>
        </form>
        </div>
        <p onClick={()=> setEditBooking(false)}
        className='edit'> cancel</p>
      </div>
    )
  }
  
  return (
    <div style={{backgroundColor: booking?.status==="cancelled" ? "peachpuff" : booking?.status==="pending"? "lightblue":"paleturquoise"}} className='BookingCardContainer'>
      {editBooking && <EditBookingFrom booking={booking} fetchData={fetchData}/> }
        <div className='bookingCardSec'>
        <p>{booking?.services.title} </p>
        <p>{bookingDate} </p>
        <p>{bookingTime}</p>
        </div>
        <br/>
        <div className='bookingCardSec'>
        <p> booked by : {booking?.user.name}</p>
        <p> status: {booking?.status} </p>
        </div>
        {(booking?.status!=="cancelled")&&<p onClick={()=>setEditBooking(true)}
        className='edit'> change status</p>}
        
    </div>
  )
}

export default BookingCardVendor
