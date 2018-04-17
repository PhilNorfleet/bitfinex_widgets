import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Trades from 'components/Trades.jsx';

@connect(state => ({
  trades: state.trades.trades,
}))
export class TradesContainer extends Component {
  static propTypes = {
    trades: PropTypes.array,
  }

  render() {
    const {
      trades,
    } = this.props;
    if (trades) {
      return <Trades trades={ trades } />;
    }
    return (
      <div> LOADING </div>
    );
  }
}
export default TradesContainer;
