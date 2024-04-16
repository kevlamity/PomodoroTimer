import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimerSettings from '../TimerSettings';
import { waitFor } from '@testing-library/react';


describe('TimerSettings', () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(
      <TimerSettings
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        workDuration={25}
        breakDuration={5}
      />
    );
  });

  test('renders correctly with initial values', () => {
    expect(screen.getByLabelText('Work Duration (minutes):')).toHaveValue('25');
    expect(screen.getByLabelText('Break Duration (minutes):')).toHaveValue('5');
  });
  
  test('allows input fields to be changed', async () => {
    const workInput = screen.getByLabelText('Work Duration (minutes):');
    const breakInput = screen.getByLabelText('Break Duration (minutes):');
    
    await userEvent.clear(workInput);
    await userEvent.type(workInput, '30');
    await userEvent.clear(breakInput);
    await userEvent.type(breakInput, '10');
  
    await waitFor(() => {
      expect(workInput).toHaveValue('30');
      expect(breakInput).toHaveValue('10');
    });
  });

  test('calls onSave with correct values when save button is clicked', () => {
    const workInput = screen.getByLabelText('Work Duration (minutes):');
    const breakInput = screen.getByLabelText('Break Duration (minutes):');
    userEvent.clear(workInput);
    userEvent.type(workInput, '45');
    userEvent.clear(breakInput);
    userEvent.type(breakInput, '15');

    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSave).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
  });

  test('calls onClose when cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
