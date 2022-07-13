import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../App';

function BookingCardVendor({ booking }) {
  const [user, setUser] = useAtom(userAtom);
  const [editBooking, setEditBooking] = useState(false)

  const date = new Date(booking?.startDateTime)
  const bookingDate = date.toLocaleDateString('en-SG',{year: "numeric", month:"long", day:"numeric", time:"numeric"})
  const time = new Date(booking?.startDateTime);
  const bookingTime = time.toLocaleTimeString('en-SG')

  const EditBookingFrom = ({ booking }) => {
    return (
      <div className='vendorFormContainer'>
        <form>
        <div className='bookingEditForm'>
        <p>{booking?.services.title} </p>
        <p>{bookingDate} </p>
        <p>{bookingTime}</p>
        </div>
        <br/>
        <div className='bookingEditForm'>
        <p> booked by : {booking?.user.name}</p>
        <p> status: </p>
        </div>
        </form>
        <p onClick={()=> setEditBooking(false)}
        className='edit'> cancel</p>
      </div>
    )
  }
  
  return (
    <div className='BookingCardContainer'>
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
        <p
        className='edit'> change status</p>
        {/* {editBooking ? <EditBookingFrom booking={booking}/> : null} */}
    </div>
  )
}

export default BookingCardVendor
