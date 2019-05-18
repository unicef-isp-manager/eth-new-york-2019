import { combineReducers, createStore, applyMiddleware } from 'redux';
import { handleActions } from 'redux-actions';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { taskMiddleware } from 'react-palm/tasks';
import appReducers, { INITIAL_APP_STATE } from './reducers/reducers';

// Combine all reducers to pass to the store
const createReducer = (history, asyncReducers) => combineReducers({
  app: handleActions(appReducers, INITIAL_APP_STATE),
  router: connectRouter(history),
  ...asyncReducers,
});

// Creating the store
const initializeStore = (history) => {
  // Setup middlewares
  const middlewares = [thunk, taskMiddleware, routerMiddleware(history)];

  // Create the store
  const store = createStore(createReducer(history), applyMiddleware(...middlewares));

  // Setup injectReducer function
  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(history, store.asyncReducers));
    return store;
  };

  return store;
};

export default initializeStore;
