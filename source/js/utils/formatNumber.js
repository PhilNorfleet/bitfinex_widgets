function commafy(num) {
    const result = num.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    return result;
}
export const format = (number, precision, max, minDecimals=0, minLength) => {
    let n = +number
    if (n.toString().length > max) {
        n = +n.toString().slice(0, max);
    }
    n = +(n).toPrecision(precision);
    const split = n.toString().split('.');
    const left = commafy(split[0]);
    let right = split[1] || '';
    if (right.length < minDecimals) {
        right = `${ right }${ '0'.repeat(minDecimals - right.length) }`;
    }
    return right ? `${ left }.${ right }` : left;
}

export default format;