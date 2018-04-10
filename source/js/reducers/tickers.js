import { findIndex } from 'lodash';
import {
  TICKERS_RECEIVED,
} from 'actions/tickers';

const initialState = {};

const actionsMap = {
  [TICKERS_RECEIVED]: (state, action) => {
    const newState = { ...state };
    const { tickers } = action.payload;
    tickers.forEach(ticker => {
      const symbol = ticker.pop();
      const [
        bid, bidSize, ask, askSize,
        dailyChange, dailyChangePerc, lastPrice,
        volume, high, low,
      ] = ticker;
      const parsedNewTicker = {
        symbol: symbol.slice(1),
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
      newState[symbol.slice(1)] = parsedNewTicker;
    });
    return {
      ...state,
      ...newState,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}