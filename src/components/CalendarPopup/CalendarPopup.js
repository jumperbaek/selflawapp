import React, { Component } from "react";
import ReactDOM from 'react-dom';
import styles from "./CalendarPopup.module.css";
import DatePicker from "react-datepicker";

class CalendarPopup extends Component {

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
            //this.props.popupCalendar.calendarPopupHide();
            this.props.onClickOutside();
        }
    }

    onDateChanged = date => {
        this.props.onClickOutside();
        this.props.onClickDate(date);
    }

    render() {
        return (
            <div className={styles.popup_inner}>
                <DatePicker selected={this.props.date} onChange={this.onDateChanged}/>
            </div>
        );
    }
}

export default CalendarPopup;
