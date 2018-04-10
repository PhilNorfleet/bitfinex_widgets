export const TICKERS_SUBSCRIBED = 'TICKERS_SUBSCRIBED';
export const TICKERS_UNSUBSCRIBED = 'TICKERS_UNSUBSCRIBED';
export const TICKERS_RECEIVED = 'TICKERS_RECEIVED';

export const tickersSubscribed = (msg) => ({
    type: TICKERS_SUBSCRIBED,
    payload: msg,
});

export const tickersUnsubscribed = (msg) => ({
    type: TICKERS_UNSUBSCRIBED,
    payload: msg,
});

export const tickersReceived = (tickers) => ({
    type: TICKERS_RECEIVED,
    payload: {
        tickers,
    }
});
