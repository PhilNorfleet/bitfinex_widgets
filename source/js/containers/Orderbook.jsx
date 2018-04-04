import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Orderbook from 'components/Orderbook.jsx';

@connect(state => ({
    orderbook: state.websocket.orderbook,
}))
export default class OrderbookContainer extends Component {
    static propTypes = {
        orderbook: PropTypes.array,
    }

    render() {
        const {
            orderbook,
        } = this.props;
        if (orderbook) {
            return <Orderbook orderbook={orderbook} />
        } else {
            return (
                <div> LOADING </div>
            );
        }
    }
}
