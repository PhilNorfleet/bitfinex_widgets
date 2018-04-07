import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Bids from 'components/Bids.jsx';

@connect(state => ({
  bids: state.websocket.bids,
}))
export default class BidsContainer extends Component {
  static propTypes = {
    bids: PropTypes.object,
  }

  render() {
    const {
      bids
    } = this.props;
    if (bids) {
      return <Bids bids={ bids } key='bids' />;
    }
    return (
      <div> LOADING </div>
    );
  }
}

