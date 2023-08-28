import { useState } from 'react';
import { AddLocation } from './AddLocation';
import { Modal } from './Modal';
import { SetLocation } from './SetLocation';

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);

  const onOpenAddModal = () => {
    setIsAddLocationModalOpen(true);
  };

  const onCloseAddModal = () => {
    setIsAddLocationModalOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {!isAddLocationModalOpen ? (
        <SetLocation onClose={onClose} onOpenAddModal={onOpenAddModal} />
      ) : (
        <AddLocation onClose={onClose} onCloseAddModal={onCloseAddModal} />
      )}
    </Modal>
  );
}
