import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../App';
import axios from 'axios';

function BookingHistory( { booking, fetchData } ) {
    const [user, setUser] = useAtom(userAtom);
    const [editBooking, setEditBooking] = useState(false);
    const [refresh, setRefresh] = useAtom(refreshAtom);
    const [status, setStatus] = useState("")
  
    const date = new Date(booking?.startDateTime)
    const bookingDate = date.toLocaleDateString('en-SG',{year: "numeric", month:"long", day:"numeric", time:"numeric"})
    const time = new Date(booking?.startDateTime);
    const bookingTime = time.toLocaleTimeString('en-SG')
  
    const EditBookingFrom = ({ booking, fetchData }) => {
      
    
      const handleSubmit = (event) => {
        event.preventDefault();
         console.log(status)
      axios.put(`/api/booking/${booking.id}`,
        { 
          status: status
        },
        {headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }})
      .then((res) => {
        setRefresh(!refresh)
        console.log("booking status",res);
        setEditBooking(false);
        fetchData();
      })
      .catch((error) => console.log(error));
  };
  console.log("boooooooking", booking)
      return (
        <div className='bookingEdit'>
          <div className='bookingStatus' >
          <form onSubmit={handleSubmit}>
          <p>{booking?.services.title} </p>
          <p>{bookingDate} </p>
          <p>{bookingTime}</p>
          <br/>
          <p> booked with : {booking?.profile.name}</p>
          <p> status: </p>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>select status</option>
            <option value="cancelled">cancel</option>
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
      <div className='BookingCardContainer'>
        {editBooking && <EditBookingFrom booking={booking} fetchData={fetchData}/> }
          <div className='bookingCardSec'>
          <p>{booking?.services.title} </p>
          <p>{bookingDate} </p>
          <p>{bookingTime}</p>
          </div>
          <br/>
          <div className='bookingCardSec'>
          <p> booked with : {booking?.profile.name}</p>
          <p> status: {booking?.status} </p>
          </div>
          <p onClick={()=>setEditBooking(true)}
          className='edit'> cancel this booking</p>
          
      </div>
    )
}
export default BookingHistory