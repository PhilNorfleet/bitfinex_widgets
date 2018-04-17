import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import Table from 'components/table/Table';
import { withTheme } from 'themes';
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
const Bid = styled.tr`
  
`;
const Bids = ({ bids, largestTotalValue, theme }) => {
  const makeRows = () => {
    const sorted = orderBy(Object.keys(bids), Number, ['desc']);
    let totalAmount = 0;
    let totalValue = 0;
    return sorted.map((bid) => {
      const { amount, count } = bids[bid];
      totalAmount += amount;
      totalValue += (amount * +bid);
      const perc = 100 * (totalValue / largestTotalValue);
      const formatOpts = {
        price: { precision: 6 },
        totalAmount: { precision: 5, max: 5, minDecimals: 1 },
        amount: { precision: 5, max: 5, minDecimals: 1 },
      };
      // can't used styled-components for high-frequency updates.
      const style = {
        background: `linear-gradient(270deg, ${ theme.upColor() } ${ perc }%, transparent 0%)`,
      }
      return (
        <Bid key={ bid } style={ style } >
          <td className='count'>{ count }</td>
          <td className='amount'>{ format(amount, formatOpts.amount) }</td>
          <td className='totalAmount'>{ format(totalAmount, formatOpts.totalAmount) }</td>
          <td className='price'>{ format(bid, formatOpts.price) }</td>
        </Bid>
      );
    });
  };
  return (
    <Table
      columns={columns}
      rows={ makeRows() }
      parent='Bids'
    />
  );
};

export default withTheme(Bids);
