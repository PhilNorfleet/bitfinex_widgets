export const format = (number, precision, max, minDecimals=0) => {
    number = +number
    if (number.toString().length > max) {
        number = +number.toString().slice(0, max);
    }
    let result = +(number).toPrecision(precision);
    return result.toLocaleString(undefined, { minimumFractionDigits: minDecimals, maximumFractionDigits: precision })
}

export default format;