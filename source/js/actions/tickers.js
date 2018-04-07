export const TICKER_RECEIVED = 'TICKER_RECEIVED';

export const tickerReceived = (channel, ticker) => ({
    type: TICKER_RECEIVED,
    payload: {
        channel,
        ticker
});
