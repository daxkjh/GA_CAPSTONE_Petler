import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../App';

function BookingCardVendor({ vendor, booking }) {
  const [user, setUser] = useAtom(userAtom);

  const date = new Date(booking?.startDateTime)
  const bookingDate = date.toLocaleDateString('en-SG',{year: "numeric", month:"long", day:"numeric", time:"numeric"})
  const time = new Date(booking?.startDateTime);
  const bookingTime = time.toLocaleTimeString('en-SG')
  console.log("hi")
  
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
        <p className='edit'> change status</p>
    </div>
  )
}

export default BookingCardVendor
