import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import results from '../middleware/results'

export default (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, results));
};
