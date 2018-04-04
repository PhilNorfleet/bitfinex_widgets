import { combineReducers } from 'redux';
import app from 'reducers/app';
import symbols from 'reducers/symbols';
import websocket from 'reducers/websocket';

export default combineReducers({
  app,
  symbols,
  websocket,
});
