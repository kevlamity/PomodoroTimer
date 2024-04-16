import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TomatoTimer from '../TomatoTimer';

describe('TomatoTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<TomatoTimer onSessionChange={jest.fn()} />);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('initializes with correct default states', () => {
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('starts and pauses the timer', () => {
    const startButton = screen.getByText('Start');
    const pauseButton = screen.getByText('Pause');
    
    userEvent.click(startButton);
    expect(setInterval).toHaveBeenCalled();

    userEvent.click(pauseButton);
    expect(clearInterval).toHaveBeenCalled();
  });

  test('resets the timer and cycles', () => {
    const resetButton = screen.getByText('Reset');
    userEvent.click(resetButton);
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Cycles Completed: 0')).toBeInTheDocument();
  });

  test('handles session change and updates cycles', () => {
    // Simulate the timer reaching 0
    fireEvent.click(screen.getByText('Start'));
    jest.advanceTimersByTime(25 * 60 * 1000); // Fast-forward time
    expect(screen.getByText('Cycles Completed: 1')).toBeInTheDocument();
  });

  test('updates settings and reflects in timer', () => {
    fireEvent.click(screen.getByText('Settings'));
    const workInput = screen.getByLabelText('Work Duration (minutes):');
    userEvent.clear(workInput);
    userEvent.type(workInput, '30');
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('30:00')).toBeInTheDocument(); // Assumes the timer updates immediately on setting change
  });
});

