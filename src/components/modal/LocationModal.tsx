import { useState } from 'react';
import { AddLocation } from './AddLocation';
import { Modal } from './Modal';
import { SetLocation } from './SetLocation';

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [isAddLocation, setIsAddLocation] = useState(false);

  const onOpenAddModal = () => {
    setIsAddLocation(true);
  };

  const onCloseAddModal = () => {
    setIsAddLocation(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {!isAddLocation ? (
        <SetLocation onClose={onClose} onOpenAddModal={onOpenAddModal} />
      ) : (
        <AddLocation onClose={onClose} onCloseAddModal={onCloseAddModal} />
      )}
    </Modal>
  );
}
