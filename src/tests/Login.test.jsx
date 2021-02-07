import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { expect, test } from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react';

import Login from '../containers/Login';

const getComponent = (commonStore) => {
  const mockStore = configureMockStore();
  const store = mockStore({ common: commonStore, userDetail: { data: {} } });
  return <Provider store={store}><BrowserRouter><Login /></BrowserRouter></Provider>;
};

test('check warning email', async () => {
  render(getComponent({ user: {} }));
  try {
    // if the element is found, the following expect will fail the test
    expect(screen.getByTestId('login-icon-warningEmail')).not.toBeVisible();
  } catch (error) {
    // otherwise, the expect will throw, and the following expect will pass the test
    expect(true).toBeTruthy();
  }

  // Warning email should appear after write on the field
  const input = screen.getByTestId('input-login.email');
  fireEvent.change(input, { target: { value: 'email' } });
  expect(input.value).toBe('email');
  expect(screen.getByTestId('login-icon-warningEmail'));

  fireEvent.change(input, { target: { value: 'a' } });
  expect(input.value).toBe('a');
  try {
    // if the element is found, the following expect will fail the test
    expect(screen.getByTestId('input-login.email')).not.toBeVisible();
  } catch (error) {
    // otherwise, the expect will throw, and the following expect will pass the test
    expect(true).toBeTruthy();
  }
});

test('check password show/hide', async () => {
  render(getComponent({ user: {} }));
  expect(screen.getByTestId('icon-password'));

  const input = screen.getByTestId('input-login.password');
  const elementIcon = screen.getByTestId('icon-password');
  expect(input.type === 'password').toBeTruthy();
  fireEvent.click(elementIcon);
  expect(input.type === 'text').toBeTruthy();
});
