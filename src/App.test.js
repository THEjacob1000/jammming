import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders log into Spotify button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Log Into Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
