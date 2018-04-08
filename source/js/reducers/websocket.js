import { clone, findIndex, uniqBy, sortBy, keys } from 'lodash';
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
  largestTotalValue: 0,
  bookChanId: null,
};

const actionsMap = {
  [WEBSOCKET_CONNECT]: (state) => {
    return {
      ...state,
      connecting: true,
    };
  },
  [WEBSOCKET_OPEN]: (state) => {
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
      newState.largestTotalValue = 0;
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

    if (channel === 'ticker') {
      const newTickers = clone(newState.tickers);
      const [
        bid, bidSize, ask, askSize,
        dailyChange, dailyChangePerc, lastPrice,
        volume, high, low,
      ] = data[1];
      const parsedNewData = {
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
      const index = findIndex(newTickers, { symbol });
      if (index >= 0) {
        newTickers[index] = parsedNewData;
      } else {
        newTickers.push(parsedNewData);
      }
      newState.tickers = newTickers;
    } else if (channel === 'trades') {
      let tradeData;
      let newTrades = newState.trades;
      // snapshot
      if (data[1].length > 10) {
        tradeData = data[1];
      } else if (data[2]) {
        tradeData = [data[2]];
      }
      tradeData.forEach(trade => {
        const [
          timestamp,
          amount,
          price,
         ] = trade.slice(-3);
        newTrades.unshift({ timestamp, amount, price });
      })
      const t = 'timestamp';
      newTrades = uniqBy(newTrades, t).slice(-25).reverse();
      newState.trades = newTrades;
    } else if (channel === 'book') {
      let newBids = { ...newState.bids };
      let newAsks = { ...newState.asks };
      let newOrders;
      if (data[1].length > 3) {
        // snapshot
        newBids = {};
        newAsks = {};
        newOrders = data[1];
      } else if (data[1].length === 3) {
        newOrders = [data[1]];
      }
      newOrders.forEach(order => {
        const [price, count, amount] = order;
        if (typeof price !== 'number') return { ...newState };
        if (count > 0) {
          if (amount > 0) {
            newBids[price] = { amount, count };
          } else if (amount < 0) {
            newAsks[price] = { amount: -amount, count };
          }
        } else if (count === 0) {
          if (amount === 1) {
            delete newBids[price];
          } else if (amount === -1) {
            delete newAsks[price];
          }
        }
      });
      const bidsValue = keys(newBids).reduce((a, x) => {
        return a + (+x * newBids[x].amount);
      }, 0);
      const asksValue = keys(newAsks).reduce((a, x) => {
        return a + (+x * newAsks[x].amount);
      }, 0);
      newState.bids = newBids;
      newState.asks = newAsks;
      newState.largestTotalValue = Math.max(bidsValue, asksValue);
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
