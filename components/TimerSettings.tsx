import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';

interface TimerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  workDuration: number; // Work duration in minutes
  breakDuration: number; // Break duration in minutes
  onSave: (workMinutes: number, breakMinutes: number) => void;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({ isOpen, onClose, workDuration, breakDuration, onSave }) => {
  const [workMinutes, setWorkMinutes] = useState(workDuration);
  const [breakMinutes, setBreakMinutes] = useState(breakDuration);

  const handleSave = () => {
    onSave(workMinutes, breakMinutes);
    onClose(); // Optionally close the modal on save
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adjust Timer Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Work Duration (minutes):</FormLabel>
            <NumberInput defaultValue={workDuration} min={1} onChange={value => setWorkMinutes(Number(value) || 0)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Break Duration (minutes):</FormLabel>
            <NumberInput defaultValue={breakDuration} min={1} onChange={value => setBreakMinutes(Number(value) || 0)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TimerSettings;
