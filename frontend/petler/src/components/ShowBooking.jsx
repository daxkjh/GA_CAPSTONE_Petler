import { isSameDay } from "date-fns"

const ShowBooking = ({bookings,specificBooking,days,toggleForm,arg})=>{

    if(specificBooking[0]){
        console.log(days)
        console.log(specificBooking)
        console.log(bookings)
    return(
    <div className="vendorFormContainer">
        <button onClick={()=>toggleForm(arg)}>Close</button>
        <div>
        {/* <h1>{specificBooking[0].startDateTime.slice(0,10)}</h1> */}
        {bookings?.filter((x)=> isSameDay(new Date(x.startDateTime),specificBooking)).map((x)=>{
            <div >
                <h3>Service: {x.services.title}</h3>
                <h4>Status: {x.status}</h4>
                <h4>Booked By: {x.user.name}</h4>
            </div>
        })}
        </div>
    </div>
 )
}  }
export default ShowBooking