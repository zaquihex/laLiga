// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

// Redux imports
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

// Reducer
import laLigaReducer from 'store/reducers/laLiga';

// basic import
import reportWebVitals from './reportWebVitals';

// style
import './index.scss';

// Component
import App from './App';

// Create history and allow redux chrome extension
const history = createHistory();
const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount store
const store = createStore(
  laLigaReducer,
  composeEnhacers(applyMiddleware(sagaMiddleware)),
);

store.subscribe(() => {
  const state = store.getState();
  try {
    sessionStorage.setItem('la-liga', JSON.stringify(state));
  } catch (error) {
    // Ignore write errors
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App history={history} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// log results
reportWebVitals();
