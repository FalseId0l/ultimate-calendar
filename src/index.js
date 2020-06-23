import React from 'react';
import ReactDOM from 'react-dom';
//import MiniCalendar from "components/MiniCalendar/MiniCalendar";
import FullCalendar from "components/FullCalendar/FullCalendar";
//import "assets/scss/MiniCalendar.scss";
import "assets/scss/FullCalendar/FullCalendar.scss";
//import "assets/scss/MiniCalendar/MiniCalendar.scss";

function App() {

    //let date = new Date();

    return (
            //<MiniCalendar mode="datePicker" selectedDate={date}/>
            <FullCalendar />
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);