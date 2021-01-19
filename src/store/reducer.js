import { handleActions } from 'redux-actions';
import produce from 'immer';

export const UPDATE_LOAN_DATE = "UPDATE_LOAN_DATE";
export const UPDATE_LOAN_MONEY = "UPDATE_LOAN_MONEY";
export const DELETE_LOAN = "DELETE_LOAN";
export const UPDATE_PAYBACK_DATE = "UPDATE_PAYBACK_DATE";
export const UPDATE_PAYBACK_MONEY = "UPDATE_PAYBACK_MONEY";
export const DELETE_PAYBACK = "DELETE_PAYBACK";
export const UPDATE_INTEREST = "UPDATE_INTEREST";
export const UPDATE_IS_MONTHLY_INTEREST = "UPDATE_IS_MONTHLY_INTEREST";
export const UPDATE_EXPIRATION_DATE = "UPDATE_EXPIRATION_DATE";
export const UPDATE_DELAY_INTEREST = "UPDATE_DELAY_INTEREST";
export const UPDATE_IS_MONTHLY_DELAY_INTEREST = "UPDATE_IS_MONTHLY_DELAY_INTEREST";
export const UPDATE_IS_TRADING = "UPDATE_IS_TRADING";
export const UPDATE_UNTIL = "UPDATE_UNTIL";

const initialState = {
    loans : {},
    paybacks : {},
    interest: 0,
    isMonthlyInterest: false,
    expirationDate: null,
    delayInterest: 0,
    isMonthlyDelayInterest: false,
    isTrading: false,
    until: new Date()
};

export default handleActions({
    [UPDATE_LOAN_DATE]: (state, action) =>
        produce(state, draft => {
            draft.loans[action.payload.id] = { ...draft.loans[action.payload.id], date: action.payload.date }
        }),
    [UPDATE_LOAN_MONEY]: (state, action) =>
        produce(state, draft => {
            draft.loans[action.payload.id] = { ...draft.loans[action.payload.id], money: action.payload.money }
        }),
    [DELETE_LOAN]: (state, action) =>
        produce(state, draft => {
            delete draft.loans[action.payload]
        }),
    [UPDATE_PAYBACK_DATE]:  (state, action) =>
        produce(state, draft => {
            draft.paybacks[action.payload.id] = { ...draft.paybacks[action.payload.id], date: action.payload.date }
        }),
    [UPDATE_PAYBACK_MONEY]:  (state, action) =>
        produce(state, draft => {
            draft.paybacks[action.payload.id] = { ...draft.paybacks[action.payload.id], money: action.payload.money }
        }),
    [DELETE_PAYBACK]: (state, action) =>
        produce(state, draft => {
            delete draft.paybacks[action.payload]
        }),
    [UPDATE_INTEREST]:  (state, action) =>
        produce(state, draft => {
            draft.interest = action.payload
        }),
    [UPDATE_EXPIRATION_DATE]:  (state, action) =>
        produce(state, draft => {
            draft.expirationDate = action.payload
        }),
    [UPDATE_DELAY_INTEREST]:  (state, action) =>
        produce(state, draft => {
            draft.delayInterest = action.payload
        }),
    [UPDATE_IS_MONTHLY_DELAY_INTEREST]: (state, action) =>
        produce(state, draft => {
            draft.isMonthlyDelayInterest = action.payload.isMonthlyDelayInterest
        }),
    [UPDATE_IS_TRADING]:  (state, action) =>
        produce(state, draft => {
            draft.isTrading = action.payload.isTrading
        }),
    [UPDATE_UNTIL]:  (state, action) =>
        produce(state, draft => {
            draft.until = action.payload
        }),
    [UPDATE_IS_MONTHLY_INTEREST]:  (state, action) =>
        produce(state, draft => {
            draft.isMonthlyInterest = action.payload.isMonthlyInterest
        }),
}, initialState);

