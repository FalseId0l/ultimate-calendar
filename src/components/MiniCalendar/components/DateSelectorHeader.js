import React from "react";
import { format, startOfYear, addMonths } from "date-fns";
import { Nav, Navbar, NavDropdown} from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

class CalendarHeader extends React.Component{


    render() {

        let month = this.props.selectedDate;
        //console.log(this.props);
        let dropDownItems = [];

        let startOfTheYear = startOfYear(month);

        for(let i = 0; i < 12; i++){
            dropDownItems.push(startOfTheYear);
            startOfTheYear = addMonths(startOfTheYear,1);
        }

        let calendarTitle = format(month, "MMM yyyy");

        return (
            <Navbar bg="light" onSelect={this.props.changeMonth}>
                <div className="switchYearPrevious" onClick={() => this.props.switchYears("Previous")}>
                    <FiChevronsLeft />
                </div>
                <div className="switchMonthPrevious" onClick={() => this.props.switchDates("Previous")}>
                    <MdChevronLeft />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title={calendarTitle} id="basic-nav-dropdown">
                            {
                                dropDownItems.map((item, index) => {
                                    return(
                                        <NavDropdown.Item eventKey={index} key={index}>
                                            {
                                                format(item, "MMMM")
                                            }
                                        </NavDropdown.Item>
                                    )
                                })
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <div className="switchMonthNext" onClick={() => this.props.switchDates("Next")}>
                    <MdChevronRight />
                </div>
                <div className="switchYearNext" onClick={() => this.props.switchYears("Next")}>
                    <FiChevronsRight />
                </div>

            </Navbar>

        );
    };
}

export default CalendarHeader;