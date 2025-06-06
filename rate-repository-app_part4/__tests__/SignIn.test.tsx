import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(screen.getByTestId('passwordField'), 'password');
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });

    it('shows validation errors for empty fields', async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeTruthy();
        expect(screen.getByText('Password is required')).toBeTruthy();
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });
});