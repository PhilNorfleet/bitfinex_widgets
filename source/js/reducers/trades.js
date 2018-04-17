import { sortedUniqBy, sortBy, maxBy } from 'lodash';
import {
  TRADES_SUBSCRIBED,
  TRADES_UNSUBSCRIBED,
  TRADES_RECEIVED,
} from 'actions/trades';

const initialState = {
  trades: [],
  maxAmount: 0,
  tradesChanId: null,
};

const actionsMap = {
  [TRADES_SUBSCRIBED]: (state, action) => {
    const newState = { ...state };
    const { chanId } = { ...action.payload };
    newState.tradesChanId = chanId;
    return {
      ...state,
      ...newState,
    };
  },
  [TRADES_UNSUBSCRIBED]: (state) => {
    const newState = {};
    newState.trades = [];
    newState.maxAmount = 0;
    newState.tradesChanId = null;
    return {
      ...newState,
    };
  },
  [TRADES_RECEIVED]: (state, action) => {
    const newState = { ...state };
    let maxAmount = newState.maxAmount;
    let newTrades = action.payload.trades;
    let trades = newState.trades;
    newTrades.forEach(trade => {
      trades.push({
        timestamp: trade[1],
        amount: trade[2],
        price: trade[3],
      });
    });
    trades = sortBy(trades, 'timestamp');
    trades = sortedUniqBy(trades, 'timestamp').reverse();
    const largest = maxBy(trades, (trade) => {
      const absAmount = Math.abs(trade.amount);
      return absAmount;
    });
    maxAmount = largest ? Math.abs(largest.amount) : 0;
    trades = trades.reduce((acc, trade) => {
      const t = { ...trade }
      t.alpha = Math.abs(t.amount) / maxAmount;
      acc.push(t);
      return acc;
    }, []).slice(0, 25);
    newState.maxAmount = maxAmount;
    newState.trades = trades;
    return {
      ...newState,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}