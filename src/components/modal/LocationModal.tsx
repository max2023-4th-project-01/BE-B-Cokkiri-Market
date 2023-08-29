import { useState } from 'react';
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
  const { selectLocation, deleteLocation } = useLocationStore();
  const [isAddLocation, setIsAddLocation] = useState(false);

  // const getUserLocation = async () => {
  //   try {
  //     const res = await fetch('/api/users/locations', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const data = await res.json();
  //     if (res.status === 200) {
  //       setLocations(data.locations);
  //     }
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const selectUserLocation = async (locationId: number) => {
    try {
      const res = await fetch(`/api/users/locations/${locationId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        selectLocation(locationId);
      }
    } catch (err) {
      alert(err);
    }
  };

  const deleteUserLocation = async (locationId: number) => {
    try {
      const res = await fetch(`/api/users/locations/${locationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        deleteLocation(locationId);
      }
    } catch (err) {
      alert(err);
    }
  };

  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  const onOpenAddModal = () => {
    setIsAddLocation(true);
  };

  const onCloseAddModal = () => {
    setIsAddLocation(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {!isAddLocation ? (
        <SetLocation
          onClose={onClose}
          onOpenAddModal={onOpenAddModal}
          onSelect={selectUserLocation}
          onDelete={deleteUserLocation}
        />
      ) : (
        <AddLocation onClose={onClose} onCloseAddModal={onCloseAddModal} />
      )}
    </Modal>
  );
}
