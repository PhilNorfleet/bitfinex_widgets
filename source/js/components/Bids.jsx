import React from 'react';
import TableHeader from 'containers/TableHeader';
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
      const color = 'rgba(0, 256, 0, 0.25)';
      const style = {
        background: `linear-gradient(270deg, ${ color } ${ perc }%, transparent ${ 0 }%)`,
      };
      return (
        <tr className='OrderbookRow-Bid' key={ bid } style={ style }>
          <td className='count'>{count}</td>
          <td className='amount'>{format(amount, 5, 5, 1)}</td>
          <td className='totalAmount'>{format(totalAmount, 5, 5, 1)}</td>
          <td className='price'>{format(bid, 8, 8, 1)}</td>
        </tr>
      );
    });
  };
  return (
    <table className='Bids' >
      <TableHeader columns={ columns } parent='Bids' />
      <tbody>
        { makeRows() }
      </tbody>
    </table>
  );
};

export default Bids;
