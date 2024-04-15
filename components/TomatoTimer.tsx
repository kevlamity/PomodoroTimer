import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import ControlButtons from './ControlButtons';
import CycleCounter from './CycleCounter';

const WORK_TIME = 3; // 3 seconds for testing, normally 25 * 60 for 25 minutes
const BREAK_TIME = 2; // 2 seconds for testing, normally 5 * 60 for 5 minutes

interface TomatoTimerProps {
    onSessionChange: (sessionType: SessionType) => void;
  }

type SessionType = 'work' | 'break';


const TomatoTimer: React.FC<TomatoTimerProps> = ({ onSessionChange }) => {
    const [timeLeft, setTimeLeft] = useState<number>(WORK_TIME);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [sessionType, setSessionType] = useState<SessionType>('work');
    const [cycles, setCycles] = useState<number>(0);


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        if (timeLeft === 0) {
            if (sessionType === 'work') {
                setSessionType('break');
                setTimeLeft(BREAK_TIME);
            } else {
                setSessionType('work');
                setTimeLeft(WORK_TIME);
                setCycles(cycles => cycles + 1);  // Ensures it runs only once after break ends
            }
        }
    }, [timeLeft]);


    useEffect(() => {
        onSessionChange(sessionType); // Call the passed function whenever sessionType changes
    }, [sessionType, onSessionChange]);

    const startTimer = () => setIsRunning(true);
    const pauseTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setSessionType('work');
        setTimeLeft(WORK_TIME);
        setCycles(0);
    };

    return (
        <div>
            <TimerDisplay timeLeft={timeLeft} />
            <ControlButtons
                isRunning={isRunning}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                resetTimer={resetTimer}
            />
            <CycleCounter cycles={cycles} />
        </div>
    );
};

export default TomatoTimer;
