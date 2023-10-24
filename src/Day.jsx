import React from "react";
import CalEvent from "./CalEvent.jsx";

const Day= ({date, events}) =>{
//function to make multiple events
const calEventArray = []
for (let i=0; i<events.length;i++){
calEventArray.push(<CalEvent event = {events[i]}/>)
}

    return(
        <div className="day flex">
            <b>{date}</b>
            {calEventArray}
            {/* {bunch of events} */}
        </div>
    )


}

export default Day