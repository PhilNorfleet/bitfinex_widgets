import React from 'react';
import Ticker from 'containers/Ticker';
import TableHeader from 'containers/TableHeader';
import { takeWhile } from 'lodash';
const columns = [
    {
        name: 'Symbol',
        key: 'asset',
    },
    {
        name: 'Last',
        key: 'lastPrice',
    },
    {
        name: '24HR',
        key: 'dailyChangePerc',
    },
    {
        name: 'Vol',
        key: 'volume',
    }
]
const Tickers = ({ tickers }) => {
    const makeTickers = () => {
        let rows = []
        let body = [];
        let rowCount = 1;

        for (let i = 0; i < tickers.length; i++) {
            const thisAsset = tickers[i].asset;
            const lastAsset = i > 0 ? tickers[i - 1].asset : null; 
            const nextAsset = i < tickers.length - 1 ? tickers[i + 1].asset : null;
            const first = lastAsset !== thisAsset;
            const last = nextAsset !== thisAsset;
            if (first && !last) {
                rowCount = takeWhile(tickers.slice(i), (t) => {thisAsset === t.asset}).length;
            }
            const row = <Ticker 
                first={ first }
                rowCount={ rowCount }
                ticker={ tickers[i] }
                key={ tickers[i].symbol }/>

            body.push(row)
            if (last) {
                rows.push(<tbody>{body}</tbody>);
                body = [];
                rowCount = 1;
            }
        };
        return rows
    }

    return (
        <div className='Tickers'>
            <table>
                <TableHeader columns={columns} sortable/>
                {makeTickers()}
            </table>
        </div>
    )
}

export default Tickers