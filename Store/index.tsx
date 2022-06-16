import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/auth';
import ErrorReducer from './reducers/errors';
import TranslateReducer from './reducers/translate';
import OrganizationReducer from './reducers/organizations_reducer';

const reducers = combineReducers({
  AuthReducer,
  ErrorReducer,
  TranslateReducer,
  OrganizationReducer,
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
