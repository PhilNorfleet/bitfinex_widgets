import { takeLatest, call, put, all } from 'redux-saga/effects';
import { selectTicker } from 'actions/app';
import {
  GET_SYMBOLS_START,
  GET_SYMBOLS_ERROR,
  GET_SYMBOLS_SUCCESS,
} from 'actions/symbols';
import api from 'api';
import { websocketSubscribe } from '../actions/websocket';

// -------- Get Symbols

function createGetSymbols() {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getSymbols(options.id));
      const parsedData = data.map(symbol => { return symbol.toUpperCase(); })
      const action = { type: GET_SYMBOLS_SUCCESS, data: parsedData };
      yield put(action);
    } catch (error) {
      const action = { type: GET_SYMBOLS_ERROR, error };
      yield put(action);
    }
  };
}

function* subscribeToSymbols(msg) {
  const subscriptions = msg.data.map(symbol => {
    return put(websocketSubscribe('ticker', symbol));
  })
  subscriptions.unshift(put(selectTicker(msg.data[0])));
  yield all(subscriptions);
}

export const getSymbols = createGetSymbols();

export function* getSymbolsWatcher() {
  yield all([
    takeLatest(GET_SYMBOLS_START, getSymbols),
    takeLatest(GET_SYMBOLS_SUCCESS, subscribeToSymbols),
  ]);
}

export default [
  getSymbolsWatcher(),
];
