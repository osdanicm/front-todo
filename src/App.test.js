import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders login page when not logged in', () => {
    const { getByText } = render(<App />);
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('renders task list when logged in', () => {
    const { getByText, getByLabelText } = render(<App />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.click(getByText('Login'));
    expect(getByText('Mis tareas')).toBeInTheDocument();
  });
});