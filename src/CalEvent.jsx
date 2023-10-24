import React from "react";


const CalEvent = ({event}) =>{
    
    return(
        <div className="event flex"> 
        <p>{event.summary}</p>
        <p>Location: {event.location}</p>
        </div>
    )
}

export default CalEvent
