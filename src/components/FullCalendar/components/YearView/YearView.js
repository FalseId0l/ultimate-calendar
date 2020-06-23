import React from "react";
import MonthView from "components/FullCalendar/components/MonthView/MonthView";
import { addMonths, startOfYear, format } from "date-fns"
import { Col, Row } from "react-bootstrap";

class YearView extends React.Component {

    render() {

        const startOfTheYear = startOfYear(this.props.selectedDate);
        const allMonthsAndDays = [];
        for (let i = 0; i < 12; i++){
            let thisMonth = addMonths(startOfTheYear, i);
            allMonthsAndDays.push(
                <Col sm={6} key = {format(thisMonth, "MMMM")}>
                    <span>  {format(thisMonth, "MMMM")}
                        </span>
                    <MonthView currentDate={this.props.currentDate}
                                   selectedDate={thisMonth}/>
                </Col>
            )
        }
        return (
                <Row>
                    {allMonthsAndDays}
                </Row>
        );
    };
}

export default YearView;