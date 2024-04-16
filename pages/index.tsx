import React, { useState } from 'react';
import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import TomatoTimer from '@/components/TomatoTimer'; // Adjust the path as necessary

const HomePage = () => {

  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');

  const bgColor = useColorModeValue(sessionType === 'work' ? 'red.100' : 'blue.100', sessionType === 'work' ? 'red.700' : 'blue.700');

  return (
    <Container maxW="container.md" centerContent>
      <Box bg={bgColor} minH="100vh" minW="100vw">
        <VStack spacing={8} alignItems="center" justify="center" minH="50vh" mx="300px" px="50px" mt="10px" py="25px">
          <Heading as="h1" size="xl" textAlign="center" color={sessionType === 'work' ? 'tomato' : '#009cb8'}>
            Pomodoro Timer
          </Heading>
          <TomatoTimer onSessionChange={setSessionType} />
        </VStack>
      </Box>
    </Container>
  );
};

export default HomePage;