import React from 'react';

const Ticker = ({ 
    price,
    asset,
    currency,
    delta,
    volume,
    first,
    rowCount,
    mousedOver,
    onSelectTicker,
    onMouseEnterTicker,
    onMouseLeaveTicker, }) => {
    const highlight = mousedOver ? 'highlight' : '';
    const highlightAsset = first && rowCount === 1 ? highlight : 'no-highlight'
    return (
        <tr
            className={`Ticker ${highlight}`}
            onClick={() => onSelectTicker(asset+currency)}
            onMouseEnter={() => onMouseEnterTicker(asset+currency)}
            onMouseLeave={() => onMouseLeaveTicker(asset+currency)}>
            {first && <td className={`TickerItem ${highlightAsset}`} rowSpan={rowCount}>{asset}</td>}
            <td className="TickerItem price">{price}</td>
            <td className="TickerItem delta">{delta}</td>
            <td className="TickerItem volume">{volume}</td>
        </tr>
    )
}

export default Ticker