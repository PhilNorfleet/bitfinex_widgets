export const ORDERS_SUBSCRIBED = 'ORDERS_SUBSCRIBED';
export const ORDERS_UNSUBSCRIBED = 'ORDERS_UNSUBSCRIBED';
export const ORDERS_RECEIVED = 'ORDERS_RECEIVED';

export const ordersSubscribed = (msg) => ({
    type: ORDERS_SUBSCRIBED,
    payload: msg,
});

export const ordersUnsubscribed = (msg) => ({
    type: ORDERS_UNSUBSCRIBED,
    payload: msg,
});

export const ordersReceived = (orders) => ({
    type: ORDERS_RECEIVED,
    payload: {
        orders,
    }
});