import { actions } from '../actions/common';

const initialState = {
  language: 'en',
  user: null,
  errorLogin: null,
};

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_LANGUAGE:
      return { ...state, language: payload.newLang };
    case actions.SET_LOGOUT:
      localStorage.removeItem('la-liga-user');
      return { ...state, user: null };
    case actions.SET_USER_ERROR:
      return { ...state, errorLogin: payload.error };
    case actions.SET_LOGIN_START:
      return { ...state, user: null, errorLogin: null };
    case actions.SET_LOGIN_SUCCESS:
      return { ...state, user: payload.user };
    case actions.SET_LOGIN_FAILED:
      return { ...state, errorLogin: payload.errorMsg };
    case '@@INIT': {
      const { user } = state;

      const sessionSaved = sessionStorage.getItem('la-liga');

      let localUser = user;
      const userSaved = localStorage.getItem('la-liga-user');
      if (userSaved) {
        const userParsed = JSON.parse(userSaved);
        localUser = userParsed;
      }
      if (sessionSaved) {
        const sessionParsed = JSON.parse(sessionSaved);
        return { ...sessionParsed.common, user: localUser };
      }
      return { ...state, user: localUser };
    }
    default: {
      const sessionSavedDefault = sessionStorage.getItem('la-liga');
      if (sessionSavedDefault) {
        const sessionParsed = JSON.parse(sessionSavedDefault);
        return sessionParsed.common;
      }
      return state;
    }
  }
};

export default commonReducer;
