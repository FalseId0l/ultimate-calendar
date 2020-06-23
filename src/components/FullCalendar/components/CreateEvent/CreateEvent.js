import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { format, startOfDay, addHours,
        startOfWeek, addDays, addMinutes } from "date-fns";
import MiniCalendar from "components/MiniCalendar/MiniCalendar";
import "assets/scss/MiniCalendar/MiniCalendar.scss";


class CreateEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            dateStart: this.props.hour,
            dateEnd: this.props.hour+1,
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.changeStartHour = this.changeStartHour.bind(this);
        this.changeEndHour = this.changeEndHour.bind(this);
        this.getEventData = this.getEventData.bind(this);

    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    changeStartHour(value) {
        this.setState({
            dateStart: value
        })
    }

    changeEndHour(value) {
        this.setState({
            dateEnd: value
        })
    }





    getEventData(val){
        //console.log(val.target.startDate.value);
        val.preventDefault();

        let startOfTheWeek = startOfWeek(this.props.selectedDate);
        let date = addDays(startOfTheWeek, this.props.day);

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function getHourDateFormat(val, date){
            //console.log(val);
            let time = val.split(" ")[0];
            let merediem = val.split(" ")[1];
            let hours = time.split(":")[0];
            let minutes = time.split(":")[1];
            if(merediem === "PM"){
                hours = parseInt(hours)+12;
            }

            //console.log(hours, minutes, merediem);
            let newDate = addHours(date, hours);
            newDate = addMinutes(newDate, parseInt(minutes));
            return newDate;
        }

        let data;

        if(this.props.view === "day"){
            data = {
                "summary": val.target.eventSummary.value,
                "description": val.target.eventDescription.value,
                "colorId": getRandomColor(),
                "start": {
                    "date": val.target.startDate.value,
                    "dateTime": getHourDateFormat(val.target.formBasicStartTime.value,
                        startOfDay(this.props.selectedDate)).toJSON(),
                    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                "end": {
                    "date": val.target.endDate.value,
                    "dateTime": getHourDateFormat(val.target.formBasicEndTime.value,
                        startOfDay(this.props.selectedDate)).toJSON(),
                    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            }
        }
        else{
            data = {
                "summary": val.target.eventSummary.value,
                "description": val.target.eventDescription.value,
                "colorId": getRandomColor(),
                "start": {
                    "date": val.target.startDate.value,
                    "dateTime": getHourDateFormat(val.target.formBasicStartTime.value, date).toJSON(),
                    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                "end": {
                    "date": val.target.endDate.value,
                    "dateTime": getHourDateFormat(val.target.formBasicEndTime.value, date).toJSON(),
                    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            }
        }

        console.log(data);
        this.props.updateData(data);
        this.handleClose();
    }

    render() {
        //console.log(this.props);
        let hourSelected = this.props.hour;
        let startOfTheDay = startOfDay(this.props.selectedDate);

        let hourList = [];
        for(let i = 0; i < 24; i++){
            hourList.push(format(addHours(startOfTheDay,i), "hh:mm a"));
        }


        return (
            <>
                <Button className="createEvent" variant="primary" onClick={this.handleShow}>
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="eventData" onSubmit={this.getEventData}>
                            <Form.Group controlId="eventSummary">
                                <Form.Label>Event Summary</Form.Label>
                                <Form.Control type="textarea" placeholder="Type Something..." />
                            </Form.Group>
                            <Form.Group controlId="eventDescription">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control type="textarea" placeholder="Type Something..." />
                            </Form.Group>
                            <Form.Group controlId="eventStartDate">
                                <Form.Label>Event Start Date</Form.Label>
                                <MiniCalendar className="startDate"
                                              selectedDate={ this.props.view === "day" ?
                                                  addDays(this.props.selectedDate, this.props.day) :
                                                  addDays(startOfWeek(this.props.selectedDate),
                                                  this.props.day)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicStartTime" autoComplete={"nope"}>
                                <Form.Label>Start Time</Form.Label>

                                <Form.Control type="textarea"
                                              defaultValue={format(addHours(startOfTheDay,hourSelected),
                                                  "hh:mm a")}
                                              placeholder="Enter Start Time" list="hours"
                                              autoComplete={"nope"}
                                              onChange={(event) => {
                                                  this.changeStartHour = event.target.value
                                              }}/>
                                <datalist id="hours" >
                                    {
                                        hourList.map((item, index) => {
                                            return(
                                                <option key={index} value={item}/>
                                            )
                                        })
                                    }
                                </datalist>
                            </Form.Group>
                            <Form.Group controlId="formBasicEndTime">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="textarea"
                                              defaultValue={format(addHours(startOfTheDay,hourSelected+1),
                                                  "hh:mm a")}
                                              placeholder="Enter End Time" list="hours"
                                              autoComplete={"nope"}
                                              onChange={(event) => {
                                                  this.changeEndHour = event.target.value
                                              }}/>
                                <datalist id="hours" >
                                    {
                                        hourList.map((item, index) => {
                                            return(
                                                <option key={index} value={item}/>
                                            )
                                        })
                                    }
                                </datalist>
                            </Form.Group>
                            <Form.Group controlId="eventEndDate">
                                <Form.Label>Event End Date</Form.Label>
                                <MiniCalendar className="endDate"
                                              selectedDate={ this.props.view === "day" ?
                                                  addDays(this.props.selectedDate, this.props.day) :
                                                  addDays(startOfWeek(this.props.selectedDate),
                                                      this.props.day)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCreatorUser">
                                <Form.Label>Creator</Form.Label>
                                <Form.Control type="textarea" placeholder="Creator Username" />
                            </Form.Group>
                            <Form.Group controlId="formBasicOrganizer">
                                <Form.Label>Organizer</Form.Label>
                                <Form.Control type="textarea" placeholder="Organizer Username" />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default CreateEvent;