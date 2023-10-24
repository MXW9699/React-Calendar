import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Calendar from './Calendar.jsx';

//URL for calendar data
const calendarURL = 'http://cohort-calendars.us-west-2.elasticbeanstalk.com/calendar/NYOI/8'

const App = () => {
  //set state variables for calendar data and a temp loaded state
  const [calendarData, setCalendarData] = useState({})
  const [load, setLoad] = useState(false)
  
  //re-render on calendar data fetch
  useEffect(()=>{
  //setup function: runs once when mounted then every other render
  fetch(calendarURL)
  //translates data to JS readable
  .then(res => res.json())
  //sets the calendar Data to the data: array of objects
  .then(data =>{setCalendarData(data)})

  //cleanup code to set the load state to be true after initial fetch:
  return()=>{
    setLoad(true)
  }
  //dependecies are calendarData
  },[calendarData])
  

  return(
    <div>
    <h1>calendar</h1>
    {/* if load is true show calendar/ if not show loading */}
     {(load) ? <Calendar data={calendarData}/> : <p>loading</p>}
    </div>
)
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
