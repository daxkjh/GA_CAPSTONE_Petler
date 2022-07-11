import { useState } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";

const BookingForm = ({ vendor }) => {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [dataRange, setDateRange] = useState("date");
  const [sameDay, setSameDay] = useState();
  const [startRange, setStartRange] = useState();
  const [endRange, setEndRange] = useState();
  const [bookingInfo, setBookingInfo] = useState({});

  const handleSameDay = (e) => {
        setSameDay(e.target.value);
        console.log("startdate",e.target.value);
  }

  const handleStartRange = (e) => {
    setStartRange(e.target.value);
    // console.log("startdate",e.target.value);
}

const handleEndRange = (e) => {
    setEndRange(e.target.value);
    console.log("endate",e.target.value);
}
console.log("いまの ",user?.data)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataRange === "date") {
        setBookingInfo({
            profileId: vendor?.data?.id,
            userProfileId: user?.data?.profile?.id,
            servicesId: "aa",
            startDateTime: sameDay+"T00:00:00.000Z",
            endDateTime: sameDay+"T00:00:00.000Z",
        });
    } else {
        setBookingInfo({          
            profileId: vendor?.data?.id,
            userProfileId: user?.data?.profile?.id,
            servicesId: "a",
            startDateTime: startRange+"T00:00:00.000Z",
            endDateTime: endRange+"T00:00:00.000Z",})
    }
    // axios
    //   .post("/api/booking", bookingInfo)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
    console.log(bookingInfo);
    setRefresh(!refresh);
  };

  return (
    <div className="bookingFormContainer">
      <div className="bookingFormActual">
      date<input type="radio" name="daterange" onClick={()=>setDateRange("date")}></input>
      range<input type="radio" name="daterange" onClick={()=>setDateRange("range")}></input>
        <div className="dateForm">

        <form onSubmit={handleSubmit}>
          <label htmlFor="choose service">choose service</label>
          <br />
          <select name="service">
            {vendor?.data?.services.map((s, index) => (
              <option key={index}>{s.title}</option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="choose date">choose date</label>
          <br />
          <input
            onChange={handleSameDay}
            value={sameDay}
            type="date"
            id="date"
            name="date"
          ></input>
          <input type="time" ></input>
          <br />
          <br />
          <button>book</button>
        </form>
        </div>
        <div className="rangeForm">

        <form onSubmit={handleSubmit}>
        <label htmlFor="choose service">choose service</label>
          <br />
          <select name="service">
            {vendor?.data?.services.map((s, index) => (
              <option key={index} name={s.id}>{s.title}</option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="start date">start date</label>
          <br />
          <input
            onChange={handleStartRange}
            value={startRange}
            type="date"
            id="startdate"
            name="startdate"
          ></input>
          <br />
        <label htmlFor="end date">end date</label>
          <br />
          <input
            onChange={handleEndRange}
            value={endRange}
            type="date"
            id="enddate"
            name="enddate"
          ></input>
          <br /><br />
          <button>book</button>
        </form>
        </div>
          
      </div>
    </div>
  );
};
export default BookingForm;
