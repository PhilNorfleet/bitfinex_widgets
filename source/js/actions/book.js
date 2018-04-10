export const BOOK_SUBSCRIBED = 'BOOK_SUBSCRIBED';
export const BOOK_UNSUBSCRIBED = 'BOOK_UNSUBSCRIBED';
export const BOOK_RECEIVED = 'BOOK_RECEIVED';

export const bookSubscribed = (msg) => ({
    type: BOOK_SUBSCRIBED,
    payload: msg,
});

export const bookUnsubscribed = (msg) => ({
    type: BOOK_UNSUBSCRIBED,
    payload: msg,
});

export const bookReceived = (book) => ({
    type: BOOK_RECEIVED,
    payload: {
        book,
    }
});