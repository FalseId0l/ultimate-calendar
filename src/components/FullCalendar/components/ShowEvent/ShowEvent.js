import React from "react";
import { Modal, Button } from "react-bootstrap";
import {format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";


class ShowEvent extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        //console.log(this.props);
        return (
            <>
                <Button className="showEvent" style={this.props.buttonStyle} variant="primary"
                        onClick={this.handleShow}>
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.eventData.summary}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="showEventDescription">{this.props.eventData.description}</div>
                        <div className="showEventDuration">
                            <div className={"showEventDate"}>
                                Date
                                {format(parseISO(this.props.eventData.start.date), "ccc, MMM dd")}
                            </div>
                            <div className={"showEventTime"}>
                                <div className={"showEventStartTime"}>
                                    {format(utcToZonedTime(parseISO(this.props.eventData.start.dateTime),
                                        this.props.eventData.start.timeZone), "H:mm")}
                                </div>
                                <div className={"showEventEndTime"}>
                                    {format(utcToZonedTime(parseISO(this.props.eventData.end.dateTime),
                                        this.props.eventData.end.timeZone), "H:mm")}
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>
                            Reschedule
                        </Button>
                        <Button >Edit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ShowEvent;