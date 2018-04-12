import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BigTicker from 'components/BigTicker';
import format from 'utils/formatNumber';
import Widget from 'components/widget';
import { css } from 'styled-components';
import { findIndex } from 'lodash';

@connect(state => ({
  tickers: state.tickers,
  mousedOverSymbol: state.app.mousedOverSymbol,
  symbol: state.app.symbol,
}))
export class BigTickerContainer extends Component {
  static propTypes = {
    tickers: PropTypes.object,
    symbol: PropTypes.string,
    mousedOverSymbol: PropTypes.string,
  }
  render() {
    const {
      tickers,
      symbol,
      mousedOverSymbol,
    } = this.props;
    if (tickers) {
      const bigTickerSymbol = mousedOverSymbol || symbol;
      const bigTicker = tickers[bigTickerSymbol];
      if (bigTicker) {
        const {
          lastPrice,
          volume,
          dailyChange,
          dailyChangePerc,
          low,
          high,
        } = bigTicker;
        const formatOpts = {
          price: { precision: 6 },
          percent: { precision: 3, max: 4, minDecimals: 2 },
        }
        return (
          <BigTicker
            symbol={ bigTickerSymbol }
            lastPrice={ format(lastPrice, formatOpts.price) }
            volume={ format(volume.toFixed(0)) }
            dailyChange={ format(dailyChange) }
            dailyChangePerc={ format(100 * dailyChangePerc, formatOpts.percent) }
            low={ format(low) }
            high={ format(high) } 
          />
        );
      }
    }
    return (
      <div> LOADING </div>
    );
  }
}
const widgetStyle = css`
  flex: 0 0 auto;
  order: 0;
`;
export default Widget(BigTickerContainer, { header: false, style: widgetStyle });
