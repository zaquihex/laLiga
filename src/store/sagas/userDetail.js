import { takeLatest, put, call } from 'redux-saga/effects';

import {
  actions,
  getUserDetailSuccess,
  getUserDetailFailed,
  updateDataSuccess,
  updateDataFailed, deleteUserSuccess, deleteUserFailed,
} from '../actions/userDetail';
import { baseUrl, commonHeader } from '../../helpers/endpoint';

function* getUserDetail({ payload }) {
  const { idUser, token } = payload;

  try {
    const response = yield call(
      fetch,
      `${baseUrl}/users/${idUser}?token=${token}`,
      {
        headers: commonHeader,
      },
    );

    if (response.ok) {
      const { data } = yield response.json();
      yield put(getUserDetailSuccess(data));
    } else {
      yield put(getUserDetailFailed(response.status));
    }
  } catch (error) {
    yield put(getUserDetailFailed(error.status));
  }
}

function* updateData({ payload }) {
  const { idUser, body, token } = payload;

  try {
    const response = yield call(
      fetch,
      `${baseUrl}/users/${idUser}?token=${token}`,
      {
        method: 'PUT',
        headers: commonHeader,
        body: JSON.stringify(body),
      },
    );

    if (response.ok) {
      const responseParsed = yield response.json();
      yield put(updateDataSuccess(responseParsed));
    } else {
      yield put(updateDataFailed());
    }
  } catch (error) {
    yield put(updateDataFailed());
  }
}

function* deleteUser({ payload }) {
  const { idUser, token } = payload;

  try {
    const response = yield call(
      fetch,
      `${baseUrl}/users/${idUser}?token=${token}`,
      {
        method: 'DELETE',
        headers: commonHeader,
      },
    );

    if (response.ok) {
      yield put(deleteUserSuccess());
    } else {
      yield put(deleteUserFailed());
    }
  } catch (error) {
    yield put(deleteUserFailed());
  }
}

const userDetailSagas = [
  takeLatest(actions.GET_USER_DETAIL_START, getUserDetail),
  takeLatest(actions.UPDATE_DATA_START, updateData),
  takeLatest(actions.DELETE_USER_START, deleteUser),
];
export default userDetailSagas;
