import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { logger } from 'redux-logger';
import user from './_reducers/userReducer';
import chat from './_reducers/chatReducer';

const store = createStore(
  combineReducers({ user, chat}),
  {},
  applyMiddleware(/* logger, */ thunk)
)

export default store;