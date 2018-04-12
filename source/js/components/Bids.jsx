import React from 'react';
import Table from 'components/table/Table';
import { orderBy } from 'lodash';
import { format } from 'utils/formatNumber';

const columns = [
  {
    name: 'Count',
    key: 'count',
  },
  {
    name: 'Amount',
    key: 'amount',
  },
  {
    name: 'Total',
    key: 'total',
  },
  {
    name: 'Price',
    key: 'price',
  },
];
const Bids = ({ bids, largestTotalValue }) => {
  const makeRows = () => {
    const sorted = orderBy(Object.keys(bids), Number, ['desc']);
    let totalAmount = 0;
    let totalValue = 0;
    return sorted.map((bid) => {
      const { amount, count } = bids[bid];
      totalAmount += amount;
      totalValue += (amount * +bid);
      const perc = 100 * (totalValue / largestTotalValue);
      const color = 'rgba(var(--upColor), 0.25)';
      const style = {
        background: `linear-gradient(270deg, ${ color } ${ perc }%, transparent ${ 0 }%)`,
      };
      const formatOpts = {
        price: { precision: 6 },
        totalAmount: { precision: 5, max: 5, minDecimals: 1 },
        amount: { precision: 5, max: 5, minDecimals: 1 },
      }
      return (
        <tr className='OrderbookRow-Bid' key={ bid } style={ style }>
          <td className='count'>{count}</td>
          <td className='amount'>{format(amount, formatOpts.amount)}</td>
          <td className='totalAmount'>{format(totalAmount, formatOpts.totalAmount)}</td>
          <td className='price'>{format(bid, formatOpts.price)}</td>
        </tr>
      );
    });
  };
  return (
    <Table
      columns={columns}
      makeRows={ makeRows }
      data={ bids }
      parent='Bids'
    />
  );
};

export default Bids;
