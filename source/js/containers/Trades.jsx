import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Trades from 'components/Trades.jsx';
import Widget from 'components/widget';

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
const widgetOptions = { 
  header: true,
  collapsable: true,
  name: 'TRADES',
  showSymbol: true,
  style: css`
        float: right;
        width: 33%;
        min-width: 200px;
    `,
};
export default Widget(TradesContainer, widgetOptions);
