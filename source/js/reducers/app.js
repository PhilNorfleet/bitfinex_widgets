import {
  CHANGE_SORT_METHOD,
  SELECT_TICKER,
} from 'actions/app';

const initialState = {
  sortMethod: null,
  symbol: null,
};

const actionsMap = {
  [CHANGE_SORT_METHOD]: (state, action) => {
    const type = action.payload.type;
    const direction = action.payload.direction;

    return {
      ...state,
      sortMethod: { type, direction },
    }
  },
  [SELECT_TICKER]: (state, action) => {
    const symbol = action.payload.symbol;
    return {
      ...state,
      symbol
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
