import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from './login';

jest.mock('axios', () => ({
  post: jest.fn((url, data) => {
    if (url === 'http://localhost:5000/login') {
      return Promise.resolve({ data: [{ id: 1, nombre: 'testuser' }] });
    } else if (url === 'http://localhost:5000/register') {
      return Promise.resolve({ data: { messagge: 'Success' } });
    }
  })
}));

describe('LoginPage', () => {
  test('renders login form', () => {
    const { getByText } = render(<LoginPage onLogin={() => {}} />);
    expect(getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('logs in a user', async () => {
    const handleLogin = jest.fn();
    const { getByLabelText, getByText } = render(<LoginPage onLogin={handleLogin} />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Iniciar'));
    expect(handleLogin).toHaveBeenCalledWith('testuser', 1);
  });

  test('registers a user', async () => {
    const handleLogin = jest.fn();
    const { getByLabelText, getByText } = render(<LoginPage onLogin={handleLogin} />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Register'));
    expect(handleLogin).not.toHaveBeenCalled();
  });
});