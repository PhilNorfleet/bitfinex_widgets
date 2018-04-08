import React from 'react';
import Trade from 'components/Trade';
import moment from 'moment';
import format from 'utils/formatNumber';

const Trades = ({ trades }) => {
    const makeTrades = () => {
        return trades.map((trade) => {
            return <Trade
                timestamp={moment(trade.timestamp).format('HH:mm:ss')}
                price={format(trade.price, 5, 7, 1)}
                amount={format(trade.amount, 6, 6, 5)}
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