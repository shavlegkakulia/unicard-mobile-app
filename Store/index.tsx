import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/auth';

const reducers = combineReducers({AuthReducer});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
