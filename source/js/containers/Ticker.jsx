import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Ticker from 'components/Ticker.jsx';
import { selectTicker, mouseEnterTicker, mouseLeaveTicker } from 'actions/app';
import format from 'utils/formatNumber';


@connect(state => ({
  tradesChanId: state.trades.tradesChanId,
  bookChanId: state.book.bookChanId,
}))
export default class TickerContainer extends Component {
  static propTypes = {
    tradesChanId: PropTypes.number,
    bookChanId: PropTypes.number,
    rowCount: PropTypes.number,
    first: PropTypes.bool,
    dispatch: PropTypes.func,
    ticker: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { mousedOver: false };
  }
  onSelectTicker = (symbol) => {
    const { dispatch, tradesChanId, bookChanId } = this.props;
    dispatch(selectTicker(symbol, tradesChanId, bookChanId));
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
    return (
      <Ticker
        rowCount={ rowCount }
        first={ first }
        asset={ ticker.asset }
        currency={ ticker.currency }
        price={ format(ticker.lastPrice, 6, 8) + ticker.currency }
        delta={ format(100 * ticker.dailyChangePerc, 3, 4, 2) }
        volume={ format(ticker.volume.toFixed(0), 10, 10) }
        mousedOver={ this.state.mousedOver }
        onSelectTicker={ this.onSelectTicker }
        onMouseEnterTicker={ this.onMouseEnterTicker }
        onMouseLeaveTicker={ this.onMouseLeaveTicker } 
      />
    );
  }
}
