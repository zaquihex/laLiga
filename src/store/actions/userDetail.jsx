export const actions = {
  GET_USER_DETAIL_START: 'GET_USER_DETAIL_START',
  GET_USER_DETAIL_SUCCESS: 'GET_USER_DETAIL_SUCCESS',
  GET_USER_DETAIL_FAILED: 'GET_USER_DETAIL_FAILED',

  UPDATE_DATA_START: 'UPDATE_DATA_START',
  UPDATE_DATA_SUCCESS: 'UPDATE_DATA_SUCCESS',
  UPDATE_DATA_FAILED: 'UPDATE_DATA_FAILED',

  DELETE_USER_START: 'DELETE_USER_START',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILED: 'DELETE_USER_FAILED',

  INIT_USER_DELETED: 'INIT_USER_DELETED',
};

export const getUserDetailStart = (idUser, token) => ({
  type: actions.GET_USER_DETAIL_START,
  payload: { idUser, token },
});

export const getUserDetailSuccess = (userInfo) => ({
  type: actions.GET_USER_DETAIL_SUCCESS,
  payload: { userInfo },
});

export const getUserDetailFailed = (errorCode) => ({
  type: actions.GET_USER_DETAIL_FAILED,
  payload: { errorCode },
});

export const updateDataStart = (idUser, body, token) => ({
  type: actions.UPDATE_DATA_START,
  payload: { idUser, body, token },
});

export const updateDataSuccess = (dataUpdated) => ({
  type: actions.UPDATE_DATA_SUCCESS,
  payload: { dataUpdated },
});

export const updateDataFailed = () => ({
  type: actions.UPDATE_DATA_FAILED,
  payload: { },
});

export const deleteUserStart = (idUser, token) => ({
  type: actions.DELETE_USER_START,
  payload: { idUser, token },
});

export const deleteUserSuccess = () => ({
  type: actions.DELETE_USER_SUCCESS,
  payload: { },
});

export const deleteUserFailed = () => ({
  type: actions.DELETE_USER_FAILED,
  payload: { },
});

export const initUserDeleted = () => ({
  type: actions.INIT_USER_DELETED,
  payload: { },
});
