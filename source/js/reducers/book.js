import {
  BOOK_SUBSCRIBED,
  BOOK_UNSUBSCRIBED,
  BOOK_RECEIVED,
} from 'actions/book';

const initialState = {
  bids: {},
  asks: {},
  bidsValue: 0,
  asksValue: 0,
  largestTotalValue: 0,
  bookChanId: null,
};

const actionsMap = {
  [BOOK_SUBSCRIBED]: (state, action) => {
    const newState = { ...state };
    const { chanId } = { ...action.payload };
    newState.bookChanId = chanId;
    return {
      ...state,
      ...newState,
    };
  },
  [BOOK_UNSUBSCRIBED]: (state) => {
    const newState = { ...state };
    newState.bids = {};
    newState.asks = {};
    newState.bookChanId = null;
    newState.bidsValue = 0;
    newState.asksValue = 0;
    newState.largestTotalValue = 0;
    return {
      ...newState,
    };
  },
  [BOOK_RECEIVED]: (state, action) => {
    const newState = {};
    const newOrders = action.payload.book;
    const { bids, asks } = state;
    let { bidsValue, asksValue } = state;
    newOrders.forEach(order => {
      const [price, count, amount] = order;
      const value = price * amount;
      if (count > 0) {
        if (amount > 0) {
          if (bids[price]) {
            bidsValue -= (price * bids[price].amount);
          }
          bids[price] = { amount, count };
          bidsValue += value;
            
        } else if (amount < 0) {
          if (asks[price]) {
            asksValue -= (price * asks[price].amount);
          }
          asks[price] = { amount: -amount, count };
          asksValue += -value;
        }
      } else if (count === 0) {
        if (amount === 1) {
          bidsValue -= (bids[price].amount * price);
          delete bids[price];
        } else if (amount === -1) {
          asksValue -= (asks[price].amount * price);
          delete asks[price];
        }
      }
    });
    newState.bids = bids;
    newState.asks = asks;
    newState.bidsValue = bidsValue;
    newState.asksValue = asksValue;
    newState.largestTotalValue = Math.max(bidsValue, asksValue);
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
