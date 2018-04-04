export const GET_SYMBOLS_START = 'GET_SYMBOLS_START';
export const GET_SYMBOLS_ERROR = 'GET_SYMBOLS_ERROR';
export const GET_SYMBOLS_SUCCESS = 'GET_SYMBOLS_SUCCESS';


export function getSymbols() {
  return {
    type: GET_SYMBOLS_START,
  };
}

