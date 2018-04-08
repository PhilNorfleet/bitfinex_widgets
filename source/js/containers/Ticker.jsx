import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Ticker from 'components/Ticker.jsx';;
import { selectTicker, mouseEnterTicker, mouseLeaveTicker } from 'actions/app';
import format from 'utils/formatNumber';


@connect(state => ({
    tradesChanId: state.websocket.tradesChanId,
    bookChanId: state.websocket.bookChanId,
}))
export default class TickerContainer extends Component {
    static propTypes = {
        tradesChanId: PropTypes.number,
        bookChanId: PropTypes.number,
        rowCount: PropTypes.number,
        first: PropTypes.bool,
        dispatch: PropTypes.func,
    }
    constructor(props) {
        super(props)
        this.state = { mousedOver: false }
    }
    format = (number, precision, max) => {
        number = +number;
        if (number.toString().length > max) {
            number = +number.toString().slice(0, max);
        }
        let result =  +(number).toPrecision(precision);
        return result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: precision });
    }
    onSelectTicker = (symbol) => {
        const { dispatch, tradesChanId, bookChanId } = this.props;
        dispatch(selectTicker(symbol, tradesChanId, bookChanId));
    }
    onMouseEnterTicker = (symbol) => {
        const { dispatch } = this.props;
        this.setState({ mousedOver: true })
        dispatch(mouseEnterTicker(symbol));
    }
    onMouseLeaveTicker = (symbol) => {
        const {dispatch} = this.props;
        this.setState({ mousedOver: false })
        dispatch(mouseLeaveTicker(symbol));
    }
    render() {
        const {
            rowCount,
            first,
            ticker,
        } = this.props;
        const iconName = ticker.asset.charAt(0) + ticker.asset.slice(1).toLowerCase();
        return (
            <Ticker 
                rowCount={ rowCount }
                first={ first }
                iconName={ iconName }
                asset={ ticker.asset }
                currency={ ticker.currency }
                price={ format(ticker.lastPrice, 6, 8) + ticker.currency }
                delta={ format(100 * ticker.dailyChangePerc, 3, 4, 2) }
                volume={ format(ticker.volume.toFixed(0), 10, 10) }
                mousedOver={ this.state.mousedOver }
                onSelectTicker={ this.onSelectTicker }
                onMouseEnterTicker={ this.onMouseEnterTicker }
                onMouseLeaveTicker={ this.onMouseLeaveTicker }/>
        );
    }
}