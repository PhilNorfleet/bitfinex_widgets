import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BigTicker from 'components/BigTicker';
import format from 'utils/formatNumber';
import Widget from 'components/widget';
import { findIndex } from 'lodash';

@connect(state => ({
    tickers: state.websocket.tickers,
    mousedOverSymbol: state.app.mousedOverSymbol,
    symbol: state.app.symbol,
}))
export class BigTickerContainer extends Component {
    static propTypes = {
        tickers: PropTypes.array,
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
            const bigTicker = tickers[
                findIndex(tickers, { symbol: `t${ bigTickerSymbol }` })
            ];
            if (bigTicker) {
                const {
                    lastPrice,
                    volume,
                    dailyChange,
                    dailyChangePerc,
                    low,
                    high,
                } = bigTicker;
                return (
                    <BigTicker
                        symbol={ symbol }
                        lastPrice={ format(lastPrice, 8, 8) }
                        volume={ format(volume.toFixed(0), 8, 8) }
                        dailyChange={ format(dailyChange, 8, 8) }
                        dailyChangePerc={ format(100 * dailyChangePerc, 3, 4) }
                        low={ format(low, 8, 8) }
                        high={ format(high, 8, 8) } />
                )
            }
        } 
        return (
            <div> LOADING </div>
        );
    }
}
export default Widget(BigTickerContainer, { header: false });
