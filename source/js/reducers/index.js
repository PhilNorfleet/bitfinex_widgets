import { combineReducers } from 'redux';
import app from 'reducers/app';
import symbols from 'reducers/symbols';
import websocket from 'reducers/websocket';
import tickers from 'reducers/tickers';
import trades from 'reducers/trades';
import orders from 'reducers/orders';

export default combineReducers({
  app,
  symbols,
  websocket,
  tickers,
  trades,
  orders,
});
