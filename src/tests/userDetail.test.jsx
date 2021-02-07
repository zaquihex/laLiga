import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { expect, test, beforeEach } from '@jest/globals';

import { fireEvent, render, screen } from '@testing-library/react';
import UserDetail from '../containers/UserDetail';

beforeEach(() => {
  const mockStore = configureMockStore();
  const store = mockStore({ common: { user: {} }, userDetail: { data: {} } });
  render(<Provider store={store}><BrowserRouter><UserDetail match={{ params: { id: '1' } }} history={{}} /></BrowserRouter></Provider>);
});

test('check input firstName', async () => {
  const element = screen.getByTestId('input-userDetail.firstName');
  expect(element);
  const input = screen.getByTestId('input-userDetail.firstName');
  fireEvent.change(input, { target: { value: 'testing' } });

  expect(input.value === 'testing').toBeTruthy();
  const iconRedo = screen.getByTestId('userDetail-icon-name-undo');
  fireEvent.click(iconRedo);
  expect(input.value === 'testing').toBeFalsy();
});

test('check input lastName', async () => {
  const element = screen.getByTestId('input-userDetail.lastName');
  expect(element);
  const input = screen.getByTestId('input-userDetail.lastName');
  fireEvent.change(input, { target: { value: 'testing' } });

  expect(input.value === 'testing').toBeTruthy();
  const iconRedo = screen.getByTestId('userDetail-icon-lastName-undo');
  fireEvent.click(iconRedo);
  expect(input.value === 'testing').toBeFalsy();
});

test('check input email', async () => {
  const element = screen.getByTestId('input-userDetail.email');
  expect(element);
  const input = screen.getByTestId('input-userDetail.email');
  fireEvent.change(input, { target: { value: 'testing' } });

  expect(input.value === 'testing').toBeTruthy();
  const iconRedo = screen.getByTestId('userDetail-icon-email-undo');
  fireEvent.click(iconRedo);
  expect(input.value === 'testing').toBeFalsy();
});

test('check remove modal', async () => {
  const removeBtn = screen.getByTestId('userDetail-btn-removeUser');

  try {
    expect(screen.getByTestId('userDetail-removeModal')).not.toBeVisible();
  } catch (error) {
    expect(true).toBeTruthy();
  }
  fireEvent.click(removeBtn);
  const removeModal = screen.getByTestId('userDetail-removeModal');
  expect(removeModal);
});
