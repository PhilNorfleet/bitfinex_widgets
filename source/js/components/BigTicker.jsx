import React from 'react';
import { css } from 'styled-components';
import Widget from 'components/widget';
import Table from 'components/table/Table';
import PercentChange from './format/PercentChange';

const BigTicker = ({ 
    symbol,
    lastPrice,
    volume,
    dailyChange,
    dailyChangePerc,
    low,
    high, 
}) => {
    const rows = [
        (<tr key='BigTicker1'>
            <td className='BigTickerItem symbol'>{symbol}</td>
            <td className='BigTickerItem last'>{lastPrice}</td>
        </tr>),
        (<tr key='BigTicker2'>
            <td className='BigTickerItem volume'>{volume}</td>
            <td className='BigTickerItem delta'>
                <span>{dailyChange}</span>
                <PercentChange perc={dailyChangePerc} />
            </td>
        </tr>),
        (<tr key='BigTicker3'>
            <td className='BigTickerItem low'>{low}</td>
            <td className='BigTickerItem high'>{high}</td>
        </tr>)
    ]
    return (
        <Table rows={ rows } />
    )
}

const widgetStyle = css`
  flex: 0 0 auto;
  order: 0;
`;
export default Widget(BigTicker, { header: false, style: widgetStyle });