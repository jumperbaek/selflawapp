
export const get2Digit = (date) => {
    return Number(date) <= 9 ? ("0" + date) : date;
}

