import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListaTareas from './listaTareas';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: { messagge: 'Success' } }))
}));

describe('ListaTareas', () => {
  test('renders task list', () => {
    const { getByText } = render(<ListaTareas idUser={1} />);
    expect(getByText('Agregar')).toBeInTheDocument();
  });

  test('adds a task', async () => {
    const { getByLabelText, getByText, findByText } = render(<ListaTareas idUser={1} />);
    fireEvent.change(getByLabelText('Nueva tarea'), { target: { value: 'Test task' } });
    fireEvent.click(getByText('Agregar'));
    expect(await findByText('Test task')).toBeInTheDocument();
  });
});