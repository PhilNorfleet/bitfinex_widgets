import { all } from 'redux-saga/effects';

import symbolsSagas from './symbols';
import websocketSaga from './websocket';

export default function* rootSaga() {
  yield all([
    ...symbolsSagas,
    websocketSaga(),
  ]);
}
