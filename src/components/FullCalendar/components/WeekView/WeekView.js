import React from "react";
import {
    startOfWeek, startOfDay, format, addDays, addHours, parseISO,
    isSameDay, differenceInMinutes, isSameHour, getMinutes } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Container, Row, Col, Table } from "react-bootstrap";

import CreateEvent from "../CreateEvent/CreateEvent";
import ShowEvent from "../ShowEvent/ShowEvent";
import TimeIndicator from "../TimeIndicator/TimeIndicator";

class WeekView extends React.Component {

    render() {
        let today = this.props.currentDate;
        const myEvents = this.props.loadData;
        const dateSelected = this.props.selectedDate;
        const startOfTheWeek = startOfWeek(dateSelected);
        const startOfTheDay = startOfDay(startOfTheWeek);

        let weekMatrix = [];

        //Week Matrix where Row 0 is the header of the Calendar
        //and Row 1 is the row containing all the events of the
        //respective days.
        //Rows 2 through 26 contain the events of hours 0-24.
        //Columns 1 through 8 contain the events of the 7-day
        //period.

        for(let i = 0; i < 26; i++){
            let dayMatrix = [];
            for(let j = 0; j < 8; j++){
                let currentDay = addDays(startOfTheDay,j-1);
                let currentHour = addHours(currentDay, i-2);
                if(i === 0 && j === 0){
                    //This is the empty spot on the Calendar
                    //on the Top-Left-most cell.
                    dayMatrix.push(currentDay);

                }
                else if(i === 0){
                    //Header values, which includes Days of
                    //the week.
                    dayMatrix.push(currentDay);
                }
                else if(i === 1){
                    if(j === 0){
                        //Setting the TimeZone value.
                        dayMatrix.push(dateSelected);
                    }
                    else{
                        //Adding all the all-day events for
                        //the selected days of the week.
                        dayMatrix.push(myEvents.filter((item) => {
                            if (item.start.dateTime === undefined) {
                                if (isSameDay(currentHour, parseISO(item.start.date))) {
                                    return {
                                        "event": item
                                    }
                                } else {
                                    return 0;
                                }
                            }
                            else{
                                return 0;
                            }
                        }));
                    }
                }
                else if(j === 0){
                    //Hour values of the calendar.
                    dayMatrix.push(currentHour);
                }
                else{
                    dayMatrix.push(myEvents.filter((item) => {
                        let eventStart = utcToZonedTime(parseISO(item.start.dateTime), item.start.timeZone);
                        //let eventEnd = utcToZonedTime(parseISO(item.end.dateTime), item.end.timeZone);
                        if (isSameHour(currentHour, eventStart))
                        {
                            return {
                                "event": item
                            }
                        } else {
                            return 0
                        }
                    }))
                }
            }
            weekMatrix.push(dayMatrix);
        }

        console.log(weekMatrix);

        function getEventColor(evt){
            return(evt.colorId);
        }

        function getEventDuration(evt){
            let eventStart = getEventStart(evt);
            let eventEnd = getEventEnd(evt);
            return(differenceInMinutes(eventEnd, eventStart));
        }

        function getEventStart(evt){
            return utcToZonedTime(parseISO(evt.start.dateTime), evt.start.timeZone);
        }

        function getEventEnd(evt){
            return utcToZonedTime(parseISO(evt.end.dateTime), evt.end.timeZone);
        }

        function getLongestEventDuration(evtList){

            let longestDuration = 0;
            let duration = [];

            duration.push(evtList.map(item => {
                return(getEventDuration(item))
            }));

            for(let i = 0; i < duration.length; i++){
                if (duration[i] > longestDuration){
                    longestDuration = duration;
                }
            }

            return longestDuration;

        }

        function getContainerStyle(evt){
            if(evt.length){
                //console.log(evt);
                return({height: getLongestEventDuration(evt)*49/60+"px"});
            }
            else{
                return({height: 0});
            }
        }

        function getRowStyle(evt){
            if(evt.length){
                //console.log(evt);
                return({height: getLongestEventDuration(evt)*49/60+"px"});
            }
            else{
                return({height: 0});
            }
        }

        function getColumnStyle(evt){
            let eventDuration = getEventDuration(evt);
            let eventColor = getEventColor(evt);
            return({height: eventDuration*49/60+"px",
                backgroundColor: eventColor,
            marginTop: getMinutes(getEventStart(evt))*49/60+"px"});
        }

        function getButtonStyle(evt){
            let eventDuration = getEventDuration(evt);
            return({height: eventDuration*49/60+"px"});
        }

        function setCurrentDay(item) {
            //console.log(item);
            if(isSameDay(today, item)){
                return {
                    textDecoration: "underline crimson",
                }
            }
            else{
                return{
                    textDecoration: "none"
                }
            }
        }
        return (
            <Table bordered className="weekViewTable">
                <thead>
                <tr>
                    {
                        weekMatrix[0].map((item, index) => {
                            //Header values, which includes Days of
                            //the week.
                            if (index===0){
                                return(
                                    <th className="firsColumn" key={index}>

                                    </th>
                                )
                            }
                            else{
                                return (
                                    <th style={setCurrentDay(item)} key={index}>
                                        {format((item), 'dd ccc')}
                                    </th>
                                )
                            }

                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    weekMatrix.map((hourAndEvents, i) => {
                        if(i!== 0){
                            return(
                                <tr  key={i}>
                                    {
                                        hourAndEvents.map((cellValue, j) => {
                                            if(i === 1){
                                                if(j === 0){
                                                    //Setting the TimeZone value.
                                                    return(
                                                        <td className="timeZone" key={j}>
                                                            <div className="timeZoneValue"  key={j}>
                                                                {format(dateSelected, 'OOOO')}
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <td key={j}>

                                                        </td>
                                                    )
                                                }

                                            }
                                            else if(j === 0){
                                                //Hour values of the calendar.
                                                return(
                                                    <td className="hours" key={j}>
                                                        <div key={j}>
                                                            {format(cellValue, 'H a')}
                                                        </div>
                                                    </td>
                                                )
                                            }
                                            else{
                                                //Adding all the all-day events for the selected
                                                //days of the week.
                                                //Short hand order is top, right, bottom and left.
                                                return(
                                                    <td className="eventData" key={j}>
                                                        <CreateEvent selectedDate={dateSelected} hour={i-2} day={j-1}
                                                                        updateData={this.props.updateData}
                                                                     view={"week"}/>
                                                        <TimeIndicator mode={this.props.calendarMode} hour={i-2}
                                                                       day={j-1}  currentDate={dateSelected}/>
                                                        <Container className="eventsContainer" key={j}
                                                                   style={getContainerStyle(cellValue)}>
                                                            <Row className="eventsRow " key={j}
                                                            style={getRowStyle(cellValue)}>
                                                                {
                                                                    cellValue.map((events, idx) => {
                                                                        return(
                                                                            <Col className="eventColumn" key={idx}
                                                                                 style={getColumnStyle(events)}>
                                                                                <ShowEvent
                                                                                    buttonStyle={getButtonStyle(events)}
                                                                                    eventData={events}/>
                                                                                <div className="eventSummary">
                                                                                    {events.summary}
                                                                                </div>
                                                                                <div className="eventTime">
                                                                                    {utcToZonedTime(parseISO(
                                                                                        events.start.dateTime),
                                                                                        events.start.timeZone)
                                                                                        .toString()}
                                                                                </div>
                                                                            </Col>
                                                                        )
                                                                    })
                                                                }
                                                            </Row>
                                                        </Container>
                                                    </td>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            )
                        }
                        else{
                            return null;
                        }
                    })
                }
                </tbody>
            </Table>
        );
    }
}

export default WeekView;