// basic imports
import { all } from 'redux-saga/effects';
import usersListSagas from './usersList';
import commonSagas from './common';
import userDetailSagas from './userDetail';

export default function* rootSaga() {
  yield all([
    ...commonSagas,
    ...usersListSagas,
    ...userDetailSagas,
  ]);
}
