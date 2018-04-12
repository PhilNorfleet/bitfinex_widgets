import React from 'react';

const BigTicker = ({ 
    symbol,
    lastPrice,
    volume,
    dailyChange,
    dailyChangePerc,
    low,
    high, 
}) => {
    const percColor = dailyChangePerc > 0 ? 'rgb(var(--upColor))' : 
        'rgb(var(--downColor))';
    return (
        <div className='BigTicker'>
            <table>
                <tbody>
                    <tr>
                        <td className='BigTickerItem symbol'>{symbol}</td>
                        <td className='BigTickerItem last'>{lastPrice}</td>
                    </tr>
                    <tr>
                        <td className='BigTickerItem volume'>{volume}</td>
                        <td className='BigTickerItem delta'>
                            <span>{ dailyChange }</span>
                            <span style={{ color: percColor }}>
                                { dailyChangePerc }
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className='BigTickerItem low'>{low}</td>
                        <td className='BigTickerItem high'>{high}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BigTicker