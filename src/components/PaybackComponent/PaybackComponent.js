import { useState } from 'react';
import styles from './PaybackComponent.module.css';
import InnerPaybackComponent from './InnerPaybackComponent';
import AddButton from '../AddButton';
import * as calculateSum from "../../actions/calculateSumAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const PaybackComponent = ({calculateSum}) => {
    const [countToAdd, setCountToAdd] =  useState(0);
    const onAddButtonClick = () => {
        setCountToAdd(countToAdd + 1);
    }

    const onClickDelete = (id) => {
        setCountToAdd(countToAdd > 1 ? countToAdd - 1 : 0);
        calculateSum.deletePayback(id);
    }

    const additionalPaybackComponents = [];

    for (let i = 0; i < countToAdd; ++i)
    {
        additionalPaybackComponents.push(<InnerPaybackComponent id={i+1} canDelete={ true } onClickDelete={ () => onClickDelete(i+1) } />);
    }

    return (
      <div className={styles.payback_component}>
          <InnerPaybackComponent id={0} canDelete={ false } onClickDelete={ null } />
          { additionalPaybackComponents }
          <AddButton onClick={ onAddButtonClick } text={ "받은 돈 추가하기" } />
      </div>
    );
};
export default connect(
    null,
    dispatch => ({
        calculateSum: bindActionCreators(calculateSum, dispatch)
    })
)(PaybackComponent);

