import { useState } from "react";
import axios from "axios";
import { atom, useAtom, Provider } from "jotai";
import { userAtom, refreshAtom } from "../../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BookingForm = ({ vendor }) => {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [dateOrRange, setDateRange] = useState(false);
  const Today = new Date();
  const [sameDay, setSameDay] = useState(Today);
  const [startRange, setStartRange] = useState(Today);
  const [endRange, setEndRange] = useState();
  const [bookingInfo, setBookingInfo] = useState({});

  const handleSelect = (e) => {
    if (e.target.value !== "select"){
      const serviceId = parseInt(e.target.value)
    axios.get(`/api/vendor/services/${serviceId}`)
    .then((res) => setDateRange(res.data.data.dayService))
    .catch((error) => console.log("error", error));
    }
  };


  const handleSubmit = (e) => {
    console.log(dateOrRange)
    e.preventDefault();
    // console.log("いまの ",e.target.elements.time.value)
    if (dateOrRange) {
      setBookingInfo({
        profileId: vendor?.data?.id,
        userProfileId: user?.data?.profile?.id,
        servicesId: parseInt(e.target.elements.service.value),
        startDateTime: sameDay.toISOString(),
        endDateTime: sameDay.toISOString(),
      });
    } else {
      setBookingInfo({
        profileId: vendor?.data?.id,
        userProfileId: user?.data?.profile?.id,
        servicesId: parseInt(e.target.elements.service.value),
        startDateTime: startRange.toISOString(),
        endDateTime: endRange.toISOString(),
      });
    }
    axios
      .post("/api/booking", bookingInfo)
      .then((res) => console.log("this is the res", res))
      .catch((error) => console.log(error));
    console.log("aaaa", bookingInfo);
    setRefresh(!refresh);
  };

  return (
    <div className="bookingFormContainer">
      <div className="bookingFormActual">
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
              selected={sameDay}
              minDate={Today}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={60}
              onChange={(selectedDate) => {
                setSameDay(selectedDate || Today);
                // console.log(sameDay);
              }}
            /> : <> <DatePicker
            selected={startRange}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartRange(date)}
            selectsStart
            startDate={startRange}
            endDate={endRange}
          />
          <label htmlFor="end date">end date</label>
          <DatePicker
            selected={endRange}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setEndRange(date)}
            selectsEnd
            startDate={startRange}
            endDate={endRange}
            minDate={startRange}
          /> </> }
            <br />
            <br />
            <button>book</button>
          </form>
        </div>
        {/* <div className="rangeForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="choose service">choose service</label>
            <br />
            <select name="service">
              {vendor?.data?.services.map((s, index) => (
                <option key={index} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label htmlFor="start date">start date</label>

            <br />
            <DatePicker
              selected={startRange}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartRange(date)}
              selectsStart
              startDate={startRange}
              endDate={endRange}
            />
            <label htmlFor="end date">end date</label>
            <DatePicker
              selected={endRange}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setEndRange(date)}
              selectsEnd
              startDate={startRange}
              endDate={endRange}
              minDate={startRange}
            />
            <br />
            <br />
            <button>book</button>
          </form>
        </div> */}
      </div>
    </div>
  );
};
export default BookingForm;
