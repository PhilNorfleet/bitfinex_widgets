import React from 'react';

const Trade = ({ price, amount, timestamp }) => {

    return (
        <tr className='Trade'>
            <td className="TradeItem timestamp">{timestamp}</td>
            <td className="TradeItem price">{price}</td>
            <td className="TradeItem amount">{amount}</td>
        </tr>
    )
}

export default Trade