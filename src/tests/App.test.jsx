import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { expect, test } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import App from '../App';

test('basic render', async () => {
  const mockStore = configureMockStore();
  const store = mockStore({ common: {}, userDetail: {} });
  render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
  const element = screen.getByTestId('login-div-main');
  expect(element);
});
