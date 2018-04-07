import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    name: 'Orderbook',
    showSymbol: true,
};
export default Widget(OrderbookContainer, widgetOptions);
