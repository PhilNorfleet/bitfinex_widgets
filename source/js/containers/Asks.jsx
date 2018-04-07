import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Asks from 'components/Asks.jsx';

@connect(state => ({
    asks: state.websocket.asks,
}))
export default class asksContainer extends Component {
    static propTypes = {
        asks: PropTypes.object,
    }

    render() {
        const {
            asks
        } = this.props;
        if (asks) {
            return <Asks asks={asks} key='asks' />;
        }
        return (
            <div> LOADING </div>
        );
    }
}