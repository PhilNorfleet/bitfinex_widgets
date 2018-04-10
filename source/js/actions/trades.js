export const TRADES_SUBSCRIBED = 'TRADES_SUBSCRIBED';
export const TRADES_UNSUBSCRIBED = 'TRADES_UNSUBSCRIBED';
export const TRADES_RECEIVED = 'TRADES_RECEIVED';

export const tradesSubscribed = (msg) => ({
    type: TRADES_SUBSCRIBED,
    payload: msg,
});

export const tradesUnsubscribed = (msg) => ({
    type: TRADES_UNSUBSCRIBED,
    payload: msg,
});

export const tradesReceived = (trades) => ({
    type: TRADES_RECEIVED,
    payload: {
        trades,
    }
});