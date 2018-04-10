import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Asks from 'components/Asks.jsx';

@connect(state => ({
    asks: state.book.asks,
    largestTotalValue: state.book.largestTotalValue,
}))
export default class asksContainer extends Component {
    static propTypes = {
        asks: PropTypes.object,
        largestTotalValue: PropTypes.number,
    }

    render() {
        const {
            asks
        } = this.props;
        if (asks) {
            return <Asks { ...this.props } key='asks' />;
        }
        return (
            <div> LOADING </div>
        );
    }
}