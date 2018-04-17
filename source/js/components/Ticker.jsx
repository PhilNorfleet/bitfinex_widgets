import React from 'react';
import styled, { css } from 'styled-components';
import { withTheme } from 'themes';
import TickerPrice from './format/TickerPrice';
import PercentChange from './format/PercentChange';
// import * as icons from '/assets/img/svg/white';
// import * as Icons from 'assets/img/svg/icon';
// const svgs = require.context('../../assets/img/svg/white', true, /\.svg$/)
// const Icons = svgs.keys()
//   .reduce((images, key) => {
//     images[key] = svgs(key)
//     return images
//   }, {});
const TickerRow = styled.tr`
  ${ props => props.style }
`;
const TickerCell = styled.td`
  text-align: ${ props => (props.textAlign || 'right')};
  padding: 2px;
  ${ props => props.style }
`;
const Currency = styled.div`
  float: right;
  margin-left: 5px;
  width: 25px;
  text-align: right;
  color: ${ props => props.theme.textAccent };
`;
const Ticker = ({ 
  iconName,
  price,
  direction,
  asset,
  currency,
  delta,
  volume,
  first,
  rowCount,
  mousedOver,
  onSelectTicker,
  onMouseEnterTicker,
  onMouseLeaveTicker, 
  theme}) => {
  const rowStyle = {
    backgroundColor: (mousedOver ? theme.bgAccent : theme.bgColor),
  };
  const assetStyle = {
    backgroundColor: (first && rowCount === 1 ? 'transparent' : theme.bgColor),
  };
  return (
    <tr
      style={ rowStyle }
      onClick={ () => onSelectTicker(`${ asset }${ currency }`) }
      onMouseEnter={ () => onMouseEnterTicker(`${ asset }${ currency }`) }
      onMouseLeave={ () => onMouseLeaveTicker(`${ asset }${ currency }`) }
    >
      { first &&
        <TickerCell
          style={ assetStyle }
          rowSpan={ rowCount }
        >
          { asset }
        </TickerCell>
      }
      <TickerCell>
        <TickerPrice price={ price } direction={ direction } />
        <Currency>{ currency }</Currency>
      </TickerCell>
      <TickerCell><PercentChange perc={ delta } /></TickerCell>
      <TickerCell>{ volume }</TickerCell>
    </tr>
  )
}

export default withTheme(Ticker);
