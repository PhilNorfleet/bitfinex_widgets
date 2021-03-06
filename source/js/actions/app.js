export const CHANGE_SORT_METHOD = 'CHANGE_SORT_METHOD';
export const SELECT_TICKER = 'SELECT_TICKER';
export const MOUSE_ENTER_TICKER = 'MOUSE_ENTER_TICKER';
export const MOUSE_LEAVE_TICKER = 'MOUSE_LEAVE_TICKER';

export function changeSortMethod(column) {
  return {
    type: CHANGE_SORT_METHOD,
    payload: {
      column,
    },
  };
}

export function selectTicker(symbol, tradesChanId, ordersChanId) {
  return {
    type: SELECT_TICKER,
    payload: { symbol, tradesChanId, ordersChanId },
  };
}
export function mouseEnterTicker(symbol) {
  return {
    type: MOUSE_ENTER_TICKER,
    payload: { symbol },
  };
}
export function mouseLeaveTicker(symbol) {
  return {
    type: MOUSE_LEAVE_TICKER,
    payload: { symbol },
  };
}
