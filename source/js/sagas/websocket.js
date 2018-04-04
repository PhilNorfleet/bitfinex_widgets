import { takeLatest, call, put, take, fork } from 'redux-saga/effects';
import { takeEvery, eventChannel } from 'redux-saga';
import { bindActionCreators } from 'redux';

import * as ws from '../actions/websocket';
import { SELECT_TICKER } from '../actions/app';
import {
    GET_SYMBOLS_START,
} from '../actions/symbols';

function* createEventChannel(websocket) {
    return eventChannel(emitter => {
        
        websocket.onopen = () => {
            emitter(ws.websocketOpen());
            emitter({type:GET_SYMBOLS_START})
        }
        websocket.onclose = () => {
            return emitter(ws.websocketClose());
        }
        websocket.onerror = (err) => {
            return emitter(ws.websocketError(err));
        }
        websocket.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            if (data.event == 'subscribed') {
                return emitter(ws.websocketSubscribed(msg));
            } else if (data[1] != 'hb' && data.event != 'info') {
                return emitter(ws.websocketMessage(msg));
            }
        }
        return () => {
            websocket.close();
        };
    })
}
function* send(websocket, action) {
    websocket.send(JSON.stringify(action.payload.msg))
}
function* initWSChannel() {
    window.websocket = new WebSocket('wss://api.bitfinex.com/ws/2')
    const websocket = window.websocket;
    const channel = yield call(createEventChannel, websocket);
    while (true) {
        const initAction = yield take(channel);
        yield put(initAction)
        
    }
}
function* sendWS(action) {
    const websocket = window.websocket;
    yield call(send, websocket, action);
}

function* handleSelectTicker(action) {
    const websocket = window.websocket;
    console.log(action)
    yield call(send, websocket, ws.websocketUnsubscribe(action.payload.tradesChanId));
    yield call(send, websocket, ws.websocketSubscribe('trades', action.payload.symbol));
}
export default function* websocketSaga() {
    yield [
        takeLatest(ws.WEBSOCKET_CONNECT, initWSChannel),
        takeLatest(ws.WEBSOCKET_SEND, sendWS),
        takeLatest(SELECT_TICKER, handleSelectTicker),
    ];
    
 }