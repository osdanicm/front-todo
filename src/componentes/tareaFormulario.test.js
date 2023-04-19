import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TareaFormulario from './tareaFormulario';

describe('TareaFormulario', () => {
  test('renders form', () => {
    const { getByText } = render(<TareaFormulario onSubmit={() => {}} />);
    expect(getByText('Agregar')).toBeInTheDocument();
  });

  test('submits a task', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<TareaFormulario onSubmit={handleSubmit} />);
    fireEvent.change(getByLabelText('Escribe una tarea'), { target: { value: 'Test task' } });
    fireEvent.click(getByText('Agregar'));
    expect(handleSubmit).toHaveBeenCalledWith({
      id: expect.any(Number),
      texto: 'Test task',
      completada: 0,
      idUser: expect.any(Number)
    });
  });
});