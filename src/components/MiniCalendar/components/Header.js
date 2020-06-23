import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { format } from "date-fns";
import Cleave from "cleave.js/react";

class Header extends React.Component{

    constructor (props) {
        super(props);
        this.checkDate = this.checkDate.bind(this);
        this.checkMonth = this.checkMonth.bind(this);
        this.checkYear = this.checkYear.bind(this);
    }

    checkDate(value){
        //console.log(event);
        if(value < 0 || value > 31 ||value.length > 2){
            this.props.updateDate(this.props.selectedDate);
        }
    }

    checkMonth(value){
        //console.log(parseInt(value));

        if(value > 0){

            if(value < 0 || value > 12 || value.length > 2){
                this.props.updateDate(this.props.selectedDate);
            }
            else{
                this.props.changeMonth(value - 1);
            }
        }

    }

    checkYear(value){
        //console.log(event);

        if(value > 0){
            if(value < 0 || value > 9999 || value.length > 4){
                this.props.updateDate(this.props.selectedDate);
            }
            else{
                this.props.changeYear(value - 1);
            }
        }
    }


    render(){
        console.log(this.props.selectedDate);
        return(
            <div className={"dateSelector"}>
                <Cleave
                    className="dateSelectorInput"
                    placeholder="yyyy-MM-dd"
                    options={{ date: true,
                        datePattern: ["Y", "m", "d"],
                        delimiter: '-'}}
                    onChange={this.handleShow}
                    value={format(this.props.selectedDate, "yyyy-MM-dd")}
                    onFocus={this.props.onShow}
                    onBlur={this.props.onHide}
                    id={this.props.className}
                />
                <div className="calendarIcon"
                     onClick={this.props.show ? this.props.onHide : this.props.onShow}>
                    <AiOutlineCalendar />
                </div>
            </div>
        )
    }
}

export default Header;