export const actions = {

  SET_USER_ERROR: 'SET_USER_ERROR',

  SET_LOGOUT: 'SET_LOGOUT',

  SET_LOGIN_START: 'SET_LOGIN_START',
  SET_LOGIN_SUCCESS: 'SET_LOGIN_SUCCESS',
  SET_LOGIN_FAILED: 'SET_LOGIN_FAILED',
};

export const setLogout = () => ({
  type: actions.SET_LOGOUT,
  payload: { },
});

export const clearUserError = (error) => ({
  type: actions.SET_USER_ERROR,
  payload: { error },
});

export const setLoginStart = (body, autologin) => ({
  type: actions.SET_LOGIN_START,
  payload: { body, autologin },
});

export const setLoginSuccess = (user) => ({
  type: actions.SET_LOGIN_SUCCESS,
  payload: { user },
});

export const setLoginFailed = (errorMsg) => ({
  type: actions.SET_LOGIN_FAILED,
  payload: { errorMsg },
});
