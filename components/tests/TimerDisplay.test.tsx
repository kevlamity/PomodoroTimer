import React from 'react';
import { render, screen } from '@testing-library/react';
import TimerDisplay from '../TimerDisplay';

describe('TimerDisplay', () => {
  test('correctly sets the max value and color for work session', () => {
    render(<TimerDisplay timeLeft={300} workDuration={600} breakDuration={300} sessionType='work' />);
    const workText = screen.getByText('work');
    expect(window.getComputedStyle(workText).color).toBe('tomato'); // RGB value for tomato
  });

  test('correctly sets the max value and color for break session', () => {
    render(<TimerDisplay timeLeft={150} workDuration={600} breakDuration={300} sessionType='break' />);
    const breakText = screen.getByText('break');
    expect(window.getComputedStyle(breakText).color).toBe('rgb(0, 156, 184)'); // RGB value for bondi blue
  });
});
