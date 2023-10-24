import React, {useState, useEffect} from "react";
import Week from "./Week.jsx";

import { DAYS } from "./constants.js";


const Calendar = ({ data }) => {
    
    //state variable for button use: to change the week display
    const [weekIndex, setWeekIndex] = useState(1);
    
    //split data into weeks. weekArray will be an array of arrays
    let weekArray = [];
    let currentWeek=[]
    for (const keys in data){
        const date = new Date(keys)
        //check if monday: push the current week into the weekArray then make a new week
        if (date.getDay() === 1) {
            weekArray.push(currentWeek)
            currentWeek = []
        }
        //adding days to the currentweek
        currentWeek.push(keys)
    }
 
    return(
        <div className="flex" style={{'flexDirection':'column'}}> 
            <div>
                <button onClick={() => setWeekIndex(w => Math.max(w-1, 1))}>&lt; Prev Week</button>
                <button onClick={() => setWeekIndex(w => Math.min(w+1, weekArray.length-1))}>Next Week&gt;</button>
            </div>
            <div className="calendar">
                <Week  data={data} weekArray = {weekArray[weekIndex]}/>
            </div>
        </div>
        )
    }
    
    export default Calendar