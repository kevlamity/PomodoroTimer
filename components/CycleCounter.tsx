import { Box, Text } from '@chakra-ui/react';

interface CycleCounterProps {
  cycles: number;
  sessionType: 'work' | 'break'
}

const CycleCounter: React.FC<CycleCounterProps> = ({ cycles, sessionType }) => {
  return (
    <Box textAlign="center" p={2}>
      <Text fontSize="2xl" fontWeight="bold" color={sessionType === 'work' ? 'tomato' : '#009cb8'}>Cycles Completed: {cycles}</Text>
    </Box>
  );
};

export default CycleCounter;
