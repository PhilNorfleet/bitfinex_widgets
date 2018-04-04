export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_ERROR = 'WEBSOCKET_ERROR';
export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN';
export const WEBSOCKET_CLOSE = 'WEBSOCKET_CLOSE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';
export const WEBSOCKET_SUBSCRIBED = 'WEBSOCKET_SUBSCRIBED';

export const websocketConnect = () => ({ type: WEBSOCKET_CONNECT });
export const websocketOpen = () => ({ type: WEBSOCKET_OPEN });
export const websocketClose = () => ({ type: WEBSOCKET_CLOSE });

export const websocketError = (err) => ({ 
    type: WEBSOCKET_ERROR,
    payload: err,
});
export const websocketMessage = (msg) => ({ 
    type: WEBSOCKET_MESSAGE,
    payload: JSON.parse(msg.data),
});
export const websocketSubscribed = (msg) => ({ 
    type: WEBSOCKET_SUBSCRIBED,
    payload: JSON.parse(msg.data),
});

export const websocketSubscribe = (channel, symbol) => {
    const msg = {
        event: 'subscribe',
        channel,
        symbol: 't' + symbol,
    }
    return {
        type: WEBSOCKET_SEND,
        payload: { msg }
    };
}

export const websocketUnsubscribe = (chanId) => {
    const msg = {
        event: 'unsubscribe',
        chanId,
    }
    return {
        type: WEBSOCKET_SEND,
        payload: { msg }
    };
}