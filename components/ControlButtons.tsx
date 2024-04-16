import { Button, Stack } from '@chakra-ui/react';

interface ControlButtonsProps {
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ isRunning, startTimer, pauseTimer, resetTimer }) => {
  return (
    <Stack direction="row" spacing={4} justify="center">
      {isRunning ? (
        <Button colorScheme="red" onClick={pauseTimer} size="lg">Pause</Button>
      ) : (
        <Button colorScheme="green" onClick={startTimer} size="lg">Start</Button>
      )}
      <Button colorScheme="yellow" textColor="white" onClick={resetTimer} size="lg">Reset</Button>
    </Stack>
  );
};

export default ControlButtons;
