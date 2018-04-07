export const CHANGE_SORT_METHOD = 'CHANGE_SORT_METHOD';
export const SELECT_TICKER = 'SELECT_TICKER';
export const MOUSE_ENTER_TICKER = 'MOUSE_ENTER_TICKER';
export const MOUSE_LEAVE_TICKER = 'MOUSE_LEAVE_TICKER';

export function changeSortMethod(type, direction) {
  return {
    type: CHANGE_SORT_METHOD,
    payload: {
      type,
      direction,
    },
  };
}

export function selectTicker(symbol, tradesChanId, bookChanId) {
  return {
    type: SELECT_TICKER,
    payload: { symbol, tradesChanId, bookChanId },
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
