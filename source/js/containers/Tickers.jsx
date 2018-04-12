import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { css } from 'styled-components';
import Tickers from 'components/Tickers';
import BigTicker from 'components/BigTicker';
import Widget from 'components/widget';

@connect(state => ({
    loading: state.symbols.loading,
    error: state.symbols.error,
    tickers: state.tickers,
    sortMethod: state.app.sortMethod,
    mousedOverSymbol: state.app.mousedOverSymbol,
    symbol: state.app.symbol,
}))
export class TickersContainer extends Component {
    static propTypes = {
        tickers: PropTypes.object,
        sortMethod: PropTypes.object,
        symbol: PropTypes.string,
    }
    sort(tickers) {
        const { sortMethod } = this.props;
        const method = sortMethod || { type:'symbol', direction: 'desc' };
        const sorted = orderBy(tickers, [method.type], [method.direction]);
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
const widgetOptions = {
    header: true,
    collapsable: true,
    name: 'TICKERS',
    showSymbol: false,
    style: css`
        flex: 0 1 auto;
    `,
};
export default Widget(TickersContainer, widgetOptions);
