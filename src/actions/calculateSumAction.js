import { createAction } from "redux-actions";
import { UPDATE_LOAN_DATE, UPDATE_LOAN_MONEY, DELETE_LOAN, UPDATE_PAYBACK_DATE,
    UPDATE_PAYBACK_MONEY, DELETE_PAYBACK, UPDATE_INTEREST, UPDATE_IS_MONTHLY_INTEREST,
    UPDATE_EXPIRATION_DATE, UPDATE_DELAY_INTEREST, UPDATE_IS_MONTHLY_DELAY_INTEREST,
    UPDATE_IS_TRADING, UPDATE_UNTIL
} from "../store/reducer";

export const updateLoanDate = createAction(UPDATE_LOAN_DATE, payload => payload);
export const updateLoanMoney = createAction(UPDATE_LOAN_MONEY, payload => payload);
export const deleteLoan = createAction(DELETE_LOAN,payload => payload);
export const updatePaybackDate = createAction(UPDATE_PAYBACK_DATE,payload => payload);
export const updatePaybackMoney = createAction(UPDATE_PAYBACK_MONEY,payload => payload);
export const deletePayback = createAction(DELETE_PAYBACK,payload => payload);
export const updateInterest = createAction(UPDATE_INTEREST, payload => payload);
export const updateIsMonthlyInterest = createAction(UPDATE_IS_MONTHLY_INTEREST, payload => payload);
export const updateExpirationDate = createAction(UPDATE_EXPIRATION_DATE, payload => payload);
export const updateDelayInterest = createAction(UPDATE_DELAY_INTEREST, payload => payload);
export const updateIsMonthlyDelayInterest = createAction(UPDATE_IS_MONTHLY_DELAY_INTEREST, payload => payload);
export const updateIsTrading = createAction(UPDATE_IS_TRADING, payload => payload);
export const updateUntil = createAction(UPDATE_UNTIL, payload => payload);
