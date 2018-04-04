import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Trades from 'components/Trades.jsx';

@connect(state => ({
    trades: state.websocket.trades,
}))
export default class TradesContainer extends Component {
    static propTypes = {
        trades: PropTypes.array,
    }

    render() {
        const {
            trades,
        } = this.props;
        if (trades) {
            return <Trades trades={trades}/>
        } else {
            return (
                <div> LOADING </div>
            );
        }
    }
}
