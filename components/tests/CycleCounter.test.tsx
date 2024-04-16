import React from 'react';
import { render, screen } from '@testing-library/react';
import CycleCounter from '../CycleCounter';

describe('CycleCounter', () => {
  test('displays the correct number of cycles', () => {
    render(<CycleCounter cycles={4} sessionType='work' />);
    expect(screen.getByText('Cycles Completed: 4')).toBeInTheDocument();
  });

  test('displays tomato color for work session', () => {
    render(<CycleCounter cycles={3} sessionType='work' />);
    const cycleText = screen.getByText('Cycles Completed: 3');
    expect(cycleText).toHaveStyle('color: tomato');
  });

  test('displays blue color for break session', () => {
    render(<CycleCounter cycles={2} sessionType='break' />);
    const cycleText = screen.getByText('Cycles Completed: 2');
    expect(cycleText).toHaveStyle('color: #009cb8');
  });
});