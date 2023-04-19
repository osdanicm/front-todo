import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tarea from './tarea';

describe('Tarea', () => {
  test('renders task', () => {
    const { getByText } = render(
      <Tarea id={1} texto="Test task" completada={0} completarTarea={() => {}} eliminarTarea={() => {}} />
    );
    expect(getByText('Test task')).toBeInTheDocument();
  });

  test('completes a task', () => {
    const handleComplete = jest.fn();
    const { getByText } = render(
      <Tarea id={1} texto="Test task" completada={0} completarTarea={handleComplete} eliminarTarea={() => {}} />
    );
    fireEvent.click(getByText('Test task'));
    expect(handleComplete).toHaveBeenCalledWith(1);
  });

  test('deletes a task', () => {
    const handleDelete = jest.fn();
    const { getByTestId } = render(
      <Tarea id={1} texto="Test task" completada={0} completarTarea={() => {}} eliminarTarea={handleDelete} />
    );
    fireEvent.click(getByTestId('delete'));
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});