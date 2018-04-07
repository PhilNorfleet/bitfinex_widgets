import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ws from 'actions/websocket';
import Tickers from 'containers/Tickers';
import Trades from 'containers/Trades';
import Orderbook from 'containers/Orderbook';
import BigTicker from 'containers/BigTicker';

@connect()
export default class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(ws.websocketConnect());
  }
  render() {
    return (
      <div className='Home'>
        <div className='Sidebar'>
          <BigTicker />
          <Tickers />
        </div>
        <div className='Main'>
          <Orderbook />
          <Trades />
        </div>
      </div>
    );
  }
}
