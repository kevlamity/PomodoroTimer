import React, { useState, useEffect, useRef } from 'react';
import { useDisclosure, Button, VStack } from '@chakra-ui/react';
import TimerDisplay from './TimerDisplay';
import ControlButtons from './ControlButtons';
import CycleCounter from './CycleCounter';
import TimerSettings from './TimerSettings';  // Import the settings component

interface TomatoTimerProps {
    onSessionChange: (sessionType: 'work' | 'break') => void;
}

const TomatoTimer: React.FC<TomatoTimerProps> = ({ onSessionChange }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [timeLeft, setTimeLeft] = useState<number>(25 * 60);  // Adjusted to seconds for testing
    const [workDuration, setWorkDuration] = useState<number>(25 * 60);  // in seconds for testing
    const [breakDuration, setBreakDuration] = useState<number>(5 * 60);  // in seconds for testing
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
    const [cycles, setCycles] = useState<number>(0);
    const workStartSound = useRef<HTMLAudioElement | null>(null);
    const breakStartSound = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        // Instantiate audio objects after the component mounts
        workStartSound.current = new Audio('/sounds/work_time.mp3');
        breakStartSound.current = new Audio('/sounds/break_time.mp3');
    }, []);

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
                setTimeLeft(breakDuration);
                breakStartSound.current?.play();
            } else {
                setSessionType('work');
                setTimeLeft(workDuration);
                setCycles(cycles => cycles + 1);
                workStartSound.current?.play()
            }
        }
    }, [timeLeft, workDuration, breakDuration]);

    useEffect(() => {
        onSessionChange(sessionType);
    }, [sessionType, onSessionChange]);


    const handleSaveSettings = (workMinutes: number, breakMinutes: number) => {
        const newWorkDuration = workMinutes * 60;
        const newBreakDuration = breakMinutes * 60;
        setWorkDuration(newWorkDuration);
        setBreakDuration(newBreakDuration);

        // Update the time left based on the current session type
        if (!isRunning || sessionType === 'work') {
            setTimeLeft(newWorkDuration);
        } else if (!isRunning || sessionType === 'break') {
            setTimeLeft(newBreakDuration);
        }
    };

    const startTimer = () => setIsRunning(true);
    const pauseTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setSessionType('work');
        setTimeLeft(workDuration);
        setCycles(0);
    };

    return (
        <div>
            <TimerDisplay timeLeft={timeLeft} sessionType={sessionType} workDuration={workDuration} breakDuration={breakDuration} />
            <VStack>
                <ControlButtons
                    isRunning={isRunning}
                    startTimer={startTimer}
                    pauseTimer={pauseTimer}
                    resetTimer={resetTimer}
                />
                <Button onClick={onOpen} size="lg" mt="5px">Settings</Button>
            </VStack>
            <CycleCounter cycles={cycles} sessionType={sessionType} />

            <TimerSettings isOpen={isOpen} onClose={onClose} workDuration={workDuration / 60} breakDuration={breakDuration / 60} onSave={handleSaveSettings} />
        </div>
    );
};

export default TomatoTimer;
