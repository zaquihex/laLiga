import { combineReducers } from 'redux';
import commonReducer from './common';
import usersListReducer from './usersList';
import userDetailReducer from './userDetail';

export default combineReducers({
  common: commonReducer,
  usersList: usersListReducer,
  userDetail: userDetailReducer,
});
