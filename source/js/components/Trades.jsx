import React from 'react';
import Trade from 'components/Trade';
import formatNumber from 'utils/formatNumber';
import Table from 'components/table/Table';
import Widget from 'components/widget';
import { css } from 'styled-components';
import { parse, format } from 'date-fns';

const columns = [
  {
    name: 'Time',
    key: 'timestamp',
  },
  {
    name: 'Price',
    key: 'price',
  },
  {
    name: 'Amount',
    key: 'Amount',
  },
];
const formatOpts = {
  price: { precision: 6 },
  totalAmount: { precision: 5, max: 5, minDecimals: 1 },

  amount: { precision: 5, max: 5, minDecimals: 1 },
}
const Trades = ({ trades }) => {
  const makeRows = () => {
    return trades.map((trade) => {
      return (
        <Trade
          timestamp={ format(parse(trade.timestamp), 'HH:mm:ss') }
          price={ formatNumber(trade.price, formatOpts.price) }
          amount={ formatNumber(trade.amount, formatOpts.amount) }
          alpha={ trade.alpha }
          key={ trade.timestamp }
        />
      );
    });
  }

  return (
    <Table
      columns={ columns }
      rows={ makeRows(trades) }
      parent='Trades'
    />
  )
}
const widgetOptions = {
  header: true,
  collapsable: true,
  name: 'TRADES',
  showSymbol: true,
  style: css`
        float: right;
        width: 33%;
        min-width: 200px;
    `,
};
export default Widget(Trades, widgetOptions);
