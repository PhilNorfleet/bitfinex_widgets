import React from 'react';

const BASE_OPACITY = 0.1;
const MAX_OPACITY = 0.25;
const color = {
  down: 'var(--downColor)',
  up: 'var(--upColor)'
}
const Trade = ({ price, amount, timestamp, alpha = 0.5 }) => {
  const isPositive = (amount > 0)
  const p = (MAX_OPACITY * alpha) + BASE_OPACITY;
  const s = {
    background: `rgba(${ isPositive ? color.up : color.down }, ${ p })`,
  }
  return (
    <tr className='Trade' style={s}>
      <td className='TradeItem timestamp'>{timestamp}</td>
      <td className='TradeItem price'>{price}</td>
      <td className='TradeItem amount'>{amount}</td>
    </tr>
  )
}

export default Trade;
