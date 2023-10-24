import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Calendar from './Calendar.jsx';




let calendarData = {}
const calendarURL = 'http://cohort-calendars.us-west-2.elasticbeanstalk.com/calendar/NYOI/8'
fetch(calendarURL)
.then(res => res.json())
.then(data =>{calendarData = data})
.then(() =>{

const App = () => {
  console.log('app loaded')
  console.log(Object.keys(calendarData))

  
  
  return(
    <div>
    <h1>calendar</h1>
    <Calendar data={calendarData} />
     </div>
)
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);})
