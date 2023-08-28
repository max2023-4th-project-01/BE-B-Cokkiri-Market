import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useLocationStore } from '../../stores/useLocationStore';
import { AddLocation } from './AddLocation';
import { Modal } from './Modal';
import { SetLocation } from './SetLocation';

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { accessToken } = useAuthStore();
  const { setLocations } = useLocationStore();
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);

  const getUserLocation = async () => {
    try {
      const res = await fetch('/api/users/locations', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setLocations(data.locations);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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
