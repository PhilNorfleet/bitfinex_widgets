import React from 'react';
import Trade from 'components/Trade';
import formatNumber from 'utils/formatNumber';
import { parse, format } from 'date-fns';
const Trades = ({ trades }) => {
    const makeTrades = () => {
        return trades.map((trade) => {
            return <Trade
                timestamp={format(parse(trade.timestamp), 'HH:mm:ss')}
                price={formatNumber(trade.price, 5, 7, 1)}
                amount={formatNumber(trade.amount, 6, 6, 5)}
                key={trade.timestamp} />
        });
    }

    return (
        <table className='Trades'>
            <tbody>
                {makeTrades()}
            </tbody>
        </table>
    )
}

export default Trades