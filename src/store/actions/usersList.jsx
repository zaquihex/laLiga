export const actions = {
  GET_USERS_LIST_START: 'GET_USERS_LIST_START',
  GET_USERS_LIST_SUCCESS: 'GET_USERS_LIST_SUCCESS',
  GET_USERS_LIST_FAILED: 'GET_USERS_LIST_FAILED',
};

export const getUsersListStart = (page) => ({
  type: actions.GET_USERS_LIST_START,
  payload: { page },
});

export const getUsersListSuccess = (data, totalElements, totalPages) => ({
  type: actions.GET_USERS_LIST_SUCCESS,
  payload: { data, totalElements, totalPages },
});

export const getUsersListFailed = () => ({
  type: actions.GET_USERS_LIST_FAILED,
  payload: { },
});
