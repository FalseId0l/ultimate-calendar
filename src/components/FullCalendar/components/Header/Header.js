import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import format from "date-fns/format";
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";



class Header extends React.Component {


    render() {

        const month = this.props.selectedDate;
        //console.log(this.props);
        let monthVisible;

        switch(this.props.calendarMode) {
            case "Year":
                monthVisible = <span>{format(month, "yyyy")}</span>
                break;
            default:
                monthVisible = <div>
                    <span>{format(month, "MMMM")}</span>
                    {'  '}
                    <span>{format(month, "yyyy")}</span>
                </div>
                break;
        }

        return (
                <Navbar bg="light" onSelect={this.props.switchView}>
                    <Navbar.Brand>Ultimate Calendar
                        {' '}
                    </Navbar.Brand>
                    <MdChevronLeft onClick={() => this.props.handleUpdate("Previous")}/>
                    <MdChevronRight onClick={() => this.props.handleUpdate("Next")}/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav.Link eventKey="Today">Today</Nav.Link>
                    {monthVisible}
                    {'     '}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title={this.props.calendarMode} id="basic-nav-dropdown">
                                <NavDropdown.Item eventKey="Day">Day</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Week">Week</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Month">Month</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Year">Year</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>

        );
    };
}

export default Header;