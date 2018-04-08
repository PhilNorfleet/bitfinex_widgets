import React from 'react';
import TableHeader from 'containers/TableHeader';
import { orderBy } from 'lodash';

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
      const color = 'rgba(256, 0, 0, 0.25)';
      const style = {
        background: `linear-gradient(90deg, ${ color } ${ perc }%, white ${ 0 }%)`,
      };
      return (
        <tr className='OrderbookRow-Bid' key={ask} style={ style }>
          <td className='price'>{ask}</td>
          <td className='totalAmount'>{totalAmount.toFixed(2)}</td>
          <td className='amount'>{amount.toFixed(5)}</td>
          <td className='count'>{count}</td>
        </tr>
      )
    })
  }
  return (
    <table className='Asks'>
      <TableHeader columns={ columns } parent='Asks' />
      <tbody>
        {makeRows()}
      </tbody>
    </table>
  );
};

export default Asks;