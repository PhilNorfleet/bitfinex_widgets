import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Bids from 'components/Bids.jsx';

@connect(state => ({
  bids: state.websocket.bids,
  largestTotalValue: state.websocket.largestTotalValue,
}))
export default class BidsContainer extends Component {
  static propTypes = {
    bids: PropTypes.object,
    largestTotalValue: PropTypes.number,
  }

  render() {
    const {
      bids,
    } = this.props;
    if (bids) {
      return <Bids { ...this.props } key='bids' />;
    }
    return (
      <div> LOADING </div>
    );
  }
}

