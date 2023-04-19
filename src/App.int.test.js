import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url === 'http://localhost:5000/obtain?valor=1') {
      return Promise.resolve({ data: [] });
    }
  }),
  post: jest.fn((url, data) => {
    if (url === 'http://localhost:5000/login') {
      return Promise.resolve({ data: [{ id: 1, nombre: 'testuser' }] });
    } else if (url === 'http://localhost:5000/saveTodo') {
      return Promise.resolve({ data: { messagge: 'Success' } });
    }
  })
}));

describe('App integration', () => {
  test('logs in and adds a task', async () => {
    const { getByLabelText, getByText, findByText } = render(<App />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Iniciar'));
    expect(await findByText('Mis tareas')).toBeInTheDocument();
    fireEvent.change(getByLabelText('Escribe una tarea'), { target: { value: 'Test task' } });
    fireEvent.click(getByText('Agregar'));
    expect(await findByText('Test task')).toBeInTheDocument();
  });
});