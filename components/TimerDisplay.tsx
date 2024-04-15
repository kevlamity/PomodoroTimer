import { Box, Text } from '@chakra-ui/react';

interface TimerDisplayProps {
  timeLeft: number; // Time left in seconds
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  const minutes:number = Math.floor(timeLeft / 60);
  const seconds:number = timeLeft % 60;

  return (
    <Box textAlign="center" fontSize="4xl" p={5} bg="gray.700" color="white">
      {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </Box>
  );
};

export default TimerDisplay;