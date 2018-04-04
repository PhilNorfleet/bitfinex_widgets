import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Ticker from 'components/Ticker.jsx';;
import { selectTicker } from 'actions/app';
@connect(state => ({
    tradesChanId: state.websocket.tradesChanId,
}))
export default class TickerContainer extends Component {
    static propTypes = {
        tradesChanId: PropTypes.number,
        rowCount: PropTypes.number,
        first: PropTypes.bool,
        symbol: PropTypes.string,
        last: PropTypes.number,
        delta: PropTypes.number,
        volume: PropTypes.number,
        // from react-redux connect
        dispatch: PropTypes.func,
    }
    format = (number, precision, max) => {
        number = +number
        if (number.toString().length > max) {
            number = +number.toString().slice(0, max);
        }
        let result = (+((number).toPrecision(precision))).toLocaleString();
        return result
    }
    onSelectTicker = (symbol) => {
        const { dispatch, tradesChanId } = this.props;
        dispatch(selectTicker(symbol, tradesChanId))
    }
    render() {
        const {
            rowCount,
            first,
            ticker
        } = this.props;
        return (
            <Ticker 
                rowCount={ rowCount }
                first={first}
                asset={ticker.asset}
                currency={ticker.currency}
                last={this.format(ticker.lastPrice, 9, 8) + ticker.currency}
                delta={this.format(100 * ticker.dailyChangePerc, 2, 4) }
                volume={ this.format(ticker.volume.toFixed(0), 10, 10) }
                onSelectTicker={this.onSelectTicker}/>
        );
    }
}