import _ from 'lodash';
import {
    TICKER_RECEIVED,
} from 'actions/tickers';

const initialState = {
    chanIds: {},
    tickers: [],
};

const actionsMap = {
    [TICKER_RECEIVED]: (state, action) => {
        let newState = _.clone(state);
        const data = action.payload;
        chanIds[chanId] = { channel, symbol };
        if (channel === 'trades') {
            tradesChanId = chanId;
        }
        newState.chanIds = chanIds;
        newState.tradesChanId = tradesChanId;
        return {
            ...state,
            ...newState,
        };
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}