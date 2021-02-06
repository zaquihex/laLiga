import { takeLatest, put, call } from 'redux-saga/effects';

import {
  actions,
  getUsersListSuccess,
  getUsersListFailed,
} from '../actions/usersList';
import { baseUrl, commonHeader } from '../../helpers/endpoint';

// Function to get users list
function* getUsersList({ payload }) {
  const { page } = payload;

  try {
    const response = yield call(
      fetch,
      `${baseUrl}/users?page=${page}`,
      {
        headers: commonHeader,
      },
    );
    if (response.ok) {
      const responseParsed = yield response.json();
      const { data, total, total_pages: totalPages } = responseParsed;
      yield put(getUsersListSuccess(data, total, totalPages));
    } else {
      yield put(getUsersListFailed());
    }
  } catch (error) {
    yield put(getUsersListFailed());
  }
}

const usersListSagas = [
  takeLatest(actions.GET_USERS_LIST_START, getUsersList),
];
export default usersListSagas;
