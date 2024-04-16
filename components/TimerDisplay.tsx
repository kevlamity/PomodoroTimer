import { Box, Text, CircularProgress, CircularProgressLabel, Heading } from '@chakra-ui/react';

interface TimerDisplayProps {
  timeLeft: number; // Time left in seconds
  workDuration: number; // Time left in seconds
  breakDuration: number; // Time left in seconds
  sessionType: 'work' | 'break'
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, workDuration, breakDuration, sessionType }) => {
  const minutes: number = Math.floor(timeLeft / 60);
  const seconds: number = timeLeft % 60;

  return (
    <div>

      <CircularProgress
        color={sessionType === 'work' ? "tomato" : "#009cb8"} // Conditional color
        value={timeLeft}
        max={sessionType === 'work' ? workDuration : breakDuration} // Conditional max based on session
        min={0}
        size='320px'
        thickness='5px'
        capIsRound={false}>
        <CircularProgressLabel>

          <Box textAlign="center" fontSize="7xl" p={5} color={sessionType === 'work' ? "tomato" : "#009cb8"}>
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
      <Box>
        <Text textAlign="center" fontSize="40px" paddingBottom="10px" color={sessionType === 'work' ? "tomato" : "#009cb8"}>
          {sessionType}
        </Text>
      </Box>



    </div>



  );
};

export default TimerDisplay;