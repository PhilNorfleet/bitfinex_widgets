import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as ws from 'actions/websocket';
import Tickers from 'containers/Tickers';
import Trades from 'containers/Trades';
import Orderbook from 'containers/Orderbook';
import BigTicker from 'containers/BigTicker';

const Grid = styled.div`
  flex: 1;
  display: grid;
  height: 100%;
  grid-template-columns: 350px 1fr;
  grid-template-rows: repeat(1, 100%);
  grid-gap: var(--gutterPx);
  padding: var(--gutterPx);
  font-size: 12px;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`

`;
@connect()
export default class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(ws.websocketConnect());
  }
  render() {
    return (
      <Grid>
        <Sidebar>
          <BigTicker />
          <Tickers />
        </Sidebar>
        <Main>
          <Orderbook />
          <Trades />
        </Main>
      </Grid>
    );
  }
}
