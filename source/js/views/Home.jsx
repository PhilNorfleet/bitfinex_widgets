import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ws from 'actions/websocket';
import { getSymbols } from 'actions/symbols';
import Tickers from 'containers/Tickers';
import Trades from 'containers/Trades';
import Orderbook from 'containers/Orderbook';

@connect(state => ({}))
export default class Home extends Component {
  static propTypes = {
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(ws.websocketConnect());
    // dispatch(getSymbols())
  }

  render() {
    return (
      <div className='Home'>
        <Tickers />
        <Trades />
        {/* <Orderbook /> */}
      </div>
    );
  }
}
