import React from "react";
import CalEvent from "./CalEvent.jsx";

//@props {date} - string of date
//@props {events} - array of event objects
const Day= ({date, events}) =>{
    //things we need: z-index of event, start time, end time

function compareFn(a,b){
    const firstDate = new Date(a.start.dateTime)
    const secondDate = new Date(b.start.dateTime)
    if (firstDate<secondDate) return -1
    else if (firstDate>secondDate) return 1
    else return 0
}

events.sort(compareFn)

console.log(events)

    //array of CalEvents
    const calEventArray = []
    
    //array to keep track of zIndex of calendar events
    const timeSlots = []

    //function to make multiple events
for (let i=0; i<events.length;i++){
//converts the start and end time strings to an actual date and extract the hour
const eventStartTime = (new Date(events[i].start.dateTime)).getHours()*12 + Math.floor(((new Date(events[i].start.dateTime)).getMinutes()/60)*12)  
const eventEndTime = (new Date(events[i].end.dateTime)).getHours()*12 + Math.floor(((new Date(events[i].end.dateTime)).getMinutes()/60)*12)  

//populate the time slot array to get Zindex
let z = 1
for (let j= eventStartTime ; j < eventEndTime; j++){
    timeSlots[j] = (timeSlots[j] || 0) +1
    z = Math.max(z, timeSlots[j])
}
calEventArray.push(<CalEvent event = {events[i]} startTime={eventStartTime} endTime={eventEndTime} z={z}/>)
}

    return(
        <div className="day">
            <b style={{'border': '1px solid black', 'textAlign':'center'}}>{date}</b>
            {calEventArray}
            {/* {bunch of events} */}
        </div>
    )


}

export default Day