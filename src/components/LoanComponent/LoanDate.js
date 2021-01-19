import React, { useState } from "react";
import styles from "./LoanComponent.module.css";
import DatePicker from "react-datepicker";
import "../styles/datepicker.scss";

const LoanDate = ({ updateLoanDate }) => {

    const [date, setDate] = useState(null);

    const onDateChanged = date => {
        setDate(date);
        updateLoanDate(date);
/*        let dates = date.toLocaleDateString('ko-KR').replace(/\s/g,'').split('.');
        let dateStr = dates[0].toString() + (dates[1] <= 9 ? ("0" + dates[1].toString()) : dates[1].toString()) + (dates[2] <= 9 ? ("0" + dates[2].toString()) : dates[2].toString());
        console.log(`dateStr : ${dateStr}`);
        console.log(`date[0] : ${dates[0]}`);
        console.log(`date[1] : ${dates[1]}`);
        console.log(`date[2] : ${dates[2]}`);*/
    }

    return (
        <>
            <div className={styles.Loan_date_desc}>
                빌려준 날
            </div>
            <div className={styles.Loan_date}>
                <DatePicker selected={date} onChange={onDateChanged}/>
            </div>
        </>
    );
};

export default LoanDate;
