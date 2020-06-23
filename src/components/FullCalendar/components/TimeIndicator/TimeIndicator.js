import React from "react";
import { startOfWeek, addDays, addHours, isSameHour, startOfDay, differenceInMinutes } from "date-fns";

class TimeIndicator extends React.Component{


    render(){

        //console.log(this.props);
        let today = new Date();
        let hours = this.props.hour;
        let days = this.props.day;
        let selectedDate = this.props.currentDate;

        function indicatorPosition(hour1, hour2){
            let minuteDifference = differenceInMinutes(hour2, hour1);
            return({
                marginTop: -4 + minuteDifference/60*49 +"px"
            })
        }

        if(this.props.mode === "Day"){
            //console.log(this.props);
            let startOfTheDay = startOfDay(selectedDate);
            if(hours >= 0){
                let hourOfTheDay = addHours(startOfTheDay, hours);
                if(isSameHour(hourOfTheDay, today)){
                    return(
                        <div style={indicatorPosition(hourOfTheDay, today)} className="timeIndicator">
                            <div className="ballEnd" />
                            <div className="lineEnd" />
                        </div>
                    )
                }
                else{
                    return null;
                }
            }
            else{
                return null;
            }
        }
        else if(this.props.mode === "Week"){
            let startOfTheWeek = startOfWeek(selectedDate);
            let startOfTheDay = addDays(startOfTheWeek, days);
            if(hours >= 0){
                let hourOfTheDay = addHours(startOfTheDay, hours);
                if(isSameHour(hourOfTheDay, today)){
                    return(
                        <div style={indicatorPosition(hourOfTheDay, today)} className="timeIndicator">
                            <div className="ballEnd" />
                            <div className="lineEnd" />
                        </div>
                    )
                }
                else{
                    return null;
                }
            }
            else{
                return null;
            }
        }
    }
}

export default TimeIndicator;