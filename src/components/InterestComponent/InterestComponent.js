import DatePicker from "react-datepicker";
import "../styles/datepicker.scss";
import useDateInput from '../../lib/useDateInput';
import useInput from '../../lib/useInput';
import styles from "./InterestComponent.module.css";
import * as calculateSum from "../../actions/calculateSumAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const InterestComponent = ({isMonthlyInterest, isMonthlyDelayInterest, isTrading, calculateSum}) => {
    const postFunc = date => {
        calculateSum.updateExpirationDate(date);
    };

    const [currentDate, , onDateChanged] = useDateInput(null, postFunc);

    const [interest, , onInterestChanged] = useInput(0, (value)=>{calculateSum.updateInterest(Number(value))});

    const [delayInterest, , onDelayInterestChanged] = useInput(0, (value)=>{calculateSum.updateDelayInterest(Number(value))});

    const onIsMonthlyInterestChanged = e => {
        const { value } = e.target;
        calculateSum.updateIsMonthlyInterest({ isMonthlyInterest: value === "true"});
    };

    const onIsTradingChanged = e => {
        const { value } = e.target;
        calculateSum.updateIsTrading({ isTrading: value === "true" });
    };

    const onIsMonthlyDelayInterestChanged = e => {
        const { value } = e.target;
        calculateSum.updateIsMonthlyDelayInterest({ isMonthlyDelayInterest: value === "true" });
    };

    const onKeyDown = (e) => {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode === 8)) {
            return false;
        }
    };

    return (
        <div className={styles.interest_state}>
            <form>
                이율
                <input type="radio" name="is_monthly_interest" value="false" checked={isMonthlyInterest === false} onChange={onIsMonthlyInterestChanged}/> 연
                <input type="radio" name="is_monthly_interest" value="true" checked={isMonthlyInterest === true} onChange={onIsMonthlyInterestChanged}/> 월
            </form>
            <input type="number" placeholder="ex) 7.7" min="0" onKeyDown={onKeyDown} value={interest} onChange={onInterestChanged}/>%
            <div>
                받기로 한 날
            </div>
            <div>
                <DatePicker selected={currentDate} onChange={onDateChanged} />
            </div>
            <div>
                <div>
                    연체 이율
                    <input type="radio" name="is_monthly_delay_interest" value="false" checked={isMonthlyDelayInterest === false}  onChange={onIsMonthlyDelayInterestChanged}/> 연
                    <input type="radio" name="is_monthly_delay_interest" value="true" checked={isMonthlyDelayInterest === true} onChange={onIsMonthlyDelayInterestChanged}/> 월
                </div>
                <input type="number" placeholder="0" min="0" onKeyDown={onKeyDown} value={delayInterest} onChange={onDelayInterestChanged}/>%
                <div>
                채권 종류
                    <input type="radio" name="is_trading" value="false" checked={isTrading === false} onChange={onIsTradingChanged}/> 민사채권
                    <input type="radio" name="is_trading" value="true" checked={isTrading === true}  onChange={onIsTradingChanged}/> 상사채권
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        isMonthlyInterest: state.isMonthlyInterest,
        isMonthlyDelayInterest: state.isMonthlyDelayInterest,
        isTrading: state.isTrading
    }),
    dispatch => ({
        calculateSum: bindActionCreators(calculateSum, dispatch)
    })
)(InterestComponent);
