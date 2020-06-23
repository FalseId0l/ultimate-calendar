import React from "react";
import { Table } from "react-bootstrap";
import {
    format, startOfMonth, startOfWeek,
    endOfMonth, subDays, addDays,
} from "date-fns";
import CalendarHeader from "components/MiniCalendar/components/DateSelectorHeader";

class DateSelector extends React.Component{

    constructor(props){
        super(props);

        this.setDate = this.setDate.bind(this);

    }

    setDate(selectedDate){
        //console.log(selectedDate);
        this.props.updateDate(selectedDate);
        this.props.onHide();
    }

    render(){

        let month = [];

        let showDate = this.props.selectedDate;


        //console.log(showDate);

        let startOfTheMonth = startOfMonth(showDate);
        let startOfTheWeek = startOfWeek(startOfTheMonth);
        let endOfTheMonth = endOfMonth(showDate);
        let backBy1Week = subDays(startOfTheWeek,7);
        while(backBy1Week < endOfTheMonth){
            let days = [];
            for(let i = 0; i < 7; i++){
                days.push(backBy1Week);
                backBy1Week = addDays(backBy1Week,1);
            }

            month.push(days);
        }

        if(this.props.show === false){
            return null;
        }
        else {
            return (
                <div className="calendarOpen">
                    <CalendarHeader selectedDate={showDate}
                                    switchDates={this.props.switchDates}
                                    changeMonth={this.props.changeMonth}
                                    switchYears={this.props.switchYears}
                                    show={this.props.show}
                                    onHide={this.handleClose}
                                    onShow={this.handleShow}
                    />
                    <Table>
                        <thead>
                        <tr>
                            {
                                month[0].map((item, index) => {
                                    return (
                                        <th key={index}>
                                            {
                                                format(item, "ccc")
                                            }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            month.map((item, index) => {
                                if (index !== 0) {
                                    return (
                                        <tr key={index}>
                                            {
                                                item.map((date, idx) => {
                                                    return (
                                                        <th key={idx} onClick={() => this.setDate(date)}>
                                                            {
                                                                format(date, "d")
                                                            }
                                                        </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}

export default DateSelector;