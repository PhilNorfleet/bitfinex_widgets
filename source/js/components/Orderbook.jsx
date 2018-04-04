import React from 'react';

const Orderbook = ({ price, amount, timestamp }) => {

    return (
        <tr className='Orderbook'>
            <td className="OrderbookItem timestamp">{timestamp}</td>
            <td className="OrderbookItem price">{price}</td>
            <td className="OrderbookItem amount">{amount}</td>
        </tr>
    )
}

export default Orderbook