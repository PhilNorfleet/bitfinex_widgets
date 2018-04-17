import React from 'react';
import styled from 'styled-components';
import { withTheme } from 'themes';

const BASE_OPACITY = 0.2;
const MAX_OPACITY = 0.3;
const TradeRow = styled.tr``;
const Trade = ({ price, amount, timestamp, alpha = 0.5, theme}) => {
  const isPositive = (amount > 0);
  const perc = (MAX_OPACITY * alpha) + BASE_OPACITY;
  // can't used styled-components for high-frequency updates.
  const style = {
    backgroundColor: `${ isPositive ? theme.upColor(perc) : theme.downColor(perc) }`,
  }
  return (
    <TradeRow style={ style }>
      <td className='TradeItem timestamp'>{timestamp}</td>
      <td className='TradeItem price'>{price}</td>
      <td className='TradeItem amount'>{amount}</td>
    </TradeRow>
  )
}

export default withTheme(Trade);
