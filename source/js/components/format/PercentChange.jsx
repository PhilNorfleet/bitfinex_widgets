import React from 'react';
import styled from 'styled-components';
import formatNumber from 'utils/formatNumber';

const Delta = styled.span`
  color: ${ props => props.theme[props.perc > 0 ? 'upColor': 'downColor'](1) };
`;

const PercentChange = ({ perc }) => {
  return (
    <Delta perc={ perc }>
      { `${ formatNumber(perc, {
        precision: 3,
        minDecimals: 2,
        maxDecimals: 2,
        max: 5,
      }) } %` }
    </Delta>
  );
}
export default PercentChange;