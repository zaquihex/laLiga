const initialState = {
  user: null,
};

// State fot the listNames container
const laLigaReducer = (state = initialState, { type }) => {
  switch (type) {
    default: {
      const sessionSaved = sessionStorage.getItem('la-liga');
      if (sessionSaved) {
        return JSON.parse(sessionSaved);
      }
      return state;
    }
  }
};

export default laLigaReducer;
