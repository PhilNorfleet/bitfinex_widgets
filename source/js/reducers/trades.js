import { sortedUniqBy, sortBy, } from 'lodash';
import {
  TRADES_SUBSCRIBED,
  TRADES_UNSUBSCRIBED,
  TRADES_RECEIVED,
} from 'actions/trades';

const initialState = {
  trades: [],
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
    const newState = { ...state };
    newState.trades = [];
    newState.tradesChanId = null;
    return {
      ...newState,
    };
  },
  [TRADES_RECEIVED]: (state, action) => {
    const newState = { ...state };
    let trades = newState.trades;
    let newTrades = action.payload.trades;
    // snapshot
    newTrades.map(trade => {
      const [
        timestamp,
        amount,
        price,
      ] = trade.slice(-3);
      trades.push({ timestamp, amount, price });
    });
    trades = sortBy(trades, 'timestamp');
    newState.trades = sortedUniqBy(trades, 'timestamp').slice(-25).reverse();
    return {
      ...newState,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}