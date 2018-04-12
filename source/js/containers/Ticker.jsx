import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Ticker from 'components/Ticker.jsx';
import { selectTicker, mouseEnterTicker, mouseLeaveTicker } from 'actions/app';
import format from 'utils/formatNumber';


@connect(state => ({
  tradesChanId: state.trades.tradesChanId,
  ordersChanId: state.orders.ordersChanId,
}))
export default class TickerContainer extends Component {
  static propTypes = {
    tradesChanId: PropTypes.number,
    ordersChanId: PropTypes.number,
    rowCount: PropTypes.number,
    first: PropTypes.bool,
    dispatch: PropTypes.func,
    ticker: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { mousedOver: false, direction: null };
  }

  onSelectTicker = (symbol) => {
    const { dispatch, tradesChanId, ordersChanId } = this.props;
    dispatch(selectTicker(symbol, tradesChanId, ordersChanId));
  }
  onMouseEnterTicker = (symbol) => {
    const { dispatch } = this.props;
    this.setState({ mousedOver: true });
    dispatch(mouseEnterTicker(symbol));
  }
  onMouseLeaveTicker = (symbol) => {
    const { dispatch } = this.props;
    this.setState({ mousedOver: false });
    dispatch(mouseLeaveTicker(symbol));
  }
  render() {
    const {
      rowCount,
      first,
      ticker,
    } = this.props;
    const formatOpts = {
      price: { precision: 7, max: 8 },
      percent: { precision: 4, max: 4, maxDecimals: 2 },
      volume: { precision: 10, max: 10, maxDecimals: 0 },
    }
    return (
      <Ticker
        rowCount={ rowCount }
        first={ first }
        asset={ ticker.asset }
        currency={ ticker.currency }
        price={ ticker.lastPrice }
        direction={ this.state.direction }
        delta={ format(100 * ticker.dailyChangePerc, formatOpts.percent) }
        volume={ format(ticker.volume, formatOpts.volume) }
        mousedOver={ this.state.mousedOver }
        onSelectTicker={ this.onSelectTicker }
        onMouseEnterTicker={ this.onMouseEnterTicker }
        onMouseLeaveTicker={ this.onMouseLeaveTicker } 
      />
    );
  }
}
