import React, { useState } from "react";
import styles from "./LoanComponent.module.css";
import InnerLoanComponent from "./InnerLoanComponent";
import AddButton from '../AddButton';
import * as calculateSum from "../../actions/calculateSumAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const LoanComponent = ({calculateSum}) => {
    const [countToAdd, setCountToAdd] =  useState(0);
    const onAddButtonClick = () => {
        setCountToAdd(countToAdd + 1);
    }

    const onClickDelete = (id) => {
        setCountToAdd(countToAdd > 1 ? countToAdd - 1 : 0);
        calculateSum.deleteLoan(id);
    }

    const additionalLoanComponents = [];

    for (let i = 0; i < countToAdd; ++i) {
        additionalLoanComponents.push(<InnerLoanComponent id={i+1} canDelete={ true } onClickDelete={ ()=>onClickDelete(i+1) } />);
    }

    return (
        <div className={styles.Loan_state}>
            <InnerLoanComponent id={0} canDelete={ false } onClickDelete={ null } />
            { additionalLoanComponents }
            <AddButton onClick={ onAddButtonClick } text={ "빌려준 돈 추가하기" } />
        </div>
    );
};

export default connect(
    null,
    dispatch => ({
        calculateSum: bindActionCreators(calculateSum, dispatch)
    })
)(LoanComponent);
