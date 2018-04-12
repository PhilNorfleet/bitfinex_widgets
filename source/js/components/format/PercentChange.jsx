import React from 'react';
import styled from 'styled-components';
import formatNumber from 'utils/formatNumber';

const Delta = styled.span`
    color: ${ props => props.perc > 0 ? 'rgb(var(--upColor))' : 'rgb(var(--downColor))' };
`;

const PercentChange = ({ perc }) => {
    return (
        <Delta perc={ perc }>
            { formatNumber(perc, {
                precision: 3,
                minDecimals: 2,
                max: 4
            }) } %
        </Delta>
    );
}
export default PercentChange;