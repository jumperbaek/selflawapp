import styles from "./FormComponent.module.css";
import { get2Digit } from "../../lib/commonUtils";
import React from "react";

const FormComponent = ( {index, onClickNext, onClickPrev, sum, loans, paybacks, interest, isMonthlyInterest, expirationDate,
                       delayInterest, isMonthlyDelayInterest, isTrading, until} ) => {

    const getYYYYMMDDString = (date) => {
        const dates = date.toLocaleDateString('ko-KR').replace(/\s/g,'').split('.');
        return dates[0] + "년 " + get2Digit(dates[1]) +"월 " + get2Digit(dates[2]) + "일";
    };

    const getTotalSum = (transactions) => {
        let total = 0;
        for (const key in transactions) {
            total += transactions[key].money;
        }
        return total;
    }

    const getDetailString = (items) => {
        let details = ``, keyIndex = 0;
        let keyCount = Object.keys(items).length;
        for (let key in items) {
            if (items[key].date !== null && items[key].money != null) {
                details += `${getYYYYMMDDString(items[key].date)} ${items[key].money.toString()}원`;
                if (++keyIndex < keyCount) {
                    details += `, `;
                } else {
                    details += ` `;
                }
            }
        }

        return details;
    }

    const bondType = isTrading ? "상사" : "민사";
    const interestType = isMonthlyInterest ? "연" : "월";
    const delayInterestType = isMonthlyDelayInterest ? "연" : "월";
    const conjunction = (Object.keys(paybacks).length !== 0 && paybacks["0"] !== undefined && paybacks["0"].money > 0) ? "을 부담하였고," : "을 부담하였으므로,";
    const lastConjunction = (Object.keys(paybacks).length > 0) ? "을 변제하였으므로," : "";

    if (index === 1) {
        const title = "지 급 명 령 신 청 서";
        return (
            <>
                <div className={styles.form_component}>
                    {title}
                </div>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <div>채권자 김</div>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <div>채무자 신</div>
                <span><br/></span>
                <span><br/></span>
                <button onClick={ onClickNext }>다음</button>
            </>
        );
    }
    else if ( index === 2) {
        return (
            <>
                <div className={styles.form_component}>
                    <span>서 울 중 앙 지 방 법 원 귀 중<br/></span>
                    <span>지 급 명 령 신 청<br/></span>
                </div>
                <span><br/></span>
                <span><br/></span>
                <span>채권자 김<br/></span>
                <span>서울 강남구 학동로OO길 OO, 1층 (OO동, OO빌딩)<br/></span>
                <span><br/></span>
                <span>채권자의 대리인 법무법인 한경<br/></span>
                <span>서울 서초구 서초중앙로123 (서초동, 삼남타워)<br/></span>
                <span>담당변호사 김 경 보<br/></span>
                <span>채무자 O O O (700000-0000000)<br/></span>
                <span>서울 강남구 OO동 OO번지 8층<br/></span>
                <span><br/></span>
                <span><br/></span>
                <span><br/></span>
                <div>대여금 청구 지급명령 신청</div>
                <span><br/></span>
                <span><br/></span>
                <span>청구금액 : 금 {sum}원<br/></span>
                <span><br/></span>
                <button onClick={ onClickPrev }>이전</button>
                <span><br/></span>
                <span><br/></span>
                <button onClick={ onClickNext }>다음</button>
            </>
        );
    }
    else if ( index === 3) {
        return (
            <>
                <div className={styles.form_component}>
                    <span>신 청 취 지<br/></span>
                </div>
                <span><br/></span>
                <span>채무자는 채권자에게 아래 청구금액 및 독촉절차비용을 지급하라는 명령을 구함<br/></span>
                <span>1. 금 {sum}원<br/></span>
                <span>2. 위 항 금액에 대하여 이 사건 지급명령정본이 송달된 다음날부터 <br/></span>
                <span>다 갚는 날까지 연 12%의 비율에 의한 지연손해금<br/></span>
                <span><br/></span>
                <span>독촉절차비용 : 금 45,600원 (내역 : 인지대 7,200원, 송달료 38,400원)<br/></span>
                <span><br/></span>
                <div className={styles.form_component}>
                    <span>신 청 원 인<br/></span>
                </div>
                <span><br/></span>
                <div>1. 당사자들 사이의 관계</div>
                <span><br/></span>
                <span><br/></span>
                <span>채권자는 {bondType} 채무자에게 금 {getTotalSum(loans)}원을 대여해 준 자이고,<br/></span>
                <span>채무자는 위 금액을 차용하여 이를 변제할 의무가 있는 채무자입니다.<br/></span>
                <span><br/></span>
                <span>2. 금원 대여<br/></span>
                <span><br/></span>
                <span><br/></span>
                <span>채권자는 채무자에게<br/></span>
                <span>{getDetailString(loans)}을<br/></span>
                <span>변제기 {getYYYYMMDDString(expirationDate)}, 이율 {interestType} {interest}%, 지연손해금 {delayInterestType} {delayInterest}%로 하여 대여해 준 사실이 있습니다.<br/></span>
                <span><br/></span>
                <span>3. 대여금 변제<br/></span>
                <span><br/></span>
                <span><br/></span>
                <span>채무자는 채권자에게<br/></span>
                <span>{getDetailString(paybacks)}을<br/></span>
                <span>변제한 사실이 있습니다.<br/></span>
                <span><br/></span>
                <span>4. 대여금 미변제<br/></span>
                <span><br/></span>
                <span><br/></span>
                <span>채무자는 위 대여금 {getTotalSum(loans) - getTotalSum(paybacks)}원을 변제기인 {getYYYYMMDDString(expirationDate)}까지 변제할 의무가 있습니다.<br/></span>
                <span>그럼에도 채무자는 위 금원을 변제하지 않고 있습니다.<br/></span>
                <span><br/></span>
                <span>5. 결어<br/></span>
                <span><br/></span>
                <span><br/></span>
                <span>그러므로 채무자는 채권자에게 {getTotalSum(loans) - getTotalSum(paybacks)}원 및<br/></span>
                <span>이에 대하여 {getYYYYMMDDString(expirationDate)}까지는 {interestType} {interest}%의,<br/></span>
                <span>그 다음날 부터 이 사건 지급명령정본이 송달된 날까지는 {delayInterestType} {delayInterest}%의,<br/></span>
                <span>그 다음날부터 다 갚는 날까지 연 12%의 각 비율에 의한 금원을 지급할 의무가 있다 할 것입니다.<br/></span>
                <span>이에 채권자는 이 신청에 이르게 되었습니다.<br/></span>
                <span><br/></span>
                <span><br/></span>
                <button onClick={ onClickPrev }>이전</button>
                <span><br/></span>
                <span><br/></span>
                <button onClick={ onClickNext }>다음</button>
            </>
        );
    }
    else if ( index === 4) {
        return (
            <>
                <div className={styles.form_component}>
                    <span>입 증 방 법<br/></span>
                </div>
                <span><br/></span>
                <span><br/></span>
                <span>1. 갑제1호증 차용금 약정서 1부<br/></span>
                <span>1. 갑제2호증 차량운행허가각서 1부<br/></span>
                <span>1. 갑제3호증의 1, 2 수신기간별(출금) 거래내역 1부<br/></span>
                <span>1. 갑제3호증의 3 거래명세서 1부<br/></span>
                <span><br/></span>
                <span><br/></span>
                <div className={styles.form_component}>
                    <span>첨 부 서 류<br/></span>
                </div>
                <span><br/></span>
                <span><br/></span>
                <span>1. 소송위임장 1부<br/></span>
                <span>1. 경유확인서 1부<br/></span>
                <span>1. 담당변호사지정서 1부<br/></span>
                <span><br/></span>
                <span><br/></span>
                <span>{getYYYYMMDDString(until)}<br/></span>
                <span><br/></span>
                <div className={styles.form_component}>
                    <span>채권자의 대리인<br/></span>
                </div>
                <span><br/></span>
                <span><br/>법무법인 한 경</span>
                <span><br/></span>
                <span><br/></span>
                <span><br/>담당변호사 김 경 보</span>
                <span><br/></span>
                <span><br/></span><span><br/></span><span><br/></span><span><br/></span><span><br/></span>
                <div className={styles.form_component}>
                    <span>서 울 중 앙 지 방 법 원 귀 중<br/></span>
                </div>
                <span><br/></span>
                <span><br/></span>
                <button onClick={ onClickPrev }>이전</button>
                <span><br/></span>
                <span><br/></span>
                <button onClick={ onClickNext }>다음</button>
            </>
        );
    }
    else {
        return (<></>);
    }
};

export default FormComponent;
