import {
  CHANGE_SORT_METHOD,
  SELECT_TICKER,
  MOUSE_ENTER_TICKER,
  MOUSE_LEAVE_TICKER,
} from 'actions/app';
import { changeSortMethod } from '../actions/app';

const initialState = {
  themeName: 'dark1',
  sortMethod: { type: null, direction: null },
  symbol: null,
  mousedOverSymbol: null,
};

const actionsMap = {
  [CHANGE_SORT_METHOD]: (state, action) => {
    let column = action.payload.column;
    const oldColumn = state.sortMethod.column;
    const oldDirection = state.sortMethod.direction;
    let direction;
    if (column === oldColumn) {
      switch (oldDirection) {
        case 'desc':
          direction = 'asc';
          break;
        case 'asc':
          direction = null;
          break;
        default:
          direction = 'desc';
      }
    } else {
      direction = 'desc';
    }
    if (!direction) {
      column = null;
    }
    console.log(column, direction)
    return {
      ...state,
      sortMethod: { column, direction },
    }
  },
  [SELECT_TICKER]: (state, action) => {
    const symbol = action.payload.symbol;
    return {
      ...state,
      symbol
    }
  },
  [MOUSE_ENTER_TICKER]: (state, action) => {
    const symbol = action.payload.symbol;
    return {
      ...state,
      mousedOverSymbol: symbol,
    }
  },
  [MOUSE_LEAVE_TICKER]: (state, action) => {
    const symbol = action.payload.symbol;
    return {
      ...state,
      mousedOverSymbol: null,
    }
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
