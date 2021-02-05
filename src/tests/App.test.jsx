import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import App from '../App';

test('basic render', async () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const element = screen.getByTestId('App-div-main');
  expect(element);
});
