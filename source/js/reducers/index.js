import { combineReducers } from 'redux';
import app from 'reducers/app';
import symbols from 'reducers/symbols';
import websocket from 'reducers/websocket';
import tickers from 'reducers/tickers';
import trades from 'reducers/trades';
import book from 'reducers/book';

export default combineReducers({
  app,
  symbols,
  websocket,
  tickers,
  trades,
  book,
});
