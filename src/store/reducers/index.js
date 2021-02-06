import { combineReducers } from 'redux';
import commonReducer from './common';
import usersListReducer from './usersList';

export default combineReducers({
  common: commonReducer,
  usersList: usersListReducer,
});
