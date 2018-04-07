import _ from 'lodash';
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_SEND,
  WEBSOCKET_OPEN,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_SUBSCRIBED,
} from 'actions/websocket';

const initialState = {
  connecting: false,
  open: false,
  chanIds: {},
  tickers: [],
  trades: [],
  tradesChanId: null,
  bids: {},
  asks: {},
  bookChanId: null,
};

const actionsMap = {
  [WEBSOCKET_CONNECT]: (state, action) => {
    return {
      ...state,
      connecting: true,
    };
  },
  [WEBSOCKET_OPEN]: (state, action) => {
    return {
      ...state,
      connecting: false,
      open: true,
    };
  },
  [WEBSOCKET_SUBSCRIBED]: (state, action) => {
    const newState = { ...state };
    const { channel, symbol, chanId } = { ...action.payload };
    const chanIds = { ...newState.chanIds };
    chanIds[chanId] = { channel, symbol };
    if (channel === 'trades') {
      newState.trades = [];
      newState.tradesChanId = chanId;
    }
    if (channel === 'book') {
      newState.bids = {};
      newState.asks = {};
      newState.bookChanId = chanId;
    }
    newState.chanIds = chanIds;
    return {
      ...state,
      ...newState,
    };
  },
  [WEBSOCKET_MESSAGE]: (state, action) => {
    const newState = { ...state };
    const data = action.payload;
    const chanId = data[0];
    const chanIds = newState.chanIds;
    const ref = chanIds[chanId];
    if (!ref) return { ...state };
    const channel = chanIds[chanId].channel;
    const symbol = chanIds[chanId].symbol;

    let newData;
    let parsedNewData = {};

    if (channel === 'ticker') {
      const newTickers = _.clone(newState.tickers);
      const [
        bid, bidSize, ask, askSize,
        dailyChange, dailyChangePerc, lastPrice,
        volume, high, low,
      ] = data[1];
      parsedNewData = {
        symbol,
        asset: symbol.slice(1, 4),
        currency: symbol.slice(4),
        bid,
        bidSize,
        ask,
        askSize,
        dailyChange,
        dailyChangePerc,
        lastPrice,
        volume,
        high,
        low,
      };
      const index = _.findIndex(newTickers, { symbol });
      if (index >= 0) {
        newTickers[index] = parsedNewData;
      } else {
        newTickers.push(parsedNewData);
      }
      newState.tickers = newTickers;
    } else if (channel === 'trades' && data[2]) {
      let newTrades = newState.trades;
      newData = data[2].slice(-3);
      parsedNewData = {
        timestamp: newData[0],
        amount: newData[1],
        price: newData[2],
      };
      newTrades.unshift(parsedNewData);
      newTrades = _.uniqBy(newTrades, 'timestamp');
      if (newTrades.length > 25) {
        newTrades.pop();
      }
      newState.trades = newTrades;
    } else if (channel === 'book') {
      const newBids = { ...newState.bids };
      const newAsks = { ...newState.asks };
      const [price, count, amount] = data[1];
      if (typeof price !== 'number') return { ...newState };
      if (count > 0) {
        if (amount > 0) {
          newBids[price] = amount;
        } else if (amount < 0) {
          newAsks[price] = -amount;
        }
      } else if (count === 0) {
        if (amount === 1) {
          delete newBids[price];
        } else if (amount === -1) {
          delete newAsks[price];
        }
      }
      newState.bids = newBids;
      newState.asks = newAsks;
    }
    return {
      ...newState,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
