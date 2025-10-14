import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add New Todo heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Add New Todo/i);
  expect(headingElement).toBeInTheDocument();
  
  const inputElement = screen.getByPlaceholderText(/Enter todo/i);
  expect(inputElement).toBeInTheDocument();
  
  const buttonElement = screen.getByText(/Add Todo/i);
  expect(buttonElement).toBeInTheDocument();
});
