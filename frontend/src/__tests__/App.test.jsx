import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome hero when not authenticated', () => {
  render(<App />);
  const welcome = screen.getByText(/Benvenuto in Delivero/i);
  expect(welcome).toBeInTheDocument();
});
