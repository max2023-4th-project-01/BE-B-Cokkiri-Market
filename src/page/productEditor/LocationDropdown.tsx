import { useState } from 'react';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { MenuItem } from '../../components/dropdown/MenuItem';
import { HomeLocationModal } from '../../components/locations/HomeLocationModal';

export function LocationDropdown({
  myLocation,
  selectLocation,
}: {
  myLocation: { id: number; name: string; isSelected: boolean }[];
  selectLocation: (productId: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedLocationData = myLocation.filter(
    data => data.isSelected === true
  )[0];

  const extractKeyName = (locationName: string | undefined) => {
    if (!locationName) return;
    const keyName = locationName.split(' ').at(-1);
    return keyName;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Dropdown
        btnText={extractKeyName(selectedLocationData.name) || '역삼1동'}
        iconName="chevronDown"
        align="left"
      >
        {myLocation.map(location => {
          return (
            <MenuItem
              key={location.id}
              font={
                location.isSelected ? 'enabledStrong16' : 'availableDefault16'
              }
              onAction={() => selectLocation(location.id)}
            >
              {location.name}
            </MenuItem>
          );
        })}
        <MenuItem onAction={openModal}>내 동네 설정하기</MenuItem>
      </Dropdown>
      {isModalOpen && (
        <HomeLocationModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}
