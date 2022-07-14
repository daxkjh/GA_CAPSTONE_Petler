import  Calendar from 'react-calendar'
import {isSameDay} from 'date-fns'
import { useState,useEffect } from 'react'
// import 'react-calendar/dist/Calendar.css';





const TestCalendar = ({days, handleDateClick})=>{
    const [value, setValue] = useState(new Date());
    const [datedDays, setDatedDays] = useState([])
  console.log("DAY",days)
   

 
  
  
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      if(days[0]){
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (days.find(dDate => isSameDay(dDate, date))) {
        return 'redColor';
      }}
    }
  }
  

    return(
        <>

<Calendar
          className="react-calendar"
          onChange={setValue} value={value}
          tileClassName={tileClassName}
          onClickDay={(day) => {
            handleDateClick(day);
            console.log(day)}}
          />

        </>
    )
}
export default TestCalendar
//({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null