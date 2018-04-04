import _ from 'lodash';
import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_SEND,
    WEBSOCKET_OPEN,
    WEBSOCKET_MESSAGE,
    WEBSOCKET_SUBSCRIBED
} from 'actions/websocket';

const initialState = {
    connecting: false,
    open: false,
    chanIds: {},
    tickers: [],
    trades: [],
    tradesChanId: null,
};

const actionsMap = {
    [WEBSOCKET_CONNECT]: (state, action) => {
        return {
            ...state,
            connecting: true,
        }
    },
    [WEBSOCKET_OPEN]: (state, action) => {
        return {
            ...state,
            connecting: false,
            open: true
        }
    },
    [WEBSOCKET_SUBSCRIBED]: (state, action) => {
        const chanId = action.payload.chanId;
        const symbol = action.payload.symbol;
        const channel = action.payload.channel;
        let newState = _.clone(state);
        let chanIds = _.clone(newState.chanIds);
        let tradesChanId = _.clone(newState.tradesChanId);
        chanIds[chanId] = { channel, symbol };
        if (channel === 'trades') {
            tradesChanId = chanId;
        }
        newState.chanIds = chanIds;
        newState.tradesChanId = tradesChanId;
        return {
            ...state,
            ...newState
        };
    },
    [WEBSOCKET_MESSAGE]: (state, action) => {
        let newState = _.clone(state);
        const data = action.payload;
        const chanId = data[0];
        const chanIds = _.clone(newState.chanIds);
        const ref = chanIds[chanId];
        if (!ref) return { ...state }
        const channel = chanIds[chanId].channel;
        const symbol = chanIds[chanId].symbol;

        let newData;
        let parsedNewData = {};

        if (channel === 'ticker') {
            let newTickers = _.clone(newState.tickers);
            newData = data[1];
            parsedNewData = {
                symbol,
                asset: symbol.slice(1, 4),
                currency: symbol.slice(4),
                bid: newData[0],
                bidSize: newData[1],
                ask: newData[2],
                askSize: newData[3],
                dailyChange: newData[4],
                dailyChangePerc: newData[5],
                lastPrice: newData[6],
                volume: newData[7],
                high: newData[8],
                low: newData[9],
            }
            const index = _.findIndex(newTickers, {symbol});
            if (index >= 0) {
                newTickers[index] = parsedNewData;
            } else {
                newTickers.push(parsedNewData);
            }
            newState.tickers = newTickers;
        } else if (channel === 'trades' && data[2]) {
            let newTrades = _.clone(newState.trades);
            newData = data[2].slice(-3);
            parsedNewData = {
                timestamp: newData[0],
                amount: newData[1],
                price: newData[2],
            }
            newTrades.unshift(parsedNewData);
            newTrades = _.uniqBy(newTrades, 'timestamp'); 
            if (newTrades.length > 100) {
                newTrades.pop()
            }
            newState.trades = newTrades;
        }
        
        return {
            ...state,
            ...newState
        };
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}