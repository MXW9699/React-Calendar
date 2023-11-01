import React from "react";

//presentational component. no extra work to do
const CalEvent = ({event, startTime, endTime, z}) =>{

    return(
        <div className="event" id={event.id} style={{'gridRowStart':`${startTime-100}`, 'gridRowEnd':`${endTime-100}`, 'zIndex':z , 'width':`${(10-(z-1))*10}%`}}>  
        <p>{event.summary}</p>
        <p>{event.start.dateTime.slice(11,16)} - {(event.end.dateTime).slice(11,16)}</p>
        <p>Location: {event.location}</p>
        </div>
    )
}

export default CalEvent
