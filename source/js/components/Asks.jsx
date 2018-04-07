import React from 'react';
import TableHeader from 'containers/TableHeader';
const columns = [
  {
    name: 'Amount',
    ket: 'amount',
  },
  {
    name: 'Price',
    ket: 'price',
  },
];
const Asks = ({ asks }) => {
  const makeRows = () => {
    return Object.keys(asks).map((ask) => {
      return (
        <tr ask={ask}>
          <td className='amount'>{asks[ask]}</td>
          <td className='price'>{ask}</td>
        </tr>
      )
    })
  }
  return (
    <table className='Asks'>
      <TableHeader columns={columns} />
      {makeRows()}
    </table>
  );
};

export default Asks;