import React from 'react';

const Ticker = ({ last, asset, currency, delta, volume, first, rowCount, onSelectTicker }) => {

    return (
        <tr className='Ticker' onClick={() => onSelectTicker(asset+currency)}>
            {first && <td className="TickerItem asset" rowSpan={rowCount}>{asset}</td>}
            <td className="TickerItem last">{last}</td>
            <td className="TickerItem delta">{delta}</td>
            <td className="TickerItem volume">{volume}</td>
        </tr>
    )
}

export default Ticker