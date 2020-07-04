import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import user from './_reducers/userReducer';

const store = createStore(
  combineReducers({user}),
  {},
  applyMiddleware(logger, thunk)
)

export default store;