// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

// Redux imports
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

// Reducers
import reducers from 'store/reducers';

// Sagas
import sagas from 'store/sagas';

// basic import
import reportWebVitals from './reportWebVitals';

// style
import 'styles/styles.scss';
import './index.scss';

// Component
import App from './App';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount store
const store = createStore(
  reducers,
  composeEnhacers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);

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
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// log results
reportWebVitals();
