import React from "react";
import Header from "components/FullCalendar/components/Header/Header";
import DayView from "components/FullCalendar/components/DayView/DayView";
import WeekView from "components/FullCalendar/components/WeekView/WeekView";
import MonthView from "components/FullCalendar/components/MonthView/MonthView";
import YearView from "components/FullCalendar/components/YearView/YearView";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, addYears, subYears } from "date-fns";
import myEvents from "assets/events/test_events.json";

class FullCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.switchDates = this.switchDates.bind(this);
        this.switchView = this.switchView.bind(this);
        this.updateData = this.updateData.bind(this);
        this.selectedDayView = this.selectedDayView.bind(this)
        this.state = {
            currentDate: new Date(),
            selectedDate: new Date(),
            calendarMode: "Day",
            loadData: myEvents
        };
    }


    switchView(data){
        //console.log(data);
        if (data === "Today") {
            this.setState({
                selectedDate: this.state.currentDate
            })
        }
        else{
            this.setState({
                calendarMode: data
            });
        }
    }

    switchDates(arg) {
        if (this.state.calendarMode === "Week") {
            if (arg === "Previous") {
                this.setState({selectedDate: subWeeks(this.state.selectedDate, 1)});
            } else {
                this.setState({selectedDate: addWeeks(this.state.selectedDate, 1)});
            }
        } else if (this.state.calendarMode === "Day") {
            if (arg === "Previous") {
                this.setState({selectedDate: subDays(this.state.selectedDate, 1)});
            } else {
                this.setState({selectedDate: addDays(this.state.selectedDate, 1)});
            }
        } else if (this.state.calendarMode === "Month") {
            if (arg === "Previous") {
                this.setState({selectedDate: subMonths(this.state.selectedDate, 1)});
            } else {
                this.setState({selectedDate: addMonths(this.state.selectedDate, 1)});
            }
        } else if (this.state.calendarMode === "Year") {
            if (arg === "Previous") {
                this.setState({selectedDate: subYears(this.state.selectedDate, 1)});
            } else {
                this.setState({selectedDate: addYears(this.state.selectedDate, 1)});
            }
        }
    }

    updateData(arg){
        let fullData = []
        let newData = this.state.loadData;
        newData.forEach((item,index) => {
            fullData.push(item);
        })
        fullData.push(arg);
        this.setState({
            loadData: fullData
        });
    }

    selectedDayView(arg1){
        this.setState({
            calendarMode: "Day",
            selectedDate: arg1
        })
    }

    render() {

        let view;

        switch(this.state.calendarMode){
            case "Week": view = <WeekView currentDate = {this.state.currentDate}
                                          selectedDate = {this.state.selectedDate}
                                          loadData = {this.state.loadData}
                                          calendarMode = {this.state.calendarMode}
                                          updateData = {this.updateData}
                                          selectedDayView = {this.selectedDayView}/>
                break;
            case "Month": view = <MonthView currentDate = {this.state.currentDate}
                                            selectedDate = {this.state.selectedDate}
                                            loadData = {this.state.loadData} />
                break;
            case "Day": view = <DayView currentDate = {this.state.currentDate}
                                        selectedDate = {this.state.selectedDate}
                                        loadData = {this.state.loadData}
                                        calendarMode = {this.state.calendarMode}
                                        updateData = {this.updateData} />
                break;
            case "Year": view = <YearView currentDate = {this.state.currentDate}
                                          selectedDate = {this.state.selectedDate}
                                          loadData = {this.state.loadData} />
                break;
            default: view = <WeekView currentDate = {this.state.currentDate}
                                      selectedDate = {this.state.selectedDate}
                                      loadData = {this.state.loadData}
                                      calendarMode = {this.state.calendarMode}
                                      updateData = {this.updateData}
                                      selectedDayView = {this.selectedDayView}/>
        }

        return (
            <div>
                <Header handleUpdate = {this.switchDates}
                        selectedDate = {this.state.selectedDate}
                        switchView = {this.switchView}
                        calendarMode = {this.state.calendarMode}
                        setToday = {this.setToday}
                        loadData = {this.state.loadData}

                />
                {view}
            </div>
        );
    };
}

export default FullCalendar;