import styles from "./InnerPaybackComponent.module.css";
import DatePicker from "react-datepicker";
import "../styles/datepicker.scss";
import useDateInput from "../../lib/useDateInput";
import * as calculateSum from "../../actions/calculateSumAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const InnerPaybackComponent = ({id, canDelete, onClickDelete, calculateSum}) => {
    const postFunc = date => {
        calculateSum.updatePaybackDate({ id: id, date: date });
    };

    const [currentDate, , onDateChanged] = useDateInput(null, postFunc);

    const onChangeMoney = e => {
        const { value } = e.target;
        calculateSum.updatePaybackMoney({ id: id, money: Number(value) });
    };
    if (canDelete)
    {
        return (
            <div key={id} className={styles.payback_inner}>
                <button className={ styles.delete_button } onClick={ onClickDelete }>X</button>
                <div>받은 날</div>
                <div><DatePicker selected={currentDate} onChange={onDateChanged}/></div>
                <div>받은 돈</div>
                <input type="number" placeholder="ex) 10,000,00" min="0" onChange={onChangeMoney}/>원
            </div>
        );
    }
    else {
        return (
            <div key={id} className={styles.payback_inner}>
                받은 날
                <div><DatePicker selected={currentDate} onChange={onDateChanged}/></div>
                <div>받은 돈</div>
                <input type="number" placeholder="ex) 10,000,00" min="0" onChange={onChangeMoney}/>원
            </div>
        );
    }


};

export default connect(
    null,
    dispatch => ({
        calculateSum: bindActionCreators(calculateSum, dispatch)
    })
)(InnerPaybackComponent);
