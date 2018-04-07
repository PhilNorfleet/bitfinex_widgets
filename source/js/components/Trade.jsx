import React from 'react';
const BASE_OPACITY = 0.05
const MAX_OPACITY = 0.20
const color = {
    red: '225, 86, 86',
    green: '157, 194, 74'
}
const Trade = ({ price, amount, timestamp, perc = 0.5 }) => {
    const isPositive = (amount > 0)
    const p = (MAX_OPACITY * perc) + BASE_OPACITY
    const s = {
        background: `rgba(${isPositive ? color.green : color.red}, ${p})`
    }
    return (
        <tr className='Trade' style={s}>
            <td className="TradeItem timestamp">{timestamp}</td>
            <td className="TradeItem price">{price}</td>
            <td className="TradeItem amount">{amount}</td>
        </tr>
    )
}

export default Trade