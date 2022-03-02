import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/auth';
import ErrorReducer from './reducers/errors';

const reducers = combineReducers({AuthReducer, ErrorReducer});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
