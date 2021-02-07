export const actions = {

  SET_USER_ERROR: 'SET_USER_ERROR',

  SET_LOGOUT: 'SET_LOGOUT',

  SET_LANGUAGE: 'SET_LANGUAGE',

  SET_LOGIN_START: 'SET_LOGIN_START',
  SET_LOGIN_SUCCESS: 'SET_LOGIN_SUCCESS',
  SET_LOGIN_FAILED: 'SET_LOGIN_FAILED',
};

export const setLanguage = (newLang) => ({
  type: actions.SET_LANGUAGE,
  payload: { newLang },
});

export const setLogout = () => ({
  type: actions.SET_LOGOUT,
  payload: { },
});

export const clearUserError = (error) => ({
  type: actions.SET_USER_ERROR,
  payload: { error },
});

export const setLoginStart = (body, rememberMe) => ({
  type: actions.SET_LOGIN_START,
  payload: { body, rememberMe },
});

export const setLoginSuccess = (user) => ({
  type: actions.SET_LOGIN_SUCCESS,
  payload: { user },
});

export const setLoginFailed = (errorMsg) => ({
  type: actions.SET_LOGIN_FAILED,
  payload: { errorMsg },
});
