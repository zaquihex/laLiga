import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { expect, test } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import UsersList from '../containers/UsersList';

test('render table', async () => {
  const mockStore = configureMockStore();
  const store = mockStore({ common: { user: {} }, usersList: { data: [{}] } });
  render(<Provider store={store}><BrowserRouter><UsersList history={{}} /></BrowserRouter></Provider>);
  const element = screen.getByTestId('usersList-dataGrid');
  expect(element);
});

test('render empty table', async () => {
  const mockStore = configureMockStore();
  const store = mockStore({ common: { user: {} }, usersList: { data: [] } });
  render(<Provider store={store}><BrowserRouter><UsersList history={{}} /></BrowserRouter></Provider>);
  const element = screen.getByTestId('usersList-emptyList');
  expect(element);
});

test('render error', async () => {
  const mockStore = configureMockStore();
  const store = mockStore({ common: { user: {} }, usersList: { data: null, error: true } });
  render(<Provider store={store}><BrowserRouter><UsersList history={{}} /></BrowserRouter></Provider>);
  const element = screen.getByTestId('usersList-errorMsg');
  expect(element);
});
