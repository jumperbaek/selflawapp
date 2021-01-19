import React, {useState} from 'react';
import LoanComponent from './components/LoanComponent';
import InterestComponent from './components/InterestComponent';
import PaybackComponent from './components/PaybackComponent';
import FormComponent from './components/FormComponent';
import './App.css';
import {connect} from "react-redux";
import preciseDiff from "moment-precise-range";
import moment from "moment";
import { get2Digit } from "./lib/commonUtils";
import styles from "./components/LoanComponent/LoanComponent.module.css";

const App = ( {loans, paybacks, interest, isMonthlyInterest, expirationDate,
                delayInterest, isMonthlyDelayInterest, isTrading, until} ) => {

    const [index, setIndex] = useState(0);

    const getYYYYMMDD = (date) => {
        const dates = date.toLocaleDateString('ko-KR').replace(/\s/g,'').split('.');
        return dates[0] + get2Digit(dates[1]) + get2Digit(dates[2]);
    };

    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysPerYear = 365;

    delayInterest = delayInterest === 0 ? (isTrading ? 6 : 5 ): delayInterest;

    const getInterest = (isMonthly, endDate, startDate, rate, money) => {
        if (endDate === null || startDate === null || money === null || rate === null)
            return 0;

        if (isMonthly) {
            const diff = preciseDiff(moment)(endDate, startDate, { returnObject: true });
            return Math.max((diff.months * rate + diff.days * rate / days[endDate.getMonth()]) * money, 0);
        }
        else {
            const end = moment(getYYYYMMDD(endDate), 'YYYYMMDD');
            const start = moment(getYYYYMMDD(startDate), 'YYYYMMDD');
            const diffDays = end.diff(start, 'days');
            return Math.max((rate * diffDays / daysPerYear)  * money, 0);
        }
    };

    const getLoanMoneyToRequest = (isMonthlyInterest, isMonthlyDelayInterest, loans, expirationDate, rate, delayRate) => {
        let sum = 0;

        if (expirationDate === null)
            return sum;
        if (moment(Date()).isBefore(moment(expirationDate)) || moment(Date()).isSame(moment(expirationDate))) {
            for (const key in loans) {
                if (loans[key].date === null || loans[key].money === null) {
                    continue;
                }

                sum += (loans[key].money + getInterest(isMonthlyInterest, new Date(), loans[key].date, rate, loans[key].money));
            }
        }
        else {
            for (const key in loans) {
                if (loans[key].date === null || loans[key].money === null) {
                    continue;
                }

                sum += (loans[key].money + getInterest(isMonthlyInterest, expirationDate, loans[key].date, rate, loans[key].money) + getInterest(isMonthlyDelayInterest, new Date(), expirationDate, delayRate, loans[key].money));
            }
        }
        return sum;
    };

    const getLoanMoneyToBePaid = (isMonthlyInterest, isMonthlyDelayInterest, paybacks, expirationDate, rate, delayRate) => {
        let sum = 0;

        if (expirationDate === null)
            return sum;
        if (moment(Date()).isBefore(moment(expirationDate)) || moment(Date()).isSame(moment(expirationDate))) {
            for (const key in paybacks) {
                if (paybacks[key].date === null || paybacks[key].money === null) {
                    continue;
                }

                sum += (paybacks[key].money + getInterest(isMonthlyInterest, new Date(), paybacks[key].date, rate, paybacks[key].money));
            }
        }
        else {
            for (const key in paybacks) {
                if (paybacks[key].date === null || paybacks[key].money === null) {
                    continue;
                }

                if (moment(paybacks[key].date).isBefore(moment(expirationDate)) || moment(paybacks[key].date).isSame(moment(expirationDate))) {
                    sum += (paybacks[key].money + getInterest(isMonthlyInterest, expirationDate, paybacks[key].date, rate, paybacks[key].money) + getInterest(isMonthlyDelayInterest, new Date(), expirationDate, delayRate, paybacks[key].money));
                }
                else {
                    sum += (paybacks[key].money + getInterest(isMonthlyDelayInterest, new Date(), paybacks[key].date, delayRate, paybacks[key].money));
                }
            }
        }
        return sum;
    };

    const getSum = () => {
        return getLoanMoneyToRequest(isMonthlyInterest, isMonthlyDelayInterest, loans, expirationDate, interest / 100.0, delayInterest / 100.0)
            - getLoanMoneyToBePaid(isMonthlyInterest, isMonthlyDelayInterest, paybacks, expirationDate, interest / 100.0, delayInterest / 100.0);
    };

    const sum = Math.round(getSum());

    const onClickNext = () => {
        setIndex((index + 1) % 5);
    };

    const onClickPrev = () => {
        setIndex((index - 1) % 5);
    };

    if (index === 0)
    {
        if (sum == 0) {
            return (
                <div className="App">
                    <LoanComponent />
                    <InterestComponent />
                    <PaybackComponent />
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <LoanComponent />
                    <InterestComponent />
                    <PaybackComponent />
                    <button className={ styles.form_button } onClick={ onClickNext }>지급 명령 신청서 출력</button>
                </div>
            );
        }
    }
    else
    {
        return (
            <div className="App">
                <FormComponent index={index} onClickNext={ onClickNext } onClickPrev={ onClickPrev } sum={sum} loans={loans} paybacks={paybacks} interest={interest}
                               isMonthlyInterest={isMonthlyInterest} expirationDate={expirationDate}
                               delayInterest={delayInterest} isMonthlyDelayInterest={isMonthlyDelayInterest}
                               isTrading={isTrading} until={until} />
            </div>
        );
    }
};

export default connect(
    state => ({
        loans : state.loans,
        paybacks : state.paybacks,
        interest : state.interest,
        isMonthlyInterest : state.isMonthlyInterest,
        expirationDate : state.expirationDate,
        delayInterest : state.delayInterest,
        isMonthlyDelayInterest : state.isMonthlyDelayInterest,
        isTrading : state.isTrading,
        until : state.until
    })
)(App);

