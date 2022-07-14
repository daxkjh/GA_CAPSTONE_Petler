import { useState, useEffect } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom, refreshAtom } from "../../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jwtDecode from "jwt-decode";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

const BookingForm = ({ vendor, setBookingForm }) => {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [dateOrRange, setDateRange] = useState(false); //set by handleSelect
  const Today = new Date();
  // console.log("VENDOR",vendor.data.id)
  // console.log("USER",user);
  function roundToHour(date) {
    const p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.ceil(date.getTime() / p) * p);
  }
  const [bookable, setBookable] = useState(false);
  const [sameDay, setSameDay] = useState(Today);
  const [startRange, setStartRange] = useState(Today);
  const [endRange, setEndRange] = useState();
  const [bookingInfo, setBookingInfo] = useState({
    servicesId: null,
    startDateTime: roundToHour(Today),
    endDateTime: roundToHour(Today),
  });

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     let decodedToken = jwtDecode(token);
  //     if (decodedToken.role === "user") {
  //       let check = 0;
  //       if (user) {
  //         console.log("VENDORRRRRR",vendor)
  //         console.log("USERRRRR",user);
  //         for (let i = 0; i< user.pets.length; i++) {
  //           if (vendor.details.petSize[user.pets[i].size]===true) {
  //             check += 1;
  //             console.log(check);
  //           }
  //         }
  //         if (check > 0) {
  //           setBookable(true);
  //         }
  //       }
  //     }
  //   }
  // }, [vendor]);

  const handleSelect = (e) => {
    // will set dateRange to true or false
    if (e.target.value !== "select") {
      const serviceId = parseInt(e.target.value);
      setBookingInfo({ ...bookingInfo, servicesId: serviceId });
      axios
        .get(`${API_URL}/api/vendor/services/${serviceId}`)
        .then((res) => setDateRange(res.data.data.dayService))
        .catch((error) => console.log("error", error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (token) {
      let decodedToken = jwtDecode(token);
      if (decodedToken.role !== "user") {
        alert("Log in to Start Booking!")
      }else {

          let petArr = user.pets
          let vendorPetSize = vendor.data.details.petSize
          let check = 0
          for(const ele of petArr){
            if(vendorPetSize[ele.size]===true){
              check+=1
              console.log(check)
            } 
          } if (check>0){
            postData()
          } else{
            alert("Your pet(s) do not conform to Vendor's Size limit")
          }
        }
      } else {
          alert("Login to Book!")
        }
      }

  const postData = ()=>{
      axios
        .post(
          `${API_URL}/api/booking`,
          {
            profileId: vendor?.data?.id,
            userProfileId: user?.id,
            servicesId: bookingInfo.servicesId,
            startDateTime: bookingInfo.startDateTime,
            endDateTime: bookingInfo.endDateTime,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          alert("Booking has been submitted, awaiting Vendor's confirmation!");
          setBookingForm(false);
          console.log("this is the res", res);
        })
        .catch((error) => {
          alert("Please Log in to book");
          console.log(error);
        });
      setRefresh(!refresh);
    
  };

  return (
    <div className="vendorFormContainer">
      <div className="serviceForm">
        <div className="dateForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="choose service">choose service</label>
            <br />
            <select onChange={handleSelect} name="service">
              <option value="select"> select service </option>
              {vendor?.data?.services.map((s, index) => (
                <option key={index} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label htmlFor="choose date">choose date</label>
            <br />
            { dateOrRange ? <DatePicker
              dateFormat="dd/MM/yyyy HH:mm"
              selected={bookingInfo.startDateTime || roundToHour(Today)}
              minDate={Today}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={60}
              onChange={(selectedDate) => {
                // setSameDay(selectedDate || Today);
                setBookingInfo({...bookingInfo, startDateTime : selectedDate, endDateTime : selectedDate})
                // console.log(sameDay);
              }}
            /> : <> 
            <DatePicker
            selected={bookingInfo.startDateTime}
            dateFormat="dd/MM/yyyy"
            minDate={Today}
            onChange={(date) => setBookingInfo({...bookingInfo, startDateTime: date})}
            selectsStart
            startDate={bookingInfo.startDateTime}
            // endDate={endRange}
          />
          <label htmlFor="end date">end date</label>
          <DatePicker
            selected={bookingInfo.endDateTime}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setBookingInfo({...bookingInfo, endDateTime: date})}
            selectsEnd
            startDate={bookingInfo.startDateTime}
            endDate={bookingInfo.endDateTime}
            minDate={bookingInfo.startDateTime}
          /> </> }
            <br />
            <br />
            <button>book</button>
            <p className="edit" onClick={()=>setBookingForm(false)}>cancel</p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BookingForm;
