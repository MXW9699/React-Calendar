import React, {useState, useEffect} from "react";
import Week from "./Week.jsx";

import { DAYS } from "./constants.js";


const Calendar = ({ data }) => {
    
    const [weekIndex, setWeekIndex] = useState(0);
    //split data into weeks
    let weekArray = [];

    let currentWeek=[]
    for (const keys in data){
        const date = new Date(keys)
        if (date.getDay() === 1) {
            weekArray.push(currentWeek)
            currentWeek = []
        }
        // console.log(DAYS[date.getDay()])
        currentWeek.push(keys)
    }
    weekArray.shift();

    return(
        <div>
            <div>
                <button onClick={() => setWeekIndex(w => Math.max(w-1, 0))}>&lt;</button>
                <button onClick={() => setWeekIndex(w => Math.min(w+1, weekArray.length-1))}>&gt;</button>
            </div>
            <div className="calendar">
                <Week  data={data} weekArray = {weekArray[weekIndex]}/>
            </div>
        </div>
        )
    }
    
    export default Calendar