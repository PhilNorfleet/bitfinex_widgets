import { trimEnd } from 'lodash';

function commafy(num) {
  const result = num.slice()
  return result.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}
export const format = (number, options = {}) => {
  const { 
    precision = 7,
    max = 8,
    minDecimals = 0,
    maxDecimals = 6,
    minLength = 0,
    fixedLength = null
  } = options;
  let num = number.toString();
  if (num.length > max) {
    num = num.slice(0, max);
  }
  num = (+num).toPrecision(precision);
  const split = num.split('.');
  const left = split[0];
  let right = split[1] || '';
  if (right.length <= minDecimals) {
    right = `${ right }${ '0'.repeat(minDecimals - right.length) }`;
  } else if (right.length > maxDecimals) {
    right = right.slice(0, maxDecimals);
  } else {
    right = right.replace(/^0+(\d)|(\d)0+$/gm, '$1$2');
  }

  let result = right ? `${ commafy(left) }.${ right }` : commafy(left);
  const min = Math.max(precision, minLength)
  if (`${ right }${ left }`.length < min) {
    if (right && right.length < maxDecimals) {
      result = `${result}${'0'.repeat(min - `${right}${left}`.length)}`;
    }
  }
  return result;
}

export default format;
