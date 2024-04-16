import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlButtons from '../ControlButtons';

describe('ControlButtons', () => {
  const mockStartTimer = jest.fn();
  const mockPauseTimer = jest.fn();
  const mockResetTimer = jest.fn();

  it('should display the "Start" button when isRunning is false', () => {
    render(
      <ControlButtons
        isRunning={false}
        startTimer={mockStartTimer}
        pauseTimer={mockPauseTimer}
        resetTimer={mockResetTimer}
      />
    );

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).not.toBeInTheDocument();
  });

  it('should display the "Pause" button when isRunning is true', () => {
    render(
      <ControlButtons
        isRunning={true}
        startTimer={mockStartTimer}
        pauseTimer={mockPauseTimer}
        resetTimer={mockResetTimer}
      />
    );

    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.queryByText('Start')).not.toBeInTheDocument();
  });

  it('should call startTimer when the "Start" button is clicked', () => {
    render(
      <ControlButtons
        isRunning={false}
        startTimer={mockStartTimer}
        pauseTimer={mockPauseTimer}
        resetTimer={mockResetTimer}
      />
    );

    fireEvent.click(screen.getByText('Start'));
    expect(mockStartTimer).toHaveBeenCalledTimes(1);
  });

  it('should call pauseTimer when the "Pause" button is clicked', () => {
    render(
      <ControlButtons
        isRunning={true}
        startTimer={mockStartTimer}
        pauseTimer={mockPauseTimer}
        resetTimer={mockResetTimer}
      />
    );

    fireEvent.click(screen.getByText('Pause'));
    expect(mockPauseTimer).toHaveBeenCalledTimes(1);
  });

  it('should call resetTimer when the "Reset" button is clicked', () => {
    render(
      <ControlButtons
        isRunning={true} // doesn't matter for this test
        startTimer={mockStartTimer}
        pauseTimer={mockPauseTimer}
        resetTimer={mockResetTimer}
      />
    );

    fireEvent.click(screen.getByText('Reset'));
    expect(mockResetTimer).toHaveBeenCalledTimes(1);
  });
});
