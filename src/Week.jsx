import React from "react";
import Day from "./Day.jsx";

const Week = ({data, weekArray}) => {

    const sixDays=[]
    //function to create 6 days
    for (let date of weekArray){
        sixDays.push(<Day  date={date} events={data[date]} />)
        //console.log(data[date])
    }
    
    return (
        <div className='week flex'>
        {sixDays}
        </div>
    )
}
    
    export default Week