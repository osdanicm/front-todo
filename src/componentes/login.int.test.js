test('registers a user', async () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Register'));
    expect(await findByText('Usuario registrado')).toBeInTheDocument();
  });