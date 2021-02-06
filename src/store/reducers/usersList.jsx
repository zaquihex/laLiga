import { actions } from '../actions/usersList';

const initialState = {
  data: null,
  totalElements: null,
  page: 1,
  totalPages: 1,
  error: false,
};

// State fot the listNames container
const usersListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_USERS_LIST_START:
      return { ...state, data: null, error: false, page: payload.page };
    case actions.GET_USERS_LIST_SUCCESS:
      return { ...state, data: payload.data, totalElements: payload.totalElements, totalPages: payload.totalPages };
    case actions.GET_USERS_LIST_FAILED:
      return { ...state, data: null, error: false, page: payload.page };
    default: {
      const sessionSaved = sessionStorage.getItem('la-liga');
      if (sessionSaved) {
        const sessionParsed = JSON.parse(sessionSaved);
        return sessionParsed.usersList;
      }
      return state;
    }
  }
};

export default usersListReducer;
