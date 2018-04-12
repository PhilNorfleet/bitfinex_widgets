import React from 'react';
import TickerPrice from './format/TickerPrice';
import PercentChange from './format/PercentChange';
import styled from 'styled-components';
// import * as icons from '/assets/img/svg/white';
// import * as Icons from 'assets/img/svg/icon';
// const svgs = require.context('../../assets/img/svg/white', true, /\.svg$/)
// const Icons = svgs.keys()
//   .reduce((images, key) => {
//     images[key] = svgs(key)
//     return images
//   }, {});
const TickerCell = styled.td`
  
`;
const Currency = styled.div`
  float: right;
  margin-left: 5px;
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
  onMouseLeaveTicker, }) => {
  const highlight = mousedOver ? 'highlight' : '';
  const highlightAsset = first && rowCount === 1 ? highlight : 'no-highlight';
  return (
    <tr
      className={ `Ticker ${ highlight }` }
      onClick={ () => onSelectTicker(asset + currency) }
      onMouseEnter={ () => onMouseEnterTicker(asset + currency) }
      onMouseLeave={ () => onMouseLeaveTicker(asset + currency) }
    >
      { first &&
        <TickerCell
          className={ highlightAsset }
          rowSpan={ rowCount }
        >
          
          { asset }
        </TickerCell>
      }
      <TickerCell className='price'>
        <TickerPrice price={ price } direction={ direction } />
        <Currency>{ currency }</Currency>
      </TickerCell>
      <TickerCell className='delta'><PercentChange perc={ delta } /></TickerCell>
      <TickerCell className='volume'>{ volume }</TickerCell>
    </tr>
  )
}

export default Ticker;
