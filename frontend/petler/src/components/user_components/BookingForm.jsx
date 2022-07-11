import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";



const BookingForm = ()=>{
    const [user, setUser] = useAtom(userAtom)
    const [refresh, setRefresh] = useAtom(refreshAtom)


    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post("/api/booking",{
            
        })
        .then(res=>console.log(res))
        .catch(error => console.log(error))
    }

    return(
        <div className="bookingFormContainer">
            <div className="bookingFormActual">
                <form onSubmit={handleSubmit}>

                </form>
            </div>
        </div>
    )
}
export default BookingForm 