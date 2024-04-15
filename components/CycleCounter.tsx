import { Box, Text } from '@chakra-ui/react';

interface CycleCounterProps {
  cycles: number;
}

const CycleCounter: React.FC<CycleCounterProps> = ({ cycles }) => {
  return (
    <Box textAlign="center" p={2}>
      <Text fontSize="xl" fontWeight="bold" color="blue">Cycles Completed: {cycles}</Text>
    </Box>
  );
};

export default CycleCounter;
