import { takeEvery, takeLatest, call, put, take, all, fork, cancel } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import * as ws from '../actions/websocket';
import { SELECT_TICKER } from '../actions/app';
import { tickersSubscribed, tickersUnsubscribed, tickersReceived } from '../actions/tickers';
import { tradesSubscribed, tradesUnsubscribed, tradesReceived } from '../actions/trades';
import { ordersSubscribed, ordersUnsubscribed, ordersReceived } from '../actions/orders';
import { GET_SYMBOLS_START } from '../actions/symbols';

function routeSubscribe(payload) {
  const { channel, symbol, chanId } = { ...payload };
  switch (channel) {
    case 'ticker':
      return tickersSubscribed({ symbol, chanId });
    case 'trades':
      return tradesSubscribed({ symbol, chanId });
    case 'book':
      return ordersSubscribed({ symbol, chanId });
    default:
      return ws.websocketSubscribed(payload);
  }
}

const routeUnsubscribed = (channel) => {
  switch (channel) {
    case 'ticker':
      return tickersUnsubscribed();
    case 'trades':
      console.log(this.tradesBatch)
      return tradesUnsubscribed();
    case 'book':
      return ordersUnsubscribed();
    default:
      return ws.websocketUnsubscribed();
  }
}

function routeMessages(payload, chanIds) {
  const chanId = payload[0];
  if (chanIds && chanIds[chanId]) {
    switch (chanIds[chanId].channel) {
      case 'ticker':
        return tickersReceived(chanIds[chanId].symbol, payload[1]);
        break;
      case 'trades':
        // snapshot
        if (Array.isArray(payload[1])) {
          return tradesReceived(payload[1]);
        } else if (Array.isArray(payload[2])) {
          return tradesReceived([payload[2]]);
        }
        break;
      case 'book':
        // snapshot
        if (payload[1].length > 10) {
          return ordersReceived(payload[1]);
        } else if (payload[1].length === 3) {
          return ordersReceived([payload[1]]);
        }
        break;
      default:

        break;
    }
  }
  return ws.websocketMessage(payload);
}

const createEventChannel = (websocket) => {
  const chanIds = {};
  return eventChannel((emitter) => {
    let tickers = [];
    let trades = [];
    let orders = [];
    websocket.onopen = () => {
      this.tickersBatch = setInterval(() => {
        if (tickers.length) {
          emitter(tickersReceived(tickers));
        }
        tickers = [];
      }, 100);
      this.tradesBatch = setInterval(() => {
        if (trades.length) {
          emitter(tradesReceived(trades));
        }
        trades = [];
      }, 100);
      this.ordersBatch = setInterval(() => {
        if (orders.length) {
          emitter(ordersReceived(orders));
        }
        orders = [];
      }, 100);
      emitter(ws.websocketOpen());
      emitter({ type: GET_SYMBOLS_START });
    };
    websocket.onclose = () => {
      return emitter(ws.websocketClose());
    };
    websocket.onerror = (err) => {
      return emitter(ws.websocketError(err));
    };
    websocket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.event === 'subscribed') {
        chanIds[data.chanId] = data;
        return emitter(routeSubscribe(data));
      } else if (data.event === 'unsubscribed' && data.status === 'OK') {
        const channel = chanIds[data.chanId].channel.slice();
        delete chanIds[data.chanId];
        return emitter(routeUnsubscribed(channel));
      } else if (data[1] !== 'hb' && data.event !== 'info') {
        if (chanIds[data[0]]) {
          switch (chanIds[data[0]].channel) {
            case 'ticker':
              (data[1]).push(chanIds[data[0]].symbol);
              tickers.push(data[1]);
              break;
            case 'trade':
              trades.push(data[1])
              break;
            case 'book':
              if (data[1].length > 3) {
                orders = data[1];
              } else {
                orders.push(data[1])
              }
              
              break;
            default:
              emitter(routeMessages(data, chanIds));
          }
        }
      }
    };
    return () => {
      clearInterval(tickersBatch);
      websocket.close();
    };
  }); 
}

function* initWSChannel() {
  window.websocket = new WebSocket('wss://api.bitfinex.com/ws/2');
  const websocket = window.websocket;
  const channel = yield call(createEventChannel, websocket);
  while (true) {
    const initAction = yield take(channel);
    yield put(initAction);
  }
}

function send(websocket, action) {
  websocket.send(JSON.stringify(action.payload.msg));
}

function* sendWS(action) {
  const websocket = window.websocket;
  yield call(send, websocket, action);
}

function* handleSelectTicker(action) {
  yield sendWS(ws.websocketUnsubscribe(action.payload.tradesChanId));
  yield sendWS(ws.websocketSubscribe('trades', action.payload.symbol));
  yield sendWS(ws.websocketUnsubscribe(action.payload.ordersChanId));
  yield sendWS(ws.websocketSubscribe('book', action.payload.symbol));

}
export default function* websocketSaga() {
  yield all([
    takeLatest(ws.WEBSOCKET_CONNECT, initWSChannel),
    takeLatest(ws.WEBSOCKET_SEND, sendWS),
    takeEvery(ws.WEBSOCKET_MESSAGE, routeMessages),
    takeLatest(SELECT_TICKER, handleSelectTicker),
  ]);
}
