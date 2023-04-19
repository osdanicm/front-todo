test('completes a task', async () => {
    const { getByLabelText, getByText, findByText } = render(<App />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Iniciar'));
    expect(await findByText('Mis tareas')).toBeInTheDocument();
    fireEvent.change(getByLabelText('Escribe una tarea'), { target: { value: 'Test task' } });
    fireEvent.click(getByText('Agregar'));
    expect(await findByText('Test task')).toBeInTheDocument();
    fireEvent.click(getByText('Test task'));
    expect(await findByText('Test task')).toHaveClass('completada');
  });
  
  test('deletes a task', async () => {
    const { getByLabelText, getByText, findByText, queryByText } = render(<App />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Iniciar'));
    expect(await findByText('Mis tareas')).toBeInTheDocument();
    fireEvent.change(getByLabelText('Escribe una tarea'), { target: { value: 'Test task' } });
    fireEvent.click(getByText('Agregar'));
    expect(await findByText('Test task')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete'));
    expect(queryByText('Test task')).not.toBeInTheDocument();
  });