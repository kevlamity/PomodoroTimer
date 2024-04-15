import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';

interface SettingsFormProps {
  initialWorkMinutes: number;
  initialBreakMinutes: number;
  onSave: (workMinutes: number, breakMinutes: number) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialWorkMinutes, initialBreakMinutes, onSave }) => {
  const [workMinutes, setWorkMinutes] = useState(initialWorkMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initialBreakMinutes);

  const handleSubmit = () => {
    onSave(workMinutes, breakMinutes);
  };

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Work Duration (minutes):</FormLabel>
            <Input type="number" value={workMinutes} onChange={(e) => setWorkMinutes(parseInt(e.target.value))} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Break Duration (minutes):</FormLabel>
            <Input type="number" value={breakMinutes} onChange={(e) => setBreakMinutes(parseInt(e.target.value))} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsForm;
