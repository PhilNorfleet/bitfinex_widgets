export const CHANGE_SORT_METHOD = 'CHANGE_SORT_METHOD';
export const SELECT_TICKER = 'SELECT_TICKER';

export function changeSortMethod(type, direction) {
  return {
    type: CHANGE_SORT_METHOD,
    payload: {
      type,
      direction,
    },
  };
}

export function selectTicker(symbol, tradesChanId) {
  return {
    type: SELECT_TICKER,
    payload: { symbol, tradesChanId }
  }
}
