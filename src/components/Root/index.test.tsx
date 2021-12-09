import React from 'react';
import { render, screen } from '@testing-library/react';
import Root from './index';

test('renders learn react link', () => {
  render(<Root />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
