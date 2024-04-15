import React, { useState } from 'react';
import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import TomatoTimer from '@/components/TomatoTimer'; // Adjust the path as necessary

const HomePage = () => {

  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');

  const handleSessionChange = (newSessionType: 'work' | 'break') => {
    setSessionType(newSessionType);
  };

  const bgColor = useColorModeValue(sessionType === 'work' ? 'red.200' : 'blue.200', sessionType === 'work' ? 'red.700' : 'blue.700');




  return (
    <Container maxW="container.md" centerContent>
      <Box bg={bgColor} minH="100vh" minW="100vw">
        <VStack spacing={8} alignItems="center" justify="center" minH="50vh">
          <Heading as="h1" size="xl" textAlign="center" color="blue">
            Pomodoro Timer
          </Heading>
          <TomatoTimer onSessionChange={setSessionType} />
        </VStack>
      </Box>
    </Container>
  );
};

export default HomePage;