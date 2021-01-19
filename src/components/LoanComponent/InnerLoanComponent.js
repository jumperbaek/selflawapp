import styles from "./LoanComponent.module.css";
import LoanDate from "./LoanDate";
import LoanMoney from "./LoanMoney";
import React from "react";
import * as calculateSum from "../../actions/calculateSumAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const InnerLoanComponent = ( { id, canDelete, onClickDelete, calculateSum }) => {

    const updateLoanDate = (date) => {
        calculateSum.updateLoanDate({ id: id, date: date });
    };

    const onChangeMoney = e => {
        const { value } = e.target;
        calculateSum.updateLoanMoney({ id: id, money: Number(value) });
    };

    if (canDelete) {
        return (
            <div className={styles.Loan_state}>
                <button className={ styles.delete_button } onClick={ onClickDelete }>X</button>
                <LoanDate updateLoanDate={updateLoanDate} />
                <LoanMoney onChange={onChangeMoney} />
            </div>
        );
    }
    else {
        return (
            <div className={styles.Loan_state}>
                <LoanDate updateLoanDate={updateLoanDate} />
                <LoanMoney onChange={onChangeMoney} />
            </div>
        );
    }
};

export default connect(
    null,
    dispatch => ({
        calculateSum: bindActionCreators(calculateSum, dispatch)
    })
)(InnerLoanComponent);

//export default InnerLoanComponent;
