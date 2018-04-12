import React from 'react';
import Table from 'components/table/Table';
import { orderBy } from 'lodash';
import { format } from 'utils/formatNumber';

const columns = [
  {
    name: 'Price',
    key: 'price',
  },
  {
    name: 'Total',
    key: 'total',
  },
  {
    name: 'Amount',
    key: 'amount',
  }, 
  {
    name: 'Count',
    key: 'count',
  },
];
const Asks = ({ asks, largestTotalValue }) => {
  const makeRows = () => {
    const sorted = orderBy(Object.keys(asks), Number, ['asc']);
    let totalAmount = 0;
    let totalValue = 0;
    return sorted.map((ask) => {
      const { amount, count } = asks[ask];
      totalAmount += amount;
      totalValue += (amount * +ask);
      const perc = 100 * (totalValue / largestTotalValue);
      const color = 'rgba(var(--downColor), 0.25)';
      const formatOpts = {
        price: { precision: 6 },
        totalAmount: { precision: 5, max: 5, minDecimals: 1 },
        amount: { precision: 5, max: 5, minDecimals: 1 },
      }
      const style = {
        background: `linear-gradient(90deg, ${ color } ${ perc }%, transparent ${ 0 }%)`,
      };
      return (
        <tr className='OrderordersRow-Bid' key={ask} style={ style }>
          <td className='price'>{format(ask, formatOpts.price)}</td>
          <td className='totalAmount'>{format(totalAmount, formatOpts.totalAmount)}</td>
          <td className='amount'>{format(amount, formatOpts.amount)}</td>
          <td className='count'>{count}</td>
        </tr>
      )
    })
  }
  return (
    <Table
      columns={ columns }
      makeRows={ makeRows }
      data={ asks }
      parent='Asks'
    />
  );
};

export default Asks;