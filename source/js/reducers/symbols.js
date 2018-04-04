import {
  GET_SYMBOLS_START,
  GET_SYMBOLS_ERROR,
  GET_SYMBOLS_SUCCESS,
} from 'actions/symbols';

const initialState = {
  loading: false,
  error: null,
  symbols: null,
};

const actionsMap = {
  [GET_SYMBOLS_START]: (state) => {
    return {
      ...state,
      loading: true,
      error: null,
      symbols: null,
    };
  },
  [GET_SYMBOLS_ERROR]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.message,
    };
  },
  [GET_SYMBOLS_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      symbols: action.data
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
