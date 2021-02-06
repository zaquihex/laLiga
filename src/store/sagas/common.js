import { takeLatest, put, call } from 'redux-saga/effects';

import {
  actions,
  setLoginSuccess,
  setLoginFailed,
} from '../actions/common';
import { baseUrl, commonHeader } from '../../helpers/endpoint';

// Function to get users list
function* setLogin({ payload }) {
  const { body, autologin } = payload;

  try {
    const response = yield call(
      fetch,
      `${baseUrl}/login`,
      {
        method: 'POST',
        headers: commonHeader,
        body: JSON.stringify(body),
      },
    );
    if (response.ok) {
      const { token } = yield response.json();
      const user = { username: body.email, token };
      if (autologin) {
        localStorage.setItem('la-liga-user', JSON.stringify(user));
      }
      yield put(setLoginSuccess(user));
    } else {
      const { error } = yield response.json();
      yield put(setLoginFailed(error));
    }
  } catch (error) {
    yield put(setLoginFailed());
  }
}

const commonSagas = [
  takeLatest(actions.SET_LOGIN_START, setLogin),
];
export default commonSagas;
