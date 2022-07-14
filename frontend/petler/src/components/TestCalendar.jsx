import  Calendar from 'react-calendar'
import {isSameDay} from 'date-fns'
import { useState,useEffect } from 'react'






const TestCalendar = ({days})=>{
    const [value, setValue] = useState(new Date());
    const [datedDays, setDatedDays] = useState([])
  console.log("DAY",days)
   
  useEffect(()=>{
    if(days[0]){
      const datedDays = days.map((x)=>new Date(x.startDateTime))
      setDatedDays(datedDays)
    }

  },[days])
  //  const datesToAddClassTo = days?.data?.map((x)=> x.startDateTime)
 
  
  
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      if(days[0]){
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datedDays.find(dDate => isSameDay(dDate, date))) {
        return 'redColor';
      }}
    }
  }
  
  // if(Object.keys(days)>0){
  //   const x = days?.data?.map((x)=> new Date(x.startDateTime))
  //   console.log(x)

  // }
  
  // useEffect(()=>{

  //   },[days])

    return(
        <div className="vendorFormContainer">

<Calendar
          className="react-calendar"
          onChange={setValue} value={value}
          tileClassName={tileClassName}
        //   onClickDay={(day) => {
        //     handleDateClick(day);
        //     console.log(day)}}
          />

        </div>
    )
}
export default TestCalendar
//({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null