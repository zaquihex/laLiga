import { actions } from '../actions/userDetail';

const initialState = {
  data: {},
  loading: false,
  error: null,

  loadingUpdate: false,
  errorUpdated: false,

  dateUpdated: null,

  loadingDeleted: false,
  errorDeleted: false,

  userDeleted: false,
};

const userDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_USER_DETAIL_START:
      return { ...state, data: {}, loading: true, error: false, userDeleted: false, errorDeleted: false, errorUpdated: false };
    case actions.GET_USER_DETAIL_SUCCESS:
      return { ...state, loading: false, data: payload.userInfo };
    case actions.GET_USER_DETAIL_FAILED:
      return { ...state, loading: false, error: payload.errorCode };
    case actions.UPDATE_DATA_START:
      return { ...state, errorUpdated: false, loadingUpdate: true };
    case actions.UPDATE_DATA_SUCCESS:
      return { ...state, data: { ...state.data, ...payload.dataUpdated }, dateUpdated: new Date().getTime(), loadingUpdate: false };
    case actions.UPDATE_DATA_FAILED:
      return { ...state, errorUpdated: true, loadingUpdate: false };
    case actions.DELETE_USER_START:
      return { ...state, errorDeleted: false, loadingDeleted: true };
    case actions.DELETE_USER_SUCCESS:
      return { ...state, data: {}, userDeleted: true, loadingDeleted: false };
    case actions.DELETE_USER_FAILED:
      return { ...state, errorDeleted: true, loadingDeleted: false };
    case actions.INIT_USER_DELETED:
      return { ...state, userDeleted: false };
    default: {
      const sessionSaved = sessionStorage.getItem('la-liga');
      if (sessionSaved) {
        const sessionParsed = JSON.parse(sessionSaved);
        return sessionParsed.userDetail;
      }
      return state;
    }
  }
};

export default userDetailReducer;
