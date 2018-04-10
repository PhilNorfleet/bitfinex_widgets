import { findIndex, uniqBy, keys } from 'lodash';
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_SEND,
  WEBSOCKET_OPEN,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_SUBSCRIBED,
} from 'actions/websocket';

const initialState = {
  connecting: false,
  open: false,
};

const actionsMap = {
  [WEBSOCKET_CONNECT]: (state) => {
    return {
      ...state,
      connecting: true,
    };
  },
  [WEBSOCKET_OPEN]: (state) => {
    return {
      ...state,
      connecting: false,
      open: true,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
