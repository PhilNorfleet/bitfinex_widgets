export const format = (number, precision, max) => {
    number = +number
    if (number.toString().length > max) {
        number = +number.toString().slice(0, max);
    }
    let result = +(number).toPrecision(precision);
    return result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: precision })
}

export default format;