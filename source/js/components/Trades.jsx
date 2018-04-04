import React from 'react';
import Trade from 'components/Trade';
import moment from 'moment';
const Trades = ({ trades }) => {
    const makeTrades = () => {
        return trades.map((trade) => {
            return <Trade
                timestamp={moment(trade.timestamp).format('HH:mm:ss')}
                price={trade.price}
                amount={trade.amount}
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