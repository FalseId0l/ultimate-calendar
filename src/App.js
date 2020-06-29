import React from 'react';
import MiniCalendar from "components/MiniCalendar/MiniCalendar";
import FullCalendar from "components/FullCalendar/FullCalendar";
//import "assets/scss/MiniCalendar.scss";
import "assets/scss/FullCalendar/FullCalendar.scss";
//import "assets/scss/MiniCalendar/MiniCalendar.scss";

import { Container, Row, Col } from "react-bootstrap";

class App extends React.Component {


    render(){

        return(
            <Container className="main-container">
                <Row>
                    <Col md={4}>
                        <MiniCalendar mode="datePicker" selectedDate={date}/>
                    </Col>
                    <Col md={8}>
                        <FullCalendar />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
