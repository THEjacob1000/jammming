import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders search bar', () => {
  const { getByPlaceholderText } = render(<SearchBar />);
  const inputElement = getByPlaceholderText(/Enter A Song, Album, or Artist/i);
  expect(inputElement).toBeInTheDocument();
});
