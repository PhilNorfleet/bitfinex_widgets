import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tickers from 'components/Tickers';
import BigTicker from 'components/BigTicker';
import Widget from 'components/widget';

@connect(state => ({
    loading: state.symbols.loading,
    error: state.symbols.error,
    tickers: state.websocket.tickers,
    sortMethod: state.app.sortMethod,
    mousedOverSymbol: state.app.mousedOverSymbol,
    symbol: state.app.symbol,
}))
export class TickersContainer extends Component {
    static propTypes = {
        tickers: PropTypes.array,
        sortMethod: PropTypes.object,
        symbol: PropTypes.string,
    }
    sort(tickers) {
        const { sortMethod } = this.props;
        if (!sortMethod) return tickers;
        const sorted = _.orderBy(tickers, [sortMethod.type], [sortMethod.direction]);
        return sorted;
    }
    render() {
        const {
            loading,
            error,
            tickers,
        } = this.props;
        if (tickers) {
            return <Tickers tickers={this.sort(tickers)}/>
        } else {
            return (
                <div> LOADING </div>
            );
        }
    }
}
export default Widget(TickersContainer, { header: true, collapsable: true });
