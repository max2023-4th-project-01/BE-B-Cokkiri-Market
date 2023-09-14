import { Dropdown } from '../../components/dropdown/Dropdown';
import { MenuItem } from '../../components/dropdown/MenuItem';

export function LocationDropdown({
  myLocation,
  selectLocation,
}: {
  myLocation: { id: number; name: string; isSelected: boolean }[];
  selectLocation: (productId: number) => void;
}) {
  const selectedLocationData = myLocation.filter(
    data => data.isSelected === true
  )[0];

  const extractKeyName = (locationName: string | undefined) => {
    if (!locationName) return;
    const keyName = locationName.split(' ').at(-1);
    return keyName;
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
              onAction={() => selectLocation(location.id)}
            >
              {location.name}
            </MenuItem>
          );
        })}
      </Dropdown>
    </div>
  );
}
