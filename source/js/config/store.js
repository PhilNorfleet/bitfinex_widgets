import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'dev/logger';

import rootSaga from 'sagas';
import rootReducer from 'reducers';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

let initialState = {};

export default () => {
  let store = null;
  let middleware = null;

  const sagaMiddleware = createSagaMiddleware();

  if (IS_PRODUCTION) {
    middleware = applyMiddleware(sagaMiddleware);
  } else {
    middleware = applyMiddleware(sagaMiddleware, logger);
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }

  store = createStore(
    rootReducer,
    initialState,
    middleware
  );

  sagaMiddleware.run(rootSaga);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    store,
  };
};
