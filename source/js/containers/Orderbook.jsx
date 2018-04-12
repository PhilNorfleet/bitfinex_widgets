import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Orderbook from 'components/Orderbook';
import Widget from 'components/widget';

@connect(state => ({
}))
export class OrderbookContainer extends Component {
    render() {
        return <Orderbook />
    }
}
const widgetOptions = {
    header: true,
    collapsable: true,
    name: 'ORDERBOOK',
    showSymbol: true,
    style: css`
        float: left;
        width: 66%;
        min-width: 350px;
    `,
};
export default Widget(OrderbookContainer, widgetOptions);
