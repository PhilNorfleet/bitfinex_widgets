import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import Tickers from 'components/Tickers';
import BigTicker from 'components/BigTicker';

@connect(state => ({
  loading: state.symbols.loading,
  error: state.symbols.error,
  tickers: state.tickers,
  sortMethod: state.app.sortMethod,
}))
export class TickersContainer extends Component {
  static propTypes = {
    tickers: PropTypes.object,
    sortMethod: PropTypes.object,
  }
  sort(tickers) {
    const { sortMethod } = this.props;
    const method = sortMethod || { column: 'symbol', direction: 'desc' };
    const sorted = orderBy(tickers, [method.column], [method.direction]);
    return sorted;
  }
  render() {
    const {
      loading,
      error,
      tickers,
    } = this.props;
    if (tickers) {
      return <Tickers tickers={ this.sort(tickers) } />;
    } 
    return (
      <div> LOADING </div>
    );
  }
}
export default TickersContainer;
