import React from "react";
import { addMonths, addYears, setMonth,
    setYear, subMonths, subYears} from "date-fns";
import DateSelector from "components/MiniCalendar/components/DateSelector";
import Header from "components/MiniCalendar/components/Header";

class MiniCalendar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedDate: this.props.selectedDate,
            show: false
        };

        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);

        this.switchDates = this.switchDates.bind(this);
        this.switchYears = this.switchYears.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.updateDate = this.updateDate.bind(this);
    }

    handleClose() {
        //console.log("hide");
        this.setState({ show: false });
    }

    handleShow() {
        //console.log("show");
        this.setState({ show: true });
    }

    changeYear(arg){
        //console.log(arg);
        this.setState({selectedDate: setYear(this.state.selectedDate, arg)});

    }

    changeMonth(arg){
        //console.log("here3");
        this.setState({selectedDate: setMonth(this.state.selectedDate, arg)});

    }

    switchDates(arg){
        if (arg === "Previous") {
            this.setState({selectedDate: subMonths(this.state.selectedDate, 1)});
        } else {
            this.setState({selectedDate: addMonths(this.state.selectedDate, 1)});
        }
    }

    switchYears(arg){
        if (arg === "Previous") {
            this.setState({selectedDate: subYears(this.state.selectedDate, 1)});
        } else {
            this.setState({selectedDate: addYears(this.state.selectedDate, 1)});
        }
    }

    updateDate(arg){
        //console.log("here");
        this.setState({selectedDate: arg})
    }

    render() {


        return (
            <div>
                <Header selectedDate={this.state.selectedDate} changeMonth={this.changeMonth}
                        changeYear={this.changeYear} show={this.state.show}
                        onHide={this.handleClose} onShow={this.handleShow}
                        updateDate = {this.updateDate} className={this.props.className}/>
                <DateSelector selectedDate={this.state.selectedDate} changeMonth={this.changeMonth}
                          switchDates = {this.switchDates} switchYears = {this.switchYears}
                          show={this.state.show} onHide={this.handleClose}
                          updateDate = {this.updateDate}/>
            </div>
        )
    }
}

export default MiniCalendar;