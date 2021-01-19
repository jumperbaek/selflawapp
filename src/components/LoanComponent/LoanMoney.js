import React from "react";
import styles from "./LoanComponent.module.css";

const LoanMoney = ({onChange}) => {

    const onKeyDown = (e) => {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode === 8)) {
            return false;
        }
        return true;
    };

    return (
        <>
            <div className={styles.Loan_money_desc}>
                빌려준 돈
            </div>
            <div className={styles.Loan_money}>
                <input type="number" onChange={onChange} placeholder="ex) 1,000,000" onKeyDown={ onKeyDown } min="0"/>원
            </div>
        </>
    );
};

export default LoanMoney;


